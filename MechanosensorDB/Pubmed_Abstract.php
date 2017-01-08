<?php
header('Content-Type:text/xml');
//$ID_array=htmlspecialchars($_REQUEST["uniprotID"]);
$ID_array=htmlspecialchars($_REQUEST["uniprotID"]);//Actually if is not uniprot ID, just for save the code
//htmlspecialchars("26096820;  26139440;  26764245;  26775353;  10050752;  10050752;  10050752");
$ID_array=trim($ID_array);
$ID_array=stripslashes($ID_array);
$ID_array=preg_replace('/\s+/','',$ID_array);
//echo $ID_array;
echo '<?xml version="1.0" encoding="ISO-8859-1"?>';
echo '<data>';
$IDs = explode(';',$ID_array);
if (file_exists('backup/PMID_merge_force_and_mechano.txt')) {
    $file_list = file_get_contents('backup/PMID_merge_force_and_mechano.txt');
    //echo "good";
    //echo $xml;
    }
else {exit();}
foreach($IDs as $ID){
	//echo $ID . "\n";
	if(strstr($file_list,$ID . ".xml")){echo $ID . ",";}
	}
echo '</data>';
?>
