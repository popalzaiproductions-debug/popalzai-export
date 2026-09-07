# refs/*.png  ->  public/mockups/<garment>-<view>.png
#
# Each sheet in refs/ is a technical flat carrying two or three views of one
# garment, plus rulers, spec boxes and (on some) faint watermark text. This
# separates the views, cleans each one, and writes it out 900px tall - the
# convention every coordinate in src/data/garments.ts is written against.
#
# Views are separated by labelling connected ink components and k-means
# clustering their centroids, weighted by pixel count so the garment outlines
# anchor the clusters. Do NOT split on a gap in the ink instead: the widest gap
# on a sheet is often INSIDE a garment (a tee's underarm), where sleeves nearly
# touch there is no gap at all, and the hoodie's two views are drawn diagonally
# overlapping so no straight line separates them in any direction.
#
# Within each cluster, anything falling outside the largest component's box is
# dropped. That is the watermark text: it sits nearer one view than the other so
# clustering keeps it, and it stretched the hoodie crop by a quarter of the
# image. Nothing that belongs to a garment - ribbing, buttons, topstitching,
# drawcord - lies outside its own outline.
#
# NOTE: PowerShell variable names are case-insensitive, so $k and $K are one
# variable. The cluster count and cluster index are named $nview and $ci for
# that reason; do not "tidy" them back to $K and $k.

Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$SRC = Join-Path $PSScriptRoot '..\refs'
$OUT = Join-Path $PSScriptRoot '..\public\mockups'
New-Item -ItemType Directory -Force $OUT | Out-Null

$SHEETS = @{
  'Screenshot 2026-09-06 184402.png' = @('tee',        @('front', 'back'))
  'Screenshot 2026-09-06 184332.png' = @('tank',       @('front', 'back'))
  'Screenshot 2026-09-06 184046.png' = @('polo',       @('front', 'back'))
  'longsleeve.png'                   = @('longsleeve', @('front', 'back'))
  'shirt.png'                        = @('shirt',      @('front', 'back'))
  'hoodie.png'                       = @('hoodie',     @('front', 'back'))
  'hat.png'                          = @('cap',        @('front', 'side', 'back'))
}

