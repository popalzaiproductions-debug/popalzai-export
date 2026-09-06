Add-Type -AssemblyName System.Drawing
$OUT = 'C:\Users\fakea\popalzai\public\mockups'
# id -> printArea x,y,w,h ; then placement triples x,y,w
$SPEC = @{
  'tee'        = @{ pa=@(403,190,444,430); pl=@(@(735,210,111),@(404,210,111),@(440,230,370),@(403,190,444)) }
  'tank'       = @{ pa=@(150,250,310,380); pl=@(@(328,270,111),@(170,270,111),@(170,290,270),@(150,250,310)) }
  'longsleeve' = @{ pa=@(290,200,310,380); pl=@(@(470,230,111),@(311,230,111),@(310,250,270),@(290,200,310)) }
  'polo'       = @{ pa=@(150,280,400,430); pl=@(@(396,300,108),@(193,300,108),@(150,380,400)) }
  'shirt'      = @{ pa=@(290,280,300,380); pl=@(@(467,300,100),@(315,300,100),@(300,400,280)) }
  'hoodie'     = @{ pa=@(650,300,400,280); pl=@(@(900,320,100),@(700,320,100),@(683,340,333),@(650,300,400)) }
  'cap'        = @{ pa=@(380,140,470,270); pl=@(@(390,160,450),@(490,200,250)) }
}
foreach ($id in ($SPEC.Keys | Sort-Object)) {
  $img = New-Object System.Drawing.Bitmap (Join-Path $OUT "$id.png")
  $W=$img.Width; $H=$img.Height
  $r = New-Object System.Drawing.Rectangle 0,0,$W,$H
  $bd = $img.LockBits($r,[System.Drawing.Imaging.ImageLockMode]::ReadOnly,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $st=$bd.Stride; $b=New-Object byte[] ($st*$H)
  [System.Runtime.InteropServices.Marshal]::Copy($bd.Scan0,$b,0,$b.Length); $img.UnlockBits($bd); $img.Dispose()
  $ink = New-Object 'bool[,]' $W,$H
  for($y=0;$y -lt $H;$y++){ $row=$y*$st
    for($x=0;$x -lt $W;$x++){ $o=$row+$x*4
      $ink[$x,$y] = ((($b[$o]+$b[$o+1]+$b[$o+2])/3) -lt 200) } }
  function Inside($px,$py){
    if($px -lt 0 -or $py -lt 0 -or $px -ge $W -or $py -ge $H){ return $false }
    $n=0
    foreach($d in @(@(1,0),@(-1,0),@(0,1),@(0,-1))){
      for($k=1;$k -lt 2200;$k++){
        $qx=$px+$d[0]*$k; $qy=$py+$d[1]*$k
        if($qx -lt 0 -or $qy -lt 0 -or $qx -ge $W -or $qy -ge $H){ break }
        if($ink[$qx,$qy]){ $n++; break } } }
    return ($n -eq 4)
  }
  $bad=@()
  $pa=$SPEC[$id].pa
  $names = @('guide'); $bxs = @([int]$pa[0]); $bys = @([int]$pa[1])
  $bws = @([int]$pa[2]); $bhs = @([int]$pa[3])
  $i=0
  foreach($p in $SPEC[$id].pl){
    $i++
    $names += "p$i"; $bxs += [int]$p[0]; $bys += [int]$p[1]
    $bws += [int]$p[2]; $bhs += [int]([double]$p[2]*0.7)
  }
  for($k=0;$k -lt $names.Count;$k++){
    $x0=$bxs[$k]; $y0=$bys[$k]; $x1=$bxs[$k]+$bws[$k]; $y1=$bys[$k]+$bhs[$k]
    if(-not (Inside $x0 $y0)){ $bad += "$($names[$k])-tl" }
    if(-not (Inside $x1 $y0)){ $bad += "$($names[$k])-tr" }
    if(-not (Inside $x0 $y1)){ $bad += "$($names[$k])-bl" }
    if(-not (Inside $x1 $y1)){ $bad += "$($names[$k])-br" }
  }
  $checked = $names.Count * 4
  if($bad.Count){ Write-Output ("{0,-11} OUTSIDE: {1}  (of {2} corners)" -f $id, ($bad -join ','), $checked) }
  else { Write-Output ("{0,-11} ok  ({1} corners checked)" -f $id, $checked) }
}
