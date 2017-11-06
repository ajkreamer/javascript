//Function to manipulate elements on a page
function elementChange(option, type, id) {
	//console.log("Manipulating page elements...");
	
	if (option == "add") {
		if (type == "hidden") $("body").append("<input type='hidden' id='" + id + "'>");
	}
	else if (option == "remove") $("#" + id).remove();
	
	//console.log("Element successfully manipulated!");
}