foreach ($file in $SHEETS.Keys) {
  $path = Join-Path $SRC $file
  if (-not (Test-Path $path)) { Write-Output "MISSING $file"; continue }
  $id = $SHEETS[$file][0]; $vnames = $SHEETS[$file][1]; $nview = $vnames.Count

  $img = New-Object System.Drawing.Bitmap $path
  $W = $img.Width; $H = $img.Height
  $rect = New-Object System.Drawing.Rectangle 0, 0, $W, $H
  $bd = $img.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly,
                      [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $st = $bd.Stride; $b = New-Object byte[] ($st * $H)
  [System.Runtime.InteropServices.Marshal]::Copy($bd.Scan0, $b, 0, $b.Length)
  $img.UnlockBits($bd)

  $ink = New-Object 'bool[,]' $W, $H
  for ($y = 0; $y -lt $H; $y++) {
    $row = $y * $st
    for ($x = 0; $x -lt $W; $x++) {
      $o = $row + $x * 4
      if ($b[$o + 3] -lt 32) { continue }
      $ink[$x, $y] = ((($b[$o] + $b[$o + 1] + $b[$o + 2]) / 3) -lt 205)
    }
  }

  # connected components
  $lab = New-Object 'int[,]' $W, $H
  $n = 0; $sz = @(0); $ccx = @(0.0); $ccy = @(0.0)
  $bx0 = @(0); $by0 = @(0); $bx1 = @(0); $by1 = @(0)
  for ($y = 0; $y -lt $H; $y++) {
    for ($x = 0; $x -lt $W; $x++) {
      if (-not $ink[$x, $y] -or $lab[$x, $y] -ne 0) { continue }
      $n++
      $s = New-Object System.Collections.Stack
      $s.Push(@($x, $y)); $lab[$x, $y] = $n
      $c = 0; $sx = 0.0; $sy = 0.0; $a0 = $x; $a1 = $x; $e0 = $y; $e1 = $y
      while ($s.Count -gt 0) {
        $p = $s.Pop(); $px = $p[0]; $py = $p[1]; $c++; $sx += $px; $sy += $py
        if ($px -lt $a0) { $a0 = $px }; if ($px -gt $a1) { $a1 = $px }
        if ($py -lt $e0) { $e0 = $py }; if ($py -gt $e1) { $e1 = $py }
        for ($dy = -1; $dy -le 1; $dy++) {
          for ($dx = -1; $dx -le 1; $dx++) {
            $qx = $px + $dx; $qy = $py + $dy
            if ($qx -lt 0 -or $qy -lt 0 -or $qx -ge $W -or $qy -ge $H) { continue }
            if ($ink[$qx, $qy] -and $lab[$qx, $qy] -eq 0) { $lab[$qx, $qy] = $n; $s.Push(@($qx, $qy)) }
          }
        }
      }
      $sz += $c; $ccx += ($sx / $c); $ccy += ($sy / $c)
      $bx0 += $a0; $by0 += $e0; $bx1 += $a1; $by1 += $e1
    }
  }

  # k-means on centroids, seeded by the K largest components that are mutually far apart
  $order = 1..$n | Sort-Object { -$sz[$_] }
  $diag = [Math]::Sqrt($W * $W + $H * $H)
  $seeds = @($order[0])
  foreach ($i in $order) {
    if ($seeds.Count -ge $nview) { break }
    $ok = $true
    foreach ($sd in $seeds) {
      $d = [Math]::Sqrt([Math]::Pow($ccx[$i] - $ccx[$sd], 2) + [Math]::Pow($ccy[$i] - $ccy[$sd], 2))
      if ($d -lt $diag * 0.20) { $ok = $false; break }
    }
    if ($ok) { $seeds += $i }
  }
  $nview = $seeds.Count
  $cX = [double[]]::new($nview); $cY = [double[]]::new($nview)
  for ($ci = 0; $ci -lt $nview; $ci++) { $cX[$ci] = $ccx[$seeds[$ci]]; $cY[$ci] = $ccy[$seeds[$ci]] }
  if ($nview -lt 1) { Write-Output "  skipped ${id}: no components"; $img.Dispose(); continue }
  Write-Output ("{0}: {1} components, {2} views" -f $id, $n, $nview)

  for ($it = 0; $it -lt 40; $it++) {
    $wt = [double[]]::new($nview); $sX = [double[]]::new($nview); $sY = [double[]]::new($nview)
    for ($i = 1; $i -le $n; $i++) {
      $best = 0; $bd2 = [double]::MaxValue
      for ($ci = 0; $ci -lt $nview; $ci++) {
        $d2 = [Math]::Pow($ccx[$i] - $cX[$ci], 2) + [Math]::Pow($ccy[$i] - $cY[$ci], 2)
        if ($d2 -lt $bd2) { $bd2 = $d2; $best = $ci }
      }
      $wt[$best] += $sz[$i]; $sX[$best] += $ccx[$i] * $sz[$i]; $sY[$best] += $ccy[$i] * $sz[$i]
    }
    for ($ci = 0; $ci -lt $nview; $ci++) { if ($wt[$ci] -gt 0) { $cX[$ci] = $sX[$ci] / $wt[$ci]; $cY[$ci] = $sY[$ci] / $wt[$ci] } }
  }

  # assign, then per cluster drop marks outside its own largest component's box
  $asg = [int[]]::new($n + 1)
  for ($i = 1; $i -le $n; $i++) {
    $best = 0; $bd2 = [double]::MaxValue
    for ($ci = 0; $ci -lt $nview; $ci++) {
      $d2 = [Math]::Pow($ccx[$i] - $cX[$ci], 2) + [Math]::Pow($ccy[$i] - $cY[$ci], 2)
      if ($d2 -lt $bd2) { $bd2 = $d2; $best = $ci }
    }
    $asg[$i] = $best
  }

  # order clusters left to right
  $idx = 0..($nview - 1) | Sort-Object { $cX[$_] }

  $vi = 0
  foreach ($ci in $idx) {
    $vi++
    $main = 0
    for ($i = 1; $i -le $n; $i++) { if ($asg[$i] -eq $ci -and ($main -eq 0 -or $sz[$i] -gt $sz[$main])) { $main = $i } }
    if ($main -eq 0) { continue }
    $mw = $bx1[$main] - $bx0[$main]; $mh = $by1[$main] - $by0[$main]
    $ox0 = $bx0[$main] - $mw * 0.02; $ox1 = $bx1[$main] + $mw * 0.02
    $oy0 = $by0[$main] - $mh * 0.02; $oy1 = $by1[$main] + $mh * 0.02
    $keep = [bool[]]::new($n + 1)
    $cx0 = $W; $cy0 = $H; $cx1 = 0; $cy1 = 0
    for ($i = 1; $i -le $n; $i++) {
      if ($asg[$i] -ne $ci) { continue }
      if ($i -ne $main -and ($bx1[$i] -lt $ox0 -or $bx0[$i] -gt $ox1 -or $by1[$i] -lt $oy0 -or $by0[$i] -gt $oy1)) { continue }
      $keep[$i] = $true
      if ($bx0[$i] -lt $cx0) { $cx0 = $bx0[$i] }; if ($bx1[$i] -gt $cx1) { $cx1 = $bx1[$i] }
      if ($by0[$i] -lt $cy0) { $cy0 = $by0[$i] }; if ($by1[$i] -gt $cy1) { $cy1 = $by1[$i] }
    }

    $flat = New-Object System.Drawing.Bitmap $W, $H, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $gf = [System.Drawing.Graphics]::FromImage($flat); $gf.Clear([System.Drawing.Color]::White); $gf.Dispose()
    for ($y = 0; $y -lt $H; $y++) {
      $row = $y * $st
      for ($x = 0; $x -lt $W; $x++) {
        $l = $lab[$x, $y]
        if ($l -eq 0 -or -not $keep[$l]) { continue }
        $o = $row + $x * 4
        $flat.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $b[$o + 2], $b[$o + 1], $b[$o]))
      }
    }
    $pad = 6
    $cx0 = [Math]::Max(0, $cx0 - $pad); $cy0 = [Math]::Max(0, $cy0 - $pad)
    $cx1 = [Math]::Min($W - 1, $cx1 + $pad); $cy1 = [Math]::Min($H - 1, $cy1 + $pad)
    $cw = $cx1 - $cx0 + 1; $ch = $cy1 - $cy0 + 1
    $outH = 900; $outW = [int][Math]::Round($cw * $outH / $ch)
    $bmp = New-Object System.Drawing.Bitmap $outW, $outH, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'; $g.PixelOffsetMode = 'HighQuality'
    $g.Clear([System.Drawing.Color]::White)
    $g.DrawImage($flat, (New-Object System.Drawing.Rectangle 0, 0, $outW, $outH),
                        (New-Object System.Drawing.Rectangle $cx0, $cy0, $cw, $ch), 'Pixel')
    $g.Dispose(); $flat.Dispose()
    $dest = Join-Path $OUT ("{0}-{1}.png" -f $id, $vnames[$vi - 1])
    $bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
    Write-Output ("  {0,-11} {1,-6} {2}x{3} src -> {4}x{5}  {6} KB" -f $id, $vnames[$vi - 1], $cw, $ch, $outW, $outH, [int]((Get-Item $dest).Length / 1KB))
  }
  $img.Dispose()
}
