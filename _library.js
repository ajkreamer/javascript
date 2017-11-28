//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//  NOTES FOR NEXT VERSION:                                                         //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////

//Standard library of functions for reuse across applications
//REQUIRES JQUERY, MATERIALIZE, MASKED INPUT

//Function to send and receive data via ajax
//$.fn.ajax = function(options) {
function ajax(action, data, target, functions) {
	//console.log("Beginning Ajax transmission...");
	
	//Define variables
	var method;
	function onError(runFunction) {
		//Define what to do on ajax page failure
		if (
			(runFunction == undefined)
			|| (runFunction == "")
		) toastShowMessage("error", "");
		else runFunction;
	}
	function onSuccess(runFunction) {
		//Define what to do on ajax page success
		if (
			(runFunction == undefined)
			|| (runFunction == "")
		) toastShowMessage("success", "");
		else runFunction;
	}
	
	//Define the transmission method
	if (action == "getContent") method = "GET";
	else method = "POST";
	
	//The data variable passed in is now the target for pasting the retrieved HTML
	if (action == "getContent") {
		//console.log("Getting external content...");
		
		$.ajax({
			cache: false,
			error: onError(functions[1]),
			success: function(newData) {
				//console.log("Data collected, inserting to target element...");
				
				//Insert returned data to the target
				data.html(newData);
				
				//Fire success function
				onSuccess(functions[0]);
				
				//console.log("Data successfully inserted!");
			},
			type: method,
			url: target
		});
		
		//console.log("Content successfully returned!");
	}
	else if (settings.action == "runFile") {
		//console.log("Running file...");
		
		$.ajax({
			cache: false,
			error: onError(functions[1]),
			success: function(data) {
				//console.log(file + " has been successfully run!");
				
				//Fire success function
				onSuccess(functions[0]);
			},
			type: method,
			url: target
		});
		
		//console.log("File successfully run!");
	}
	else if (settings.action == "sendForm") {
		//console.log("Beginning form submission...");
		
		$.ajax({
			cache: false,
			contentType: false,
			data: form,
			enctype: "multipart/form-data",
			error: onError(functions[1]),
			processData: false,
			success: function(newData) {
				//console.log("Form successfully processed!");
				
				//Fire success function
				onSuccess(functions[0]);
			},
			type: method,
			url: target
		});
		
		//console.log("Form submission successfully completed!");
	}
	//console.log("Ajax transmission successfully completed!");
}

//Function to return various types of data
function dataGet(type, option) {
	//console.log("Fetching data...");
	
	//Replace formCreate
	if (type == "array") {
		switch (option) {
			//Array used by 3dPrintLab
			case "fileNames3dPrintLab": return(["dashboard", "links", "projects", "session", "z"]);
			//Array used by New Visions Enrollment
			case "fileNamesNvEnroll": return(["counselors", "dashboard", "developers", "index", "instructors", "library", "principals", "recommendation", "session", "settings", "students", "teachers", "z"]);
			//Array of illegal characters for sanitation
			case "illegalChars": return(["'", ","]);
			//Array of illegal words for sanitation
			case "illegalWords": return([]);
		}
	}
	else if (type == "form") {
		//console.log("Assembling form data...");
		
		if (option.length == 2) {
			var fieldName = option[0],
				fieldValue = option[1];

			//Ensure each field name will have a value
			if (fieldName.length == fieldValue.length) {
				//Initialize the form data for use
				var illegalChars = dataGet("array", "illegalChars"),
					newForm = new FormData(),
					strippedValue;

				//Counter for the loop
				for (var i = 0; i < fieldName.length; i++) {
					//Loop through field to find illegal characters
					for (var ii = 0; ii < illegalChars.length; ii++) {
						//Strip illegal characters
						if (String(fieldValue[i]).indexOf(illegalChars[ii]) >= 0) {
							console.log("Not today, hacker!");
							strippedValue = fieldValue[i].replace(illegalChars[ii], "");
						}
						else strippedValue = fieldValue[i];
					}

					//Everything is processed, add to form
					newForm.append(fieldName[i], strippedValue);
				}
				
				//console.log("Form successfully assembled!");
				
				return(newForm);
			}
			//else toastGenerate("error", "Invalid form data");
			else console.log("Invalid form data");
		}
		//else toastGenerate("error", "Invalid form data");
		else console.log("Invalid form data");
	}
	else if (type == "inputBlanks") {
		//console.log("Beginning input field check sequence...");

		//Set variables
		var blanks = 0;

		//Loop through input fields
		for (var i = 0; i < option.length; i++) {
			//If blank, increment blanks counter
			if (
				(option.eq(i).val() == "")
				&& (!option.eq(i).prop("disabled"))
			) blanks++;
		}

		//Show error if any fields are blank
		if (blanks) toastGenerate("error", "Fields cannot be blank");

		//Output the number of empty fields
		return(blanks);

		//console.log("Input field check complete!");
	}
	else if (type == "int") {
		switch (option) {
			//Animate.css default animation timings
			case "timerAnimationAnimateCss": return(1000);
			//Animate.css 3dPrintLab animation timings
			case "timerAnimationAnimateCss3dPrintLab": return(1000);
			//Default time for Materialize animation timings
			case "timerAnimationMaterialize": return(1000);
			//Time to wait before doing something after getContent is called
			case "timerGetContentDelay": return(250);
			//Time that a temporary element is to exist
			case "timerTempElement": return(5000);
			//Time for toasts to exist on-screen
			case "timerToast": return(2500);
			//Delay between checking if all scripts are loaded
			case "timerScriptCheck": return(25);
			//Initial index.cfm delay before script checking
			case "timerScriptCheckInitialDelay": return(250);
		}
	}
	else if (type == "string") {
		switch (option) {
			//Disabled badge for New Visions Application
			case "classNvEnrollBadgeDisabled": return("new badge grey lighten-1 grey-text");
			//Enabled badge for New Visions Application
			case "classNvEnrollBadgeEnabled": return("activator new badge clickable hoverable red darken-3 waves-effect waves-light z-depth-2");
			case "classToastDefault": return("grey darken-3");
			case "classToastError": return("red");
			case "classToastSuccess": return("light-green");
		}
	}
	else if (type == "urlParameter") {
		//console.log("Searching Url for parameter...");

		//Get whole url and separate into chunks, using & as the delimiter
		var url = window.location.search.substring(1),
			parameters = url.split("&");

		//Cycle through parameters found, separating each one with = as the delimiter
		for (var i = 0; i < parameters.length; i++) {
			var parameterName = parameters[i].split("=");
			if (parameterName[0] == option) return parameterName[1];
		}

		//console.log("Parameter successfully found!");
	}
	
	//console.log("Data successfully returned!");
}

