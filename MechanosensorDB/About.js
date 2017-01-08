//About this website
function show_About(){
	var content="<h1>About MechanosensorDB</h1><div>";
	content +="<h2>The use</h2>";
	content +="<p>MechanosensorDB is willing to integrate all knowledge of mechanosensors, and hope to broaden your knowledge in mechanobiology.</p>";
	content +="<ul><li>" + "Browse all mechanosensor grouped by 'Protein name', 'GO cellular component', 'GO molecular function', 'GO biological pathway', and 'organism'.</li><li>" + "Search gene name, protein name, and functions through top right search bar.</li><li>" + "Protein information page contains not only functions, GO terms, etc., but also several selected articles which studies the mechanosensing aspect of the protein.</li></ul>"
	content +="<h2>The design</h2>";
	content +="<p>MechanosensorDB uses HTML, CSS, Javascript, Php, and mysql to support your research in mechanobiology.</p>";
	content +="<ul><li>The main page is 'index.html'.</li>"+"<li>All web page organization, event catch, sending and receiving data from server are done in Javascript.</li>"+"<li>Search mysql database use Php.</li><li>"+"With AJAX, MechanosensorDB can update a web page, call php in server, and so on without reloading the page.</li>" + "</ul>";
	//content +=;
	document.getElementById("maincontent").innerHTML=content;
}
