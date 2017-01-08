<?php
//TODO: batch search
header('Content-Type:text/xml');
$key_word=htmlspecialchars($_REQUEST["key_word"]);
//$key_word="mscL";
$GOname=trim($key_word);
$GOname=stripslashes($key_word);


$con = mysqli_connect("localhost","PHP_Search","123456","MechanosensorDB");
if (!$con)
  {
  die('Could not connect: ' . mysqli_error());
  }
echo '<?xml version="1.0" encoding="ISO-8859-1"?>';
echo '<data>';
//SELECT Uniprot_ID FROM Protein_Info WHERE (Pubmed_ID REGEXP '$key_word' OR Gene_name REGEXP '$key_word' OR Function REGEXP '$key_word' OR Protein_name REGEXP '$key_word');
//echo "SELECT Uniprot_ID FROM Protein_Info WHERE (Pubmed_ID REGEXP '" . $key_word . "' OR Gene_name REGEXP '" . $key_word . "' OR Function REGEXP '" . $key_word . "' OR Protein_name REGEXP '" . $key_word . "');";
$Num_ID = $con ->query("SELECT Uniprot_ID,Protein_name,Organism FROM Protein_Info WHERE (Pubmed_ID REGEXP '" . $key_word . "' OR Gene_name REGEXP '" . $key_word . "' OR Function REGEXP '" . $key_word . "' OR Protein_name REGEXP '" . $key_word . "');");

while($row = $Num_ID ->fetch_array()){
	echo "<row><Uniprot_ID>" . $row['Uniprot_ID'] . "</Uniprot_ID><Protein_name>" . $row['Protein_name'] . "</Protein_name><Organism>" . $row['Organism'] . "</Organism></row>";
}
echo "</data>";
mysqli_close($con);
?>
