//File Test JS
function file_test(file_name){
var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
//var xmlDoc;
var xmlDoc;
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		if(xmlhttp.responseText==""){xmlDoc="";}
		else{xmlDoc=xmlhttp.responseXML;}
    }
  }

xmlhttp.open("POST","./File_Test.php",false);

xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("fname="+file_name);
return xmlDoc;
}
