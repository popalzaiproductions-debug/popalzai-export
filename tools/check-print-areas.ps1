# Verifies that every print guide and placement box in src/data/garments.ts
# actually sits on the garment.
#
# A point counts as inside when a scan in all four directions hits ink. That
# four-way test is the whole point: these blanks are outlines on white, so
# "is this pixel dark" tells you nothing about whether you are on cloth. A box
# floating in the margin has white in every direction; a box on the chest is
# enclosed.
#
# The numbers come from garments.ts itself, parsed below, so this cannot drift
# out of step with what the site actually renders.

Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$root = Split-Path $PSScriptRoot -Parent
$src = Get-Content (Join-Path $root 'src\data\garments.ts') -Raw
$mockDir = Join-Path $root 'public\mockups'

# --- parse garments.ts -------------------------------------------------------
# Each view block: mockup src, then printArea, then its placements, up to the
# next mockup or the end.
$views = @()
$rxView = [regex]"(?s)mockup:\s*\{\s*src:\s*'/mockups/([^']+)'.*?printArea:\s*\{\s*x:\s*(-?\d+),\s*y:\s*(-?\d+),\s*w:\s*(-?\d+),\s*h:\s*(-?\d+)\s*\}(.*?)(?=mockup:\s*\{|\Z)"
$rxPlace = [regex]"\{\s*id:\s*'([^']+)',\s*label:\s*'[^']*',\s*x:\s*(-?\d+),\s*y:\s*(-?\d+),\s*w:\s*(-?\d+)\s*\}"

foreach ($m in $rxView.Matches($src)) {
  $boxes = @()
  $boxes += , @('guide', [int]$m.Groups[2].Value, [int]$m.Groups[3].Value,
                         [int]$m.Groups[4].Value, [int]$m.Groups[5].Value)
  foreach ($p in $rxPlace.Matches($m.Groups[6].Value)) {
    $w = [int]$p.Groups[4].Value
    $boxes += , @($p.Groups[1].Value, [int]$p.Groups[2].Value, [int]$p.Groups[3].Value,
                  $w, [int]($w * 0.7))
  }
  $views += , @($m.Groups[1].Value, $boxes)
}
Write-Output "parsed $($views.Count) views from garments.ts"
if ($views.Count -eq 0) { throw 'parsed nothing - the regex and garments.ts have diverged' }

# --- check -------------------------------------------------------------------
$totalCorners = 0
$failed = 0
foreach ($v in $views) {
  $png = Join-Path $mockDir $v[0]
  if (-not (Test-Path $png)) { Write-Output ("{0,-22} MISSING IMAGE" -f $v[0]); $failed++; continue }

  $img = New-Object System.Drawing.Bitmap $png
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

  $bad = @()
  $corners = 0
  foreach ($bx in $v[1]) {
    $name = $bx[0]; $x0 = $bx[1]; $y0 = $bx[2]; $x1 = $bx[1] + $bx[3]; $y1 = $bx[2] + $bx[4]
    if (-not (Inside $x0 $y0)) { $bad += "$name-tl" }
    if (-not (Inside $x1 $y0)) { $bad += "$name-tr" }
    if (-not (Inside $x0 $y1)) { $bad += "$name-bl" }
    if (-not (Inside $x1 $y1)) { $bad += "$name-br" }
    $corners += 4
  }
  $totalCorners += $corners
  if ($bad.Count) {
    Write-Output ("{0,-22} OUTSIDE: {1}   (of {2})" -f $v[0], ($bad -join ','), $corners)
    $failed++
  } else {
    Write-Output ("{0,-22} ok  ({1} corners)" -f $v[0], $corners)
  }
}
Write-Output ""
Write-Output "$totalCorners corners checked, $failed view(s) with problems"
