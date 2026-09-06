Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$SRC = 'C:\Users\fakea\popalzai\refs'
$OUT = 'C:\Users\fakea\popalzai\public\mockups'
New-Item -ItemType Directory -Force $OUT | Out-Null

# file -> garment id. The three screenshots are the polo, tank and tee.
# file -> @(garment id, number of views on the sheet)
$VIEWS = @{ 'cap' = 3 }
# The hoodies are laid out diagonally - front top-left, back bottom-right - so
# the views overlap in x and no column gap separates them. Crop those by hand,
# as fractions of the image: x0, y0, x1, y1.
$BOXES = @{
  'hoodie'    = @(0.00, 0.00, 0.60, 0.74)
  'ziphoodie' = @(0.00, 0.00, 0.60, 0.74)
  'cap'       = @(0.00, 0.00, 0.30,  1.00)
}
$MAP = @{
  'Screenshot 2026-09-06 184402.png' = 'tee'
  'Screenshot 2026-09-06 184332.png' = 'tank'
  'Screenshot 2026-09-06 184046.png' = 'polo'
  'longsleeve.png'                   = 'longsleeve'
  'shirt.png'                        = 'shirt'
  'hoodie.png'                       = 'hoodie'
  'hoodie zip.png'                   = 'ziphoodie'
  'jeans.png'                        = 'jeans'
  'hat.png'                          = 'cap'
}

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/png' }

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

  # ink = anything meaningfully darker than the page, ignoring transparent pixels
  $colInk = New-Object int[] $W
  $rowInk = New-Object int[] $H
  for ($y = 0; $y -lt $H; $y++) {
    $row = $y * $stride
    for ($x = 0; $x -lt $W; $x++) {
      $o = $row + ($x * 4)
      if ($bytes[$o + 3] -lt 32) { continue }
      $lum = ($bytes[$o] + $bytes[$o + 1] + $bytes[$o + 2]) / 3
      if ($lum -lt 205) { $colInk[$x]++; $rowInk[$y]++ }
    }
  }

  $first = 0; while ($first -lt $W -and $colInk[$first] -eq 0) { $first++ }
  $last = $W - 1; while ($last -gt 0 -and $colInk[$last] -eq 0) { $last-- }
  $span = $last - $first

  $nViews = 2
  if ($VIEWS.ContainsKey($id)) { $nViews = $VIEWS[$id] }

  $forceY0 = -1; $forceY1 = -1
  if ($BOXES.ContainsKey($id)) {
    $bx = $BOXES[$id]
    $first   = [int]($W * $bx[0])
    $split   = [int]($W * $bx[2])
    $forceY0 = [int]($H * $bx[1])
    $forceY1 = [int]($H * $bx[3])
  } else {
    # Views on these sheets are evenly spaced, so an even division is more
    # reliable than hunting for a gap: the widest gap can sit inside a garment,
    # and where sleeves nearly touch there is no gap at all.
    $split = $first + [int]($span / $nViews)
  }

  # content box of the FRONT (left) view
  $cx0 = $first
  $cx1 = $split
  while ($cx1 -gt $cx0 -and $colInk[$cx1] -eq 0) { $cx1-- }
  $cy0 = 0; while ($cy0 -lt $H -and $rowInk[$cy0] -eq 0) { $cy0++ }
  $cy1 = $H - 1; while ($cy1 -gt 0 -and $rowInk[$cy1] -eq 0) { $cy1-- }
  if ($forceY0 -ge 0) { $cy0 = [Math]::Max($cy0, $forceY0); $cy1 = [Math]::Min($cy1, $forceY1) }

  $pad = 6
  $cx0 = [Math]::Max(0, $cx0 - $pad); $cy0 = [Math]::Max(0, $cy0 - $pad)
  $cx1 = [Math]::Min($W - 1, $cx1 + $pad); $cy1 = [Math]::Min($H - 1, $cy1 + $pad)
  $cw = $cx1 - $cx0 + 1; $ch = $cy1 - $cy0 + 1

  # scale so every garment is 900px tall — matches the vector flats' convention
  $outH = 900
  $outW = [int][Math]::Round($cw * $outH / $ch)

  $bmp = New-Object System.Drawing.Bitmap $outW, $outH, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.SmoothingMode = 'HighQuality'
  $g.PixelOffsetMode = 'HighQuality'
  $g.Clear([System.Drawing.Color]::White)
  $srcR = New-Object System.Drawing.Rectangle $cx0, $cy0, $cw, $ch
  $dstR = New-Object System.Drawing.Rectangle 0, 0, $outW, $outH
  $g.DrawImage($img, $dstR, $srcR, 'Pixel')
  $g.Dispose()

  # The hoodies' back view sits diagonally below-right of the front, so no
  # rectangle separates them. Crop generously, then erase the corner the back
  # view pokes into. Fractions of the CROPPED image: x0, y0.
  $ERASE = @{
    'hoodie'    = @(0.70, 0.80)
    'ziphoodie' = @(0.70, 0.80)
  }
  if ($ERASE.ContainsKey($id)) {
    $er = $ERASE[$id]
    $ex = [int]($outW * $er[0]); $ey = [int]($outH * $er[1])
    $gg = [System.Drawing.Graphics]::FromImage($bmp)
    $gg.FillRectangle([System.Drawing.Brushes]::White, $ex, $ey, $outW - $ex, $outH - $ey)
    $gg.Dispose()
  }

  # Screenshots carry the page background - light grey on some. Flatten
  # anything near-white so every garment sits on the same clean ground.
  for ($y = 0; $y -lt $outH; $y++) {
    for ($x = 0; $x -lt $outW; $x++) {
      $px = $bmp.GetPixel($x, $y)
      if ($px.R -gt 232 -and $px.G -gt 232 -and $px.B -gt 232) {
        $bmp.SetPixel($x, $y, [System.Drawing.Color]::White)
      }
    }
  }

  $dest = Join-Path $OUT "$id.png"
  $bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose(); $img.Dispose()

  Write-Output ("{0,-11} {1,4}x{2,-4} -> {3}x{4}  {5} KB" -f $id, $cw, $ch, $outW, $outH,
                [int]((Get-Item $dest).Length / 1KB))
}
