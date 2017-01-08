//Protein Page
function Show_ProteinPage(uniprotID){
	//Clean the wrapper
	//alert(uniprotID);
	document.getElementById("left").style.display="none";//remove wrapper.left
	
	var maincontent=document.getElementById("maincontent");
	maincontent.style.width="80%";
	maincontent.innerHTML="";//Delete all corrent DOM nodes
	var tmp_content="<h1 id='h11'>" + uniprotID +"</h1>";
	
	tmp_content=tmp_content + "<div id='BasicInfo'></div>";
	//tmp_content=tmp_content + "<textarea id='see_PHPoutput'></textarea>";
	maincontent.innerHTML=tmp_content;
	//Get All information:
	Query_PHP_Protein(uniprotID);
	}

function Query_PHP_Protein_write(uniprotID,xmlDoc,col=""){//XML data
	var root_child=xmlDoc.getElementsByTagName("data")[0].childNodes;//data's child node
	
	for(var i=0;i<root_child.length;i++){
		//root_child[i].nodeName, root_child[i].childNodes[0].nodeValue
		if(col==""){
			//BasicInfo
			//alert(root_child[0].nodeName);
			tmp="";
			tmp+="<div id='" + root_child[i].nodeName + "' ><h2>" + root_child[i].nodeName.replace(/\_/g," ") +"</h2>";
			
			if(root_child[i].nodeName=="Uniprot_ID"){tmp+="<p><a href='http://www.uniprot.org/uniprot/" + root_child[i].childNodes[0].nodeValue + "' target='_blank'>" + root_child[i].childNodes[0].nodeValue + "</a></p>";}
			//https://www.ncbi.nlm.nih.gov/gene/5310
			else if(root_child[i].nodeName=="Gene_ID"){tmp+="<p><a href='https://www.ncbi.nlm.nih.gov/gene/" + root_child[i].childNodes[0].nodeValue.replace(";","") + "' target='_blank'>" + root_child[i].childNodes[0].nodeValue.replace(";","") + "</a>;</p>";}
			else if(root_child[i].nodeName=="PDB_ID"){
				var PDB_list=root_child[i].childNodes[0].nodeValue.split(";");
				//tmp+="<p>";
				for(var tmpi=0;tmpi<PDB_list.length;tmpi++){
					if(PDB_list[tmpi]!=0){tmp+="<a href='http://pdbj.org/mine/functional_details/" + PDB_list[tmpi] + "' target='_blank'>" + PDB_list[tmpi] + "</a>; ";}
				}
				tmp+="</p>";
			}
			else if(root_child[i].nodeName=="Protein_family_db"){
				var Pfam_db=root_child[i].childNodes[0].nodeValue.split("|");
				tmp+="<p>";
				var tmp_pfam_text="<div style='width: 20%;float:left;display:inline-block;text-align: right;padding-bottom: 0.3em;'>Pfam</div><div style='width: 70%;border-left-color: #9900FF; border-left-style:solid;float:left;display:inline-block;padding-bottom: 0.3em;'>";var tmp_inter_text="<div style='width: 20%;float:left;display:inline-block;text-align: right;padding-bottom: 0.3em;'>InterPro</div><div style='width: 70%;border-left-color: #9900FF; border-left-style:solid;float:left;display:inline-block;padding-bottom: 0.3em;'>";
				//http://www.ebi.ac.uk/interpro/entry/IPR001304
				for(var tmpi=0;tmpi<Pfam_db.length;tmpi++){
					//alert(Pfam_db[tmpi]);
					if(Pfam_db[tmpi]!=""){
						var tmp_pfam = Pfam_db[tmpi].split(":");
						var tmp_id = tmp_pfam[1].split(";");
						if(tmp_pfam[0]=="Pfam"){for(tmpj=0;tmpj<tmp_id.length;tmpj++){
							if(tmp_id[tmpj]!=""){tmp_pfam_text+="<a href='http://pfam.xfam.org/family/" + tmp_id[tmpj] + "' target='_blank'>" + tmp_id[tmpj] + "</a>; ";}
							}}
						else if(tmp_pfam[0]=="InterPro"){for(tmpj=0;tmpj<tmp_id.length;tmpj++){
							if(tmp_id[tmpj]!=""){tmp_inter_text+="<a href='http://www.ebi.ac.uk/interpro/entry/" + tmp_id[tmpj] + "' target='_blank'>" + tmp_id[tmpj] + "</a>; ";}
								}}
					}

					}
				tmp=tmp+tmp_pfam_text+"</div><br>"+tmp_inter_text+"</div><br>";
				tmp+="</p>";
				}
			/*
			else if(root_child[i].nodeName=="Organism_specific_db"){
				//CTD: http://ctdbase.org/detail.go?type=gene&db=GENE&acc=
				//RGD: http://rgd.mcw.edu/rgdweb/report/gene/main.html?id=
				
				}*/
			else{tmp_node = root_child[i].childNodes[0].nodeValue.replace(/;/g,"; "); tmp+="<p>" + tmp_node.replace(/\|/g,"<br>") + "</p>";}
			tmp+="</div>";
			document.getElementById('BasicInfo').innerHTML+=tmp;
			
		}
		else if(col=="GO_ID"){
			//Add more info, the <GO></GO> level
			var line="";
			//line+="<div id='GO_name_" + i + "'>";
			var go_name="";
			for(var j=0;j<root_child[i].childNodes.length;j++){
				tmp="";
				if(root_child[i].childNodes[j].nodeName=="GO_name"){
					go_name="<div><div style='width: 20%;float:left;display:inline-block;text-align: right;padding-bottom: 0.3em;'>" + root_child[i].childNodes[j].nodeName +"</div>";
					go_name+="<div style='width: 70%;border-left-color: #9900FF; border-left-style:solid;float:left;display:inline-block;padding-bottom: 0.3em;'><button name='click_here' onclick=\"GO_name_show('GO_name_" + i + "')\">" + root_child[i].childNodes[j].childNodes[0].nodeValue + "</button></div>";
					go_name+="</div>"
					}
				else{
					
					tmp+="<div name='hiddable' style='display:none'><div style='width: 20%;float:left;display:inline-block;text-align: right;padding-bottom: 0.3em;'>" + root_child[i].childNodes[j].nodeName +"</div>";
					tmp+="<div style='width: 70%;border-left-color: #9900FF; border-left-style:solid;float:left;display:inline-block;padding-bottom: 0.3em;'>" + root_child[i].childNodes[j].childNodes[0].nodeValue + "</div>";
					tmp+="</div>";
					}
				
				line+=tmp;
			}
			line+="</div>";
			document.getElementById('GO_ID').innerHTML=document.getElementById('GO_ID').innerHTML +"<div id='GO_name_" + i + "'>"+ go_name + line;
		}
		else if(col=="PMID"){
		//This is used for show the important PMID
			//alert(root_child);
			//alert(root_child.length);
			//alert(xmlDoc.getElementsByTagName("data")[0].innerHTML);
			var tmp_PMID=xmlDoc.getElementsByTagName("data")[0].innerHTML.split(",");
			Add_Pubmed(tmp_PMID);
		}
		//GO
		
	}
	if(col==""){
		//Add GO name
		Query_PHP_Protein(uniprotID,"GO_ID");
	}
	else if(col=="GO_ID"){
		Sort_GO();
		
		var many_ID=document.getElementById('Pubmed_ID').childNodes[1].innerHTML;
		if(many_ID!=""){Query_PHP_Protein(many_ID,"PMID");}//modify lay out, and add pubmed abstract
		
		//The following call function to sort all div
		Sort_ALL();
	}
}

