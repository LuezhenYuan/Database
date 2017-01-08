function search_catch(){
var key_word=document.getElementById("key_word").value;
document.getElementById("key_word").value="";
var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	//alert(xmlhttp.responseText);
	var xmlDoc=xmlhttp.responseXML;
	Query_search_write(xmlDoc);
  }
}

xmlhttp.open("POST","./Search.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("key_word="+key_word);

}

function Query_search_write(xmlDoc){
	var root_child=xmlDoc.getElementsByTagName("data")[0].childNodes;
	var content="<h1>Results</h1><table style='border-style: dotted dotted dotted dotted ;border-width: 2px 2px 1px 1px;'>";
	//alert(root_child[0].childNodes[0].childNodes[0].nodeValue);
	for(var i=0;i<root_child.length;i++){
		content = content + "<tr><td onMouseOut=\"javascript:this.style.background='transparent'\" onMouseover=\"javascript:this.style.background='#FF7F50'\" onclick='Show_ProteinPage(\"" + root_child[i].childNodes[0].childNodes[0].nodeValue + "\");'>" + root_child[i].childNodes[0].childNodes[0].nodeValue + "</td><td>" + root_child[i].childNodes[1].childNodes[0].nodeValue + "</td><td>" + root_child[i].childNodes[2].childNodes[0].nodeValue +"</td></tr>";
	}
	content +="</table>";
	document.getElementById("maincontent").innerHTML=content;
}
