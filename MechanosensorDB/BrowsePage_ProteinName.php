<?php
header('Content-Type:text/xml');
//header("Cache-Control: no-cache, must-revalidate");
//BrowsePage_ProteinName.php
//This file is used to query the MechanosensorDB database
$pname=htmlspecialchars($_REQUEST["pname"]);//Not yet down!!!
//$pname="";
//$pname="40S ribosomal protein S12 (Fragment)";
$col = htmlspecialchars($_REQUEST["col"]);
//$col="Species";
$pname=trim($pname);
$pname=stripslashes($pname);

///////////
//Change $col to database table's column name
if($col=="Protein_Name") {$col="Protein_name";}
else if($col=="Species") {$col="Organism";}
////////////
$con = mysqli_connect("localhost","PHP_Search","123456","MechanosensorDB");
if (!$con)
  {
  die('Could not connect: ' . mysqli_error());
  }
echo '<?xml version="1.0" encoding="ISO-8859-1"?>';
echo '<data>';
if($pname==""){//Return all protein
	$Num_count = $con ->query("SELECT COUNT(DISTINCT " . $col .") FROM Protein_Info;");
	$Num_ProteinName = $con ->query("SELECT DISTINCT " . $col ." FROM Protein_Info ORDER BY " . $col .";");
	echo "<Count>" . ($Num_count ->fetch_array())['COUNT(DISTINCT '. $col .')'] . "</Count>";
	while($row = $Num_ProteinName ->fetch_array())
	 {
	 echo "<Protein_name>" . $row[$col] . "</Protein_name>";
 }
}
else{
	$Num_count = $con ->query('SELECT COUNT(DISTINCT Uniprot_ID) FROM Protein_Info WHERE  '. $col .' LIKE "' . $pname . "\";");
	//'\'SELECT COUNT(DISTINCT Uniprot_ID) FROM Protein_Info WHERE Protein_name LIKE "' . $pname . "\";'"
	$tmp2='SELECT DISTINCT Uniprot_ID FROM Protein_Info WHERE  '. $col .' LIKE "' . $pname . "\" ORDER BY Uniprot_ID LIMIT 3;";
	$Num_ProteinName = $con ->query('SELECT DISTINCT Uniprot_ID FROM Protein_Info WHERE  '. $col .' LIKE "' . $pname . "\" ORDER BY Uniprot_ID;");
	echo "<Count>" . ($Num_count ->fetch_array())['COUNT(DISTINCT Uniprot_ID)'] . "</Count>";
	while($row = $Num_ProteinName ->fetch_array())
	 {
	 echo "<Protein_name>" . $row['Uniprot_ID'] . "</Protein_name>";
	 }
}
echo '</data>';

// some code
mysqli_close($con);
?>
