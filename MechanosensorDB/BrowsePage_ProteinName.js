//This JS file contain Browse page Protein Name of MechanosensorDB
//Use AJAX to send things to php

function Show_BrowseProteinName(page=""){//Show check Which to browse
	//page='Protein_Name';
	////View whether back up file exist
	var filespect="backup/DB_" + page + "_backup.xml";
	var fso =file_test(filespect);
	//alert(fso);
	var maincontent=document.getElementById("maincontent");
	maincontent.innerHTML="";//Delete all corrent DOM nodes
	var tmp_content="<h1 id='h11'>" + page +"</h1>";
	
	//Begin
	//try
	tmp_content=tmp_content + "<div id=" +page +"></div>";
	//tmp_content=tmp_content + "<textarea id='see_PHPoutput'></textarea>";
	maincontent.innerHTML=tmp_content;
	if(fso != ""){
		//alert("Here!");
		Query_PHP_write(fso,page,page);
		//delete(fso);
	}
	else{
		//alert(page);
		//alert
		Query_PHP(page,page,0);
		//delete(fso);
	}

}

function Query_PHP(DOM_node="",col="",ind=0,name=""){//AJAX
	//Prepare
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
	if(ind==0){Query_PHP_write(xmlDoc,DOM_node,col);}//first level node in browse page
	else if(ind==1){//sub children of browse page
		if(escape(document.getElementById(DOM_node).innerHTML) != name){document.getElementById(DOM_node).innerHTML=unescape(name);}
		else{Query_PHP_child_write(xmlDoc,DOM_node);}
	}
    }
  }
if(col=="Protein_Name" || col=="Species"){
xmlhttp.open("POST","./BrowsePage_ProteinName.php",true);
}
else if(col=="CC" || col=="MF" || col=="BP"){
xmlhttp.open("POST","./BrowsePage_GO.php",true);
}
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("pname="+name+"&col="+col);
}


function Query_PHP_Protein(uniprotID="",col=""){//AJAX. col means other column, like GO_ID
	//Prepare
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
	Query_PHP_Protein_write(uniprotID,xmlDoc,col); // Define In ProteinPage.js
  }
}
if(col=="PMID"){xmlhttp.open("POST","./Pubmed_Abstract.php",true);}
else{xmlhttp.open("POST","./ProteinPage.php",true);}

xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("uniprotID="+uniprotID+"&col="+col);

}



function Query_PHP_write(xmlDoc,DOM_node,col){
	var root_child = xmlDoc.getElementsByTagName("data")[0].childNodes;//data's child node
	var tmp_line_Count="Count:<br>";
	var tmp_line_Protein="<ul id='Protein_name_ul'>";
	//alert(root_child.length);
	//alert(root_child[2].nodeName);
	var tmp_protein_li_j=0;
	for(var i=0;i<root_child.length;i++){
		if(root_child[i].nodeName=="Count"){tmp_line_Count = tmp_line_Count + root_child[i].childNodes[0].nodeValue + "<br>";}
		else if(root_child[i].nodeName=="Protein_name"){tmp_line_Protein = tmp_line_Protein + "<li id='protein_li_"+tmp_protein_li_j+"' onclick='Query_PHP("+ '"protein_li_' +tmp_protein_li_j
			+ '"' + ',"'+col+ '"'
			+",1,\"" + escape(root_child[i].childNodes[0].nodeValue) + "\")'>" + root_child[i].childNodes[0].nodeValue + "</li>";tmp_protein_li_j++;}
	}
	tmp_line_Protein +="</ul>"
	document.getElementById(DOM_node).innerHTML=tmp_line_Protein;
	//document.getElementById("see_PHPoutput").innerHTML=tmp_line_Count + tmp_line_Protein;
}


function Query_PHP_child_write(xmlDoc,DOM_node){
	var root_child=xmlDoc.getElementsByTagName("data")[0].childNodes;//data's child node
	var tmp_line_Count="Count:<br>";
	var tmp_line_Protein="<ul onClick='event.cancelBubble = true;'>";
	//alert(root_child.length);
	//alert(root_child[2].nodeName);
	var tmp_protein_li_j=0;
	for(var i=0;i<root_child.length;i++){
		if(root_child[i].nodeName=="Count"){tmp_line_Count = tmp_line_Count + root_child[i].childNodes[0].nodeValue + "<br>";}
		//else if(root_child[i].nodeName=="Protein_name"){tmp_line_Protein = tmp_line_Protein + "<li  onClick='event.cancelBubble = true;'>" + root_child[i].childNodes[0].nodeValue + "</li>";tmp_protein_li_j++;}
		else if(root_child[i].nodeName=="Protein_name"){tmp_line_Protein = tmp_line_Protein + "<li  onClick='Show_ProteinPage(\"" + root_child[i].childNodes[0].nodeValue + "\");'>" + root_child[i].childNodes[0].nodeValue + "</li>";tmp_protein_li_j++;}
	}
	tmp_line_Protein +="</ul>"
	document.getElementById(DOM_node).innerHTML+=tmp_line_Protein;
	//document.getElementById("see_PHPoutput").innerHTML+=tmp_line_Count + tmp_line_Protein;
}
