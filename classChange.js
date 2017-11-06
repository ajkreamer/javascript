//Function to change an element's class
function classChange(option, elementType, elementName, string, replacer) {
	//console.log("Changing class of element " + element)
	
	//Determine selector
	var selector = "";
	if (elementType != "") {
		if (elementType == "class") selector = $("." + elementName);
		else if (elementType == "id") selector = $("#" + elementName);
	}
	
	//Process based on option
	if (option == "add") {
		if (selector.attr("class") == "") selector.attr("class", selector.attr("class") + replacer);
		else selector.attr("class", selector.attr("class") + " " + replacer);
	}
	else if (option == "remove") {
		selector.attr("class", selector.attr("class").replace(string, ""));
		selector.attr("class", selector.attr("class").replace(" " + string, ""));
		selector.attr("class", selector.attr("class").replace(string + " ", ""));
	}
	else if (option == "removeAll") selector.attr("class", "");
	else if (option == "replace") selector.attr("class", selector.attr("class").replace(string, replacer));
	else if (option == "replaceAll") selector.attr("class", replacer);
	
	//console.log("Class successfully changed!");
}