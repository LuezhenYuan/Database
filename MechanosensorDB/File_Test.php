<?php
//Test whether file is exist
header('Content-Type:text/xml');
$file_name=htmlspecialchars($_REQUEST["fname"]);
//$file_name="./DB_GO_CC_backup.xml";
if (file_exists($file_name)) {
    $xml = file_get_contents($file_name);
    //echo "good";
    echo $xml;
} else {
    exit();
}
?>
