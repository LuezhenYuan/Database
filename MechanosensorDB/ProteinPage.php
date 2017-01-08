<?php
//ProteinPage.php
header('Content-Type:text/xml');
$Uniprot_ID=htmlspecialchars($_REQUEST["uniprotID"]);
//$Uniprot_ID="P0A742";
$Uniprot_ID=trim($Uniprot_ID);
$Uniprot_ID=stripslashes($Uniprot_ID);
$col=htmlspecialchars($_REQUEST["col"]);
//$col="GO_ID";
$con = mysqli_connect("localhost","PHP_Search","123456","MechanosensorDB");
if (!$con)
  {
  die('Could not connect: ' . mysqli_error());
  }
echo '<?xml version="1.0" encoding="ISO-8859-1"?>';
echo '<data>';

/*
 * 	$Num_GO = $con ->query("SELECT DISTINCT GO_ID,GO_name FROM GO_Annotation WHERE GO_namespace LIKE \"%" . $col . "%\";");
	while($row = $Num_GO ->fetch_array()){
		$Num_Uni_GO = $con ->query("SELECT Uniprot_ID FROM Protein_Info WHERE GO_ID REGEXP '" . $row['GO_ID'] ."'");
		if(mysqli_num_rows($Num_Uni_GO)==0){}
		else{echo "<Protein_name>" . $row['GO_name'] . "</Protein_name>";}
		}
*/
//echo "SELECT * FROM Protein_Info WHERE Uniprot_ID=\"" . $Uniprot_ID . "\";";
if($col==""){
	$data_ProteinInfo=$con ->query("SELECT * FROM Protein_Info WHERE Uniprot_ID=\"" . $Uniprot_ID . "\";");
	$row = $data_ProteinInfo ->fetch_array(MYSQLI_ASSOC);

	foreach($row as $key=>$value) {
	  if($value != ""){
	  echo "<" . $key . ">" . $value . "</" . $key . ">";
	  }
	}
}
else if($col=="GO_ID"){
	$data_GO = $con ->query("SELECT GO_ID FROM Protein_Info WHERE Uniprot_ID=\"" . $Uniprot_ID . "\";");
	$row = $data_GO ->fetch_array()[0];
	//echo $row;
	$Arr = explode('; ',$row);
	foreach($Arr as $item){
	$data_GO_tb = $con ->query("SELECT * FROM GO_Annotation WHERE GO_ID=\"" . $item . "\";");
	echo "<GO>";
	$row = $data_GO_tb ->fetch_array(MYSQLI_ASSOC);
	foreach($row as $key=>$value) {
	  if($value != ""){
	  echo "<" . $key . ">" . $value . "</" . $key . ">";
	  }
	}
	echo "</GO>";
	}
	}

echo '</data>';

mysqli_close($con);
?>
