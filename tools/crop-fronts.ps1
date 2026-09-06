# refs/*.png  ->  public/mockups/*.png
#
# Each sheet in refs/ is a technical flat carrying two or three views (front,
# back, sometimes side) plus rulers and spec boxes. This keeps the FRONT view,
# crops to it, and scales it to 900px tall - the convention every coordinate in
# src/data/garments.ts is written against.
#
# Two ways of separating the views:
#
#   even split   Divide the ink span by the number of views and keep the first.
#                Reliable when the views sit in a row. Do NOT look for the
#                widest gap instead: on these sheets the widest gap is often
#                INSIDE a garment (a tee's underarm), and where sleeves nearly
#                touch there is no gap at all.
#
#   clustering   Label connected ink components and 2-means their centroids,
#                weighted by pixel count so the two outlines anchor the
#                clusters. Needed when the views overlap in x - the hoodie is
#                drawn front above-left of back, so no vertical line separates
#                them. An earlier version cropped a generous box and painted
#                out the corner the back view intruded into; that always left
#                fragments sitting just past whichever edge was guessed.

Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$SRC = Join-Path $PSScriptRoot '..\refs'
$OUT = Join-Path $PSScriptRoot '..\public\mockups'
New-Item -ItemType Directory -Force $OUT | Out-Null

# file -> garment id. The three screenshots are the polo, tank and tee.
$MAP = @{
  'Screenshot 2026-09-06 184402.png' = 'tee'
  'Screenshot 2026-09-06 184332.png' = 'tank'
  'Screenshot 2026-09-06 184046.png' = 'polo'
  'longsleeve.png'                   = 'longsleeve'
  'shirt.png'                        = 'shirt'
  'hoodie.png'                       = 'hoodie'
  'hat.png'                          = 'cap'
}
# views per sheet, where it is not 2
$VIEWS = @{ 'cap' = 3 }
# separate these by component clustering rather than an even split
$CLUSTER = @('hoodie')
# explicit crop box for the rest, as fractions of the image: x0, y0, x1, y1
$BOXES = @{ 'cap' = @(0.00, 0.00, 0.30, 1.00) }

