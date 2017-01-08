//This JS file contain Home page of MechanosensorDB
function Show_HomePage(){
	var maincontent=document.getElementById("maincontent");
	maincontent.innerHTML="";//Delete all corrent DOM nodes
	maincontent.innerHTML="<p id='p1'>Although cells do not have the ability to see or hear, they do possess sensory structures that allow them to detect and measure various environmental stimuli. Cells are constantly exposed to physical forces, either from their environment or from neighboring cells. Mechanical signals are needed for vital biological functions, including cell migration, growth and differentiation." + "</p><p>" + "Mechanosensor is a protein which could sense the mechanical force and act accordingly. MechanosensorDB stores mechanosensor that mainly collected from UniprotDB.<p>";
}