//Function to bind events to the left and right links on the dashboard
function eventsBind() {
	//console.log("Beginning event bindings...");
	
	//Define jQuery object being acted upon
	var event,
		object = $(".activator");
	
	//console.log("Removing existing links...");
	
	//Remove existing bindings
	object.off();
	
	//console.log("Re-binding links...");
	
	for (var i = 0; i < object.length; i++) {
		if (
			(object.eq(i).attr("data-activation") != undefined)
			&& (object.eq(i).attr("data-activation") != "")
		) event = object.eq(i).attr("data-activation");
		else event = "click";
		
		//Bind the button to the function described in the data-activates attribute
		object.eq(i).on(event, eval(object.eq(i).attr("data-activates")));
	}
	
	//console.log("Link-binding function complete!");
}

//Function to pull in other .js files
function filesLoad(files) {
	//console.log("loadFiles function called, loading in library of .js files...");
	
	for (var i = 0; i < files.length; i++) $.getScript("js/_" + files[iFile] + ".js");
	
	//console.log("All files successfully loaded!");
}

//Function to initialize other .js functions and libraries
function initialize() {
	//console.log("Running initialization...");
	
	//Initialize phone number mask
	if ($('.mask-phone').length) $('.mask-phone').mask("(999) 999-9999", {placeholder: " "});
	//Initialize Materialize collapsible
	if ($('.collapsible').length) $('.collapsible').collapsible();
	//Initialize Materialize datepicker
	if ($('.datepicker').length) $('.datepicker').pickadate();
	//Initialize Materialize dropdowns
	if ($('.dropdown').length) $('.dropdown').dropdown();
	//Initialize Materialize modals
	if ($('.modal').length) $('.modal').modal();
	//Initialize Materialize select
	if ($('select').length) $('select').material_select();
	//Initialize Materialize navbar tabs
	if ($('ul.nav-bar.tabs').length) $('ul.nav-bar.tabs').tabs();
	//Initialize Materialize sidenav
	if ($('.nav-side').length) $('.nav-side').sideNav();
	//Initialize Materialize text fields
	if ($('input').length) Materialize.updateTextFields();
	//Initialize Materialize timepicker
	if ($('.timepicker').length) $('.timepicker').pickatime();
	//Initialize Materialize tooltips
	if ($('.tooltip').length) $('.tooltipped').tooltip();
	
	//console.log("Initialization successfully finished!");
}

//Function to test certain functions
function test() {
	//Spit out message in console
	console.log("Testing");
	
	//Spit out materialize toast message
	toastGenerate("", "");
}

//Function to generate a toast
function toastGenerate(type, msg) {
	//console.log("Beginning toast processing...");
	
	//If another toast doesn't already exist
	if ($(".toast").length == 0) {
		//Initialize color and text variables for later use
		var color,
			text;

		//Set the color of the toast based on the type of toast
		if (type == "error") color = dataGet("string", "classToastError");
		else if (type == "success") color = dataGet("string", "classToastSuccess");
		else color = dataGet("string", "classToastDefault");

		//Process what the text of the toast should say if no text is given
		if ((msg == "") && (type == "error")) text = "Error";
		else if ((msg == "") && (type == "none")) text = "Test";
		else if ((msg == "") && (type == "success")) text = "Success";
		else if (msg != "") text = msg;

		//Generate the toast using the local variables if a toast doesn't exist
		 Materialize.toast(text + "!", dataGet("int", "timerToast"), color);
		
		//console.log("Toast successfully generated!");
	}
	else {
		//console.log("Another toast already exists!");
	}
	
	//console.log("Toast successfully processed!");
}