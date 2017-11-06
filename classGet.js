//Function to return class names for use
function classGet(option) {
	//console.log("Calling class string...");
	
	switch (option) {
		case "nvEnrollBadgeEnabled": return("new badge clickable hoverable red darken-3 side-link waves-effect waves-light z-depth-2");
			break;
		case "nvEnrollBadgeDisabled": return("new badge grey lighten-1 grey-text");
			break;
	}
	
	//console.log("Class name successfully returned!");
}