foreach ($file in $MAP.Keys) {
  $path = Join-Path $SRC $file
  if (-not (Test-Path $path)) { Write-Output "MISSING $file"; continue }
  $id = $MAP[$file]

  $img = New-Object System.Drawing.Bitmap $path
  $W = $img.Width; $H = $img.Height
  $rect = New-Object System.Drawing.Rectangle 0, 0, $W, $H
  $data = $img.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly,
                        [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $stride = $data.Stride
  $bytes = New-Object byte[] ($stride * $H)
  [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
  $img.UnlockBits($data)

  # ink = meaningfully darker than the page, ignoring transparent pixels
  $ink = New-Object 'bool[,]' $W, $H
  $colInk = New-Object int[] $W
  $rowInk = New-Object int[] $H
  for ($y = 0; $y -lt $H; $y++) {
    $row = $y * $stride
    for ($x = 0; $x -lt $W; $x++) {
      $o = $row + ($x * 4)
      if ($bytes[$o + 3] -lt 32) { continue }
      if ((($bytes[$o] + $bytes[$o + 1] + $bytes[$o + 2]) / 3) -lt 205) {
        $ink[$x, $y] = $true; $colInk[$x]++; $rowInk[$y]++
      }
    }
  }

  $labels = $null
  $keep = $null

  if ($CLUSTER -contains $id) {
    # --- connected components (8-way) ---
    $labels = New-Object 'int[,]' $W, $H
    $n = 0; $sz = @(0); $ccx = @(0.0); $ccy = @(0.0)
    $bx0 = @(0); $by0 = @(0); $bx1 = @(0); $by1 = @(0)
    for ($y = 0; $y -lt $H; $y++) {
      for ($x = 0; $x -lt $W; $x++) {
        if (-not $ink[$x, $y] -or $labels[$x, $y] -ne 0) { continue }
        $n++
        $stack = New-Object System.Collections.Stack
        $stack.Push(@($x, $y)); $labels[$x, $y] = $n
        $c = 0; $sx = 0.0; $sy = 0.0
        $a0 = $x; $a1 = $x; $e0 = $y; $e1 = $y
        while ($stack.Count -gt 0) {
          $p = $stack.Pop(); $px = $p[0]; $py = $p[1]
          $c++; $sx += $px; $sy += $py
          if ($px -lt $a0) { $a0 = $px }; if ($px -gt $a1) { $a1 = $px }
          if ($py -lt $e0) { $e0 = $py }; if ($py -gt $e1) { $e1 = $py }
          for ($dy = -1; $dy -le 1; $dy++) {
            for ($dx = -1; $dx -le 1; $dx++) {
              $qx = $px + $dx; $qy = $py + $dy
              if ($qx -lt 0 -or $qy -lt 0 -or $qx -ge $W -or $qy -ge $H) { continue }
              if ($ink[$qx, $qy] -and $labels[$qx, $qy] -eq 0) {
                $labels[$qx, $qy] = $n; $stack.Push(@($qx, $qy))
              }
            }
          }
        }
        $sz += $c; $ccx += ($sx / $c); $ccy += ($sy / $c)
        $bx0 += $a0; $by0 += $e0; $bx1 += $a1; $by1 += $e1
      }
    }

    # --- 2-means, seeded by the largest component and the largest one far from it ---
    $order = 1..$n | Sort-Object { -$sz[$_] }
    $s1 = $order[0]
    $diag = [Math]::Sqrt($W * $W + $H * $H)
    $s2 = $null
    foreach ($i in $order) {
      $d = [Math]::Sqrt([Math]::Pow($ccx[$i] - $ccx[$s1], 2) + [Math]::Pow($ccy[$i] - $ccy[$s1], 2))
      if ($d -gt $diag * 0.30) { $s2 = $i; break }
    }
    if (-not $s2) { throw "only one view found in $file" }

    $ax = $ccx[$s1]; $ay = $ccy[$s1]; $bx = $ccx[$s2]; $by = $ccy[$s2]
    for ($it = 0; $it -lt 40; $it++) {
      $n1 = 0.0; $sx1 = 0.0; $sy1 = 0.0; $n2 = 0.0; $sx2 = 0.0; $sy2 = 0.0
      for ($i = 1; $i -le $n; $i++) {
        $d1 = [Math]::Pow($ccx[$i] - $ax, 2) + [Math]::Pow($ccy[$i] - $ay, 2)
        $d2 = [Math]::Pow($ccx[$i] - $bx, 2) + [Math]::Pow($ccy[$i] - $by, 2)
        if ($d1 -le $d2) { $n1 += $sz[$i]; $sx1 += $ccx[$i] * $sz[$i]; $sy1 += $ccy[$i] * $sz[$i] }
        else             { $n2 += $sz[$i]; $sx2 += $ccx[$i] * $sz[$i]; $sy2 += $ccy[$i] * $sz[$i] }
      }
      if ($n1 -eq 0 -or $n2 -eq 0) { break }
      $nax = $sx1 / $n1; $nay = $sy1 / $n1; $nbx = $sx2 / $n2; $nby = $sy2 / $n2
      $done = ([Math]::Abs($nax - $ax) -lt 0.5 -and [Math]::Abs($nay - $ay) -lt 0.5 -and
               [Math]::Abs($nbx - $bx) -lt 0.5 -and [Math]::Abs($nby - $by) -lt 0.5)
      $ax = $nax; $ay = $nay; $bx = $nbx; $by = $nby
      if ($done) { break }
    }

    # the front view is the top-left cluster
    $frontIsA = (($ax + $ay) -le ($bx + $by))
    $keep = New-Object 'bool[]' ($n + 1)
    $cx0 = $W; $cy0 = $H; $cx1 = 0; $cy1 = 0
    for ($i = 1; $i -le $n; $i++) {
      $d1 = [Math]::Pow($ccx[$i] - $ax, 2) + [Math]::Pow($ccy[$i] - $ay, 2)
      $d2 = [Math]::Pow($ccx[$i] - $bx, 2) + [Math]::Pow($ccy[$i] - $by, 2)
      $keep[$i] = ((($d1 -le $d2)) -eq $frontIsA)
    }

    # These sheets carry faint watermark text. It survives clustering because it
    # sits nearer the front view than the back, and it dragged the crop down by
    # a quarter of the image — the garment ended at 76% of the height with the
    # rest whitespace. The outline is the largest kept component; nothing that
    # belongs to the garment (ribbing, buttons, topstitching, drawcord) falls
    # outside its box, so anything that does is annotation.
    $main = 1
    for ($i = 1; $i -le $n; $i++) { if ($keep[$i] -and $sz[$i] -gt $sz[$main]) { $main = $i } }
    $mw = $bx1[$main] - $bx0[$main]; $mh = $by1[$main] - $by0[$main]
    $ox0 = $bx0[$main] - $mw * 0.02; $ox1 = $bx1[$main] + $mw * 0.02
    $oy0 = $by0[$main] - $mh * 0.02; $oy1 = $by1[$main] + $mh * 0.02
    $dropped = 0
    for ($i = 1; $i -le $n; $i++) {
      if (-not $keep[$i] -or $i -eq $main) { continue }
      if ($bx1[$i] -lt $ox0 -or $bx0[$i] -gt $ox1 -or $by1[$i] -lt $oy0 -or $by0[$i] -gt $oy1) {
        $keep[$i] = $false; $dropped++
      }
    }
    if ($dropped -gt 0) { Write-Output "  (${id}: dropped $dropped marks outside the outline)" }

    for ($i = 1; $i -le $n; $i++) {
      if (-not $keep[$i]) { continue }
      if ($bx0[$i] -lt $cx0) { $cx0 = $bx0[$i] }; if ($bx1[$i] -gt $cx1) { $cx1 = $bx1[$i] }
      if ($by0[$i] -lt $cy0) { $cy0 = $by0[$i] }; if ($by1[$i] -gt $cy1) { $cy1 = $by1[$i] }
    }
  }
  else {
    $first = 0; while ($first -lt $W -and $colInk[$first] -eq 0) { $first++ }
    $last = $W - 1; while ($last -gt 0 -and $colInk[$last] -eq 0) { $last-- }

    $forceY0 = -1; $forceY1 = -1
    if ($BOXES.ContainsKey($id)) {
      $bxr = $BOXES[$id]
      $first = [int]($W * $bxr[0]); $split = [int]($W * $bxr[2])
      $forceY0 = [int]($H * $bxr[1]); $forceY1 = [int]($H * $bxr[3])
    } else {
      $nViews = 2
      if ($VIEWS.ContainsKey($id)) { $nViews = $VIEWS[$id] }
      $split = $first + [int](($last - $first) / $nViews)
    }

    $cx0 = $first; $cx1 = $split
    while ($cx1 -gt $cx0 -and $colInk[$cx1] -eq 0) { $cx1-- }
    $cy0 = 0; while ($cy0 -lt $H -and $rowInk[$cy0] -eq 0) { $cy0++ }
    $cy1 = $H - 1; while ($cy1 -gt 0 -and $rowInk[$cy1] -eq 0) { $cy1-- }
    if ($forceY0 -ge 0) { $cy0 = [Math]::Max($cy0, $forceY0); $cy1 = [Math]::Min($cy1, $forceY1) }
  }

  # Repaint: drop the other view's components, flatten the page background to
  # white (the screenshots carry a light grey ground), keep everything else.
  $flat = New-Object System.Drawing.Bitmap $W, $H, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $gf = [System.Drawing.Graphics]::FromImage($flat)
  $gf.Clear([System.Drawing.Color]::White); $gf.Dispose()
  for ($y = 0; $y -lt $H; $y++) {
    $row = $y * $stride
    for ($x = 0; $x -lt $W; $x++) {
      if ($null -ne $labels) {
        $l = $labels[$x, $y]
        if ($l -ne 0 -and -not $keep[$l]) { continue }
      }
      $o = $row + ($x * 4)
      if ($bytes[$o + 3] -lt 32) { continue }
      $rr = $bytes[$o + 2]; $gg = $bytes[$o + 1]; $bb = $bytes[$o]
      if ($rr -gt 232 -and $gg -gt 232 -and $bb -gt 232) { continue }
      $flat.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $rr, $gg, $bb))
    }
  }

  $pad = 6
  $cx0 = [Math]::Max(0, $cx0 - $pad); $cy0 = [Math]::Max(0, $cy0 - $pad)
  $cx1 = [Math]::Min($W - 1, $cx1 + $pad); $cy1 = [Math]::Min($H - 1, $cy1 + $pad)
  $cw = $cx1 - $cx0 + 1; $ch = $cy1 - $cy0 + 1

  # 900px tall for every garment. Height is the stable dimension: sleeve spread
  # makes overall width vary enormously between garments.
  $outH = 900
  $outW = [int][Math]::Round($cw * $outH / $ch)

  $bmp = New-Object System.Drawing.Bitmap $outW, $outH, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.SmoothingMode = 'HighQuality'
  $g.PixelOffsetMode = 'HighQuality'
  $g.Clear([System.Drawing.Color]::White)
  $g.DrawImage($flat, (New-Object System.Drawing.Rectangle 0, 0, $outW, $outH),
                      (New-Object System.Drawing.Rectangle $cx0, $cy0, $cw, $ch), 'Pixel')
  $g.Dispose(); $flat.Dispose(); $img.Dispose()

  $dest = Join-Path $OUT "$id.png"
  $bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()

  Write-Output ("{0,-11} {1,4}x{2,-4} -> {3}x{4}  {5} KB" -f $id, $cw, $ch, $outW, $outH,
                [int]((Get-Item $dest).Length / 1KB))
}