function GO_name_show(id){
//alert(id);
var tmp_root=document.getElementById(id);
var tmp_childs=tmp_root.childNodes;
//var tmp_ele=document.getElementsByName('hiddable');
//alert(tmp_childs.length);
//alert(tmp_childs[0].getAttribute('name'));
for(var tmpi=0;tmpi<tmp_childs.length;tmpi++){
	if(tmp_childs[tmpi].getAttribute('name')=='hiddable'){
		//alert(tmp_childs[tmpi].getAttribute('name'));
		//alert(tmp_childs[tmpi].style.display);
		if(tmp_childs[tmpi].style.display=='none'){
			tmp_childs[tmpi].style.display='block';
			}
		else{
			tmp_childs[tmpi].style.display='none';
			}
	}

	}
}

function Sort_GO(){
	var tmp_root=document.getElementById('GO_ID');
	var tmp_childs=tmp_root.childNodes;
	var divCC=document.createElement("div");var th1=document.createElement("h3");th1.innerHTML="cellular_component";divCC.appendChild(th1);
	var divMF=document.createElement("div");var th2=document.createElement("h3");th2.innerHTML="molecular_function";divMF.appendChild(th2);
	var divBP=document.createElement("div");var th3=document.createElement("h3");th3.innerHTML="biological_process";divBP.appendChild(th3);
	//alert(tmp_childs[0].childNodes[0].childNodes.length);
	
	for(var i=2;i<tmp_childs.length;i++){
		//alert(tmp_childs[i].childNodes[3]);
		if(tmp_childs[i].childNodes[3].innerHTML.indexOf("cellular_component")>0){
			divCC.appendChild(tmp_childs[i]);
			}
		else if(tmp_childs[i].childNodes[3].innerHTML.indexOf("biological_process")>0){divBP.appendChild(tmp_childs[i]);}
		else if(tmp_childs[i].childNodes[3].innerHTML.indexOf("molecular_function")>0){divMF.appendChild(tmp_childs[i]);}
	}
	tmp_root.innerHTML="<h2>GO ID</h2>";
	tmp_root.appendChild(divMF);tmp_root.appendChild(divCC);tmp_root.appendChild(divBP);
}

