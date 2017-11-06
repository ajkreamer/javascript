//Function for getting a value from a dynamic url
function urlGetParameter(parameter) {
	//console.log("Searching Url for parameter...");
	
	//Get whole url and separate
	var url = window.location.search.substring(1),
		parameters = url.split("&");
	
	//Cycle through parameters found
	for (var i = 0; i < parameters.length; i++) {
		var parameterName = parameters[i].split("=");
		if (parameterName[0] == parameter) return parameterName[1];
	}
	
	//console.log("Parameter successfully found!");
}