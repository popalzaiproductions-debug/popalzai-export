# Reports the printable body of every view in public/mockups/.
#
# "Inside" is decided by ray-casting: a point is inside the garment when a scan
# in all four directions hits ink. That is what makes this safe on a line
# drawing - the garments are outlines on white, not filled shapes, so a simple
# "is this pixel dark" test says nothing about whether you are on the cloth.
#
# The chest band is sampled at several heights and the NARROWEST span is taken,
# because a print guide has to fit at every height it spans. Sleeves join the
# body partway down and widen the measurement enormously; those rows are
# reported too so they can be recognised and ignored.

Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'
$OUT = Join-Path $PSScriptRoot '..\public\mockups'

foreach ($f in Get-ChildItem $OUT -Filter *.png | Sort-Object Name) {
  $img = New-Object System.Drawing.Bitmap $f.FullName
  $W = $img.Width; $H = $img.Height
  $rect = New-Object System.Drawing.Rectangle 0, 0, $W, $H
  $bd = $img.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly,
                      [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $st = $bd.Stride; $b = New-Object byte[] ($st * $H)
  [System.Runtime.InteropServices.Marshal]::Copy($bd.Scan0, $b, 0, $b.Length)
  $img.UnlockBits($bd); $img.Dispose()

  $ink = New-Object 'bool[,]' $W, $H
  for ($y = 0; $y -lt $H; $y++) {
    $row = $y * $st
    for ($x = 0; $x -lt $W; $x++) {
      $o = $row + $x * 4
      $ink[$x, $y] = ((($b[$o] + $b[$o + 1] + $b[$o + 2]) / 3) -lt 200)
    }
  }
  function Inside($px, $py) {
    if ($px -lt 0 -or $py -lt 0 -or $px -ge $W -or $py -ge $H) { return $false }
    $hits = 0
    foreach ($d in @(@(1, 0), @(-1, 0), @(0, 1), @(0, -1))) {
      for ($s = 1; $s -lt 2400; $s++) {
        $qx = $px + $d[0] * $s; $qy = $py + $d[1] * $s
        if ($qx -lt 0 -or $qy -lt 0 -or $qx -ge $W -or $qy -ge $H) { break }
        if ($ink[$qx, $qy]) { $hits++; break }
      }
    }
    return ($hits -eq 4)
  }

  Write-Output ("{0}  {1}x{2}" -f $f.BaseName, $W, $H)
  $rows = @()
  foreach ($fr in 0.25, 0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70) {
    $y = [int]($H * $fr)
    # seed from the horizontal middle, where the body is on every view
    $seed = -1
    for ($x = [int]($W * 0.42); $x -lt [int]($W * 0.58); $x++) { if (Inside $x $y) { $seed = $x; break } }
    if ($seed -lt 0) { Write-Output ("   {0:0.00} y={1,-4} (no body)" -f $fr, $y); continue }
    $l = $seed; while ($l -gt 0 -and (Inside ($l - 1) $y)) { $l-- }
    $r = $seed; while ($r -lt $W - 1 -and (Inside ($r + 1) $y)) { $r++ }
    $rows += , @($y, $l, $r)
    Write-Output ("   {0:0.00} y={1,-4} {2,5}..{3,-5} width {4,5}  centre {5}" -f $fr, $y, $l, $r, ($r - $l), [int](($l + $r) / 2))
  }
}