function Add_Link(){
	var link_dict={
			'Uniprot_ID':'',
			'Gene_ID':'',
			'PDB_ID':'',
			'Pfam':'',
			'InterPro':'',
			'ArachnoServer':'',
			'CGD':'',
			'CTD':'http://ctdbase.org/detail.go?type=gene&db=GENE&acc=',
			'ConoServer':'',
			'EchoBASE':'',
			'EcoGene':'',
			'EuPathDB':'',
			'FlyBase':'',
			'GeneCards':'',
			'GeneReviews':'',
			'H-InvDB':'',
			'HGNC':'',
			'HPA':'',
			'LegioList':'',
			'Leproma':'',
			'MGI':'',
			'MIM':'',
			'MaizeGDB':'',
			'MalaCards':'',
			'Orphanet':'',
			'PharmGKB':'',
			'PomBase':'',
			'PseudoCAP':'',
			'RGD':'http://rgd.mcw.edu/rgdweb/report/gene/main.html?id=',
			'SGD':'',
			'TAIR':'',
			'TubercuList':'',
			'WormBase':'',
			'Xenbase':'',
			'ZFIN':'',
			'dictyBase':'',
			'euHCVdb':'',
			'neXtProt':'',
			'BioCyc':'',
			'Reactome':'',
			'KEGG':'',
			'Pubmed_ID_abstract':'https://www.ncbi.nlm.nih.gov/pubmed/10854095?report=xml&format=text',//Attention
			'Pubmed_ID':'https://www.ncbi.nlm.nih.gov/pubmed/',
		}
	}

function Add_Pubmed(PMID){
	document.getElementById('Pubmed_ID').innerHTML="<h2>Pubmed ID</h2>";
	var divAbstract=document.createElement("div");var th1=document.createElement("h3");th1.innerHTML="Important Articles";divAbstract.appendChild(th1);
	//alert(PMID);
	//alert(PMID.length);
	var divImportantID=document.createElement("div");
	for(var i=0;i<PMID.length;i++){
		if(PMID[i]!=""){//https://www.ncbi.nlm.nih.gov/pubmed/10021334?report=xml&format=text
			divImportantID.innerHTML=divImportantID.innerHTML + "<a href='https://www.ncbi.nlm.nih.gov/pubmed/" +PMID[i] + "' target='_blank'>" + PMID[i] + "</a><br>";
		}
	}
	divAbstract.appendChild(divImportantID);
	document.getElementById('Pubmed_ID').appendChild(divAbstract);
}

function Sort_ALL(){
	//Need to do.
}
