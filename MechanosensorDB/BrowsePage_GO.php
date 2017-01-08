<?php
//BrowsePage_GO
header('Content-Type:text/xml');
//header("Cache-Control: no-cache, must-revalidate");
//BrowsePage_ProteinName.php
//This file is used to query the MechanosensorDB database

$GOname=htmlspecialchars($_REQUEST["pname"]);
//$GOname="";
//$$GOname=="40S ribosomal protein S12 (Fragment)";
$GO_cat = htmlspecialchars($_REQUEST["col"]);
//$GO_cat="BP";
$GOname=trim($GOname);
$GOname=stripslashes($GOname);

if($GO_cat=="CC"){$col="cellular_component";}
else if($GO_cat=="BP"){$col="biological_process";}
else if($GO_cat=="MF"){$col="molecular_function";}
$con = mysqli_connect("localhost","PHP_Search","123456","MechanosensorDB");
if (!$con)
  {
  die('Could not connect: ' . mysqli_error());
  }
echo '<?xml version="1.0" encoding="ISO-8859-1"?>';
echo '<data>';
if($GOname==""){
	$Num_GO = $con ->query("SELECT DISTINCT GO_ID,GO_name FROM GO_Annotation WHERE GO_namespace LIKE \"%" . $col . "%\";");
	while($row = $Num_GO ->fetch_array()){
		$Num_Uni_GO = $con ->query("SELECT Uniprot_ID FROM Protein_Info WHERE GO_ID REGEXP '" . $row['GO_ID'] ."'");
		if(mysqli_num_rows($Num_Uni_GO)==0){}
		else{echo "<Protein_name>" . $row['GO_name'] . "</Protein_name>";}
		}
}
else{
	$Num_GO = $con ->query("SELECT DISTINCT GO_ID FROM GO_Annotation WHERE (GO_namespace LIKE \"%" . $col . "%\" AND GO_name=\"" . $GOname . "\");");
	$row = $Num_GO ->fetch_array();
	$Num_Uni_GO = $con ->query("SELECT Uniprot_ID FROM Protein_Info WHERE GO_ID REGEXP '" . $row['GO_ID'] ."';");
	while($child_row = $Num_Uni_GO ->fetch_array()){
		echo "<Protein_name>" . $child_row['Uniprot_ID'] . "</Protein_name>";
		}
}
/*
$Num_GO = $con ->query("SELECT DISTINCT GO_ID,GO_name FROM GO_Annotation WHERE GO_namespace LIKE \"%" . $col . "%\";");
while($row = $Num_GO ->fetch_array())
	 {
	 $Num_Uni_GO = $con ->query("SELECT Uniprot_ID FROM Protein_Info WHERE GO_ID REGEXP '" . $row['GO_ID'] ."'");
	 if(mysqli_num_rows($Num_Uni_GO)==0){}
	 else{
		echo "<Two>";
		while($child_row = $Num_Uni_GO ->fetch_array()){
			echo "<Uniprot>" . $child_row['Uniprot_ID'] . "</Uniprot>";
			echo "<GO>" . $row['GO_name'] . "</GO>";
		}
		echo "</two>"; 
	 }

 }
*/
echo '</data>';

// some code
mysqli_close($con);
?>
