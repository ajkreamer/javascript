//Standard library of functions for reuse across applications
//REQUIRES JQUERY, LOADERS, MATERIALIZE

//Function to send and receive data via ajax
function ajax(option, targetFile, returnData, form, dataTarget) {
	//console.log("Beginning Ajax transmission...");
	
	//Define a variable to be returned by the function
	var returnedValue;
	
	if (option == "getContent") {
		//console.log("Getting content from file...");
	
		$.ajax({
			cache: false,
			success: function(data) {
				//console.log("Data collected, inserting to target element...");

				$("#" + dataTarget).html(data);
				
				//console.log("Data successfully inserted!");
			},
			type: "GET",
			url: targetFile
		});

		//console.log("Content successfully received!");
	}
	else if (option == "runFile") {
		//console.log("Running file...");
		
		$.ajax({
			cache: false,
			success: function(data) {
				//console.log(file + " has been successfully run!");
			},
			type: "POST",
			url: targetFile
		});
		
		//console.log("File successfully run!");
	}
	else if (option == "sendForm") {
		//console.log("Beginning form submission...");
		
		$.ajax({
			cache: false,
			contentType: false,
			data: form,
			enctype: "multipart/form-data",
			error: function() {
				toastShowMessage("error", "");
			},
			processData: false,
			success: function(data) {
				returnedValue = data;
				
				//console.log("Form successfully processed!");
			},
			type: "POST",
			url: targetFile
		});
		
		//console.log("Form submission successfully completed!");
	}
	
	setTimeout(function() {
		//If caller is requesting data to be returned, return the data outputted
		if (returnData) {
			//Set up checking loop
			var checkResultInterval = setInterval(function() {
				if (returnedValue != "") {
					//If result is populated, stop check interval
					clearInterval(checkResultInterval);

					//Create new hidden input element
					elementChange("add", "hidden", "returned-data");

					//Populate with data
					$("#returned-data").val(returnedValue);

					//Wait x seconds, delete element
					setTimeout(function() {
						elementChange("remove", "", "returned-data");
					}, getTimerValue("tempElement"));
				}
			}, getTimerValue("scriptCheck"));
		}
	}, getTimerValue("scriptCheckInitialDelay"));
	
	//console.log("Ajax transmission successfully completed!");
}

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

//Function to manipulate elements on a page
function elementChange(option, type, id) {
	//console.log("Manipulating page elements...");
	
	if (option == "add") {
		if (type == "hidden") $("body").append("<input type='hidden' id='" + id + "'>");
	}
	else if (option == "remove") $("#" + id).remove();
	
	//console.log("Element successfully manipulated!");
}

//Function to bind events to the left and right links on the dashboard
function eventsBind() {
	//console.log("Removing existing bindings...");
	
	//Define jQuery object being acted upon
	var event,
		object = $(".activator");
	
	//Remove existing bindings
	object.off();
	
	//console.log("Re-binding links...");
	
	//Define counter
	var i = 0;
	//Cycle through each link
	while (i < object.length) {
		if (
			(object,eq(i).attr("data-activates") != undefined)
			&& (object,eq(i).attr("data-activates") != "")
		) event = (object,eq(i).attr("data-activates");
		else event = "click";
		
		//Bind the button to the function described in the data-activates attribute
		object.eq(i).on(event, eval(object.eq(i).attr("data-activates")));
		
		i++;
	}
	
	//console.log("Link-binding function complete!");
}

//Function to return an array for use by loadFiles()
function filesGetNames(option) {
	//console.log("Calling array of filenames...");
	
	switch (option) {
		//Array used by 3dPrintLab
		case "3dPrintLab": return(["dashboard", "links", "projects", "session", "z"]);
			break;
		//Array used by New Visions Enrollment
		case "nvEnroll": return(["counselors", "dashboard", "developers", "index", "instructors", "library", "principals", "recommendation", "session", "settings", "students", "teachers", "z"]);
			break;
	}
	
	//console.log("File names successfully returned!");
}

//Function to pull in other .js files
function filesLoad(files) {
	//console.log("loadFiles function called, loading in library of .js files...");
	
	var iFile = 0;
	while (iFile < files.length) {
		//console.log("Pulling in _" + iFileName[iFile] + " file");

		$.getScript("js/_" + files[iFile] + ".js");
		
		//console.log("File _" + iFileName[iFile] + " successfully loaded!");
		
		iFile++;
	}
	
	//console.log("All files successfully loaded!");
}

//Function to assemble data into a form and return the form
function formCreate(fieldName, fieldValue) {
	//console.log("Assembling form data...");
	
	//Ensure each field name will have a value
	if (fieldName.length == fieldValue.length) {
		//Initialize the form data for use
		var newForm = new FormData(),
			strippedValue;
		
		//Counter for the loop
		var i = 0;
		while (i < fieldName.length) {
			//Define illegal characters
			var ii = 0,
				illegalChars = ["'", ","];
			
			//Loop through field to find illegal characters
			while (ii < illegalChars.length) {
				//Strip illegal characters
				if (String(fieldValue[i]).indexOf(illegalChars[ii]) >= 0) {
					console.log("Not today, hacker!");
					strippedValue = fieldValue[i].replace(illegalChars[ii], "");
				}
				else strippedValue = fieldValue[i];
				
				ii++;
			}
			
			//Everything is processed, add to form
			newForm.append(fieldName[i], strippedValue);
			
			i++; 
		}
		
		return(newForm);
	}
	else return(0);
	
	//console.log("Form successfully assembled!");
}

//Function to initialize other .js functions and libraries
function initialize(option) {
	//console.log("Running initialization...");
	
	switch (option) {
		case "maskedPhoneNumber": $('.masked-phone').mask("(999) 999-9999", {placeholder: " "});
			break;
		case "materializeCarousels": $('.carousel').carousel();
			break;
		case "materializeCarouselsFullWidth": $('.carousel.carousel-slider').carousel({fullWidth: true});
			break;
		case "materializeCollapsible": $('.collapsible').collapsible();
			break;
		case "materializeDatepicker": $('.datepicker').pickadate();
			break;
		case "materializeDatepicker3dPrintLab": $('.datepicker').pickadate({
				closeOnSelect: true,
				close: "Done",
				selectMonths: true
			});
			break;
		case "materializeDatepickerNvEnroll": $('.datepicker').pickadate({
				closeOnSelect: true,
				close: "Done",
				selectMonths: true,
				selectYears: 40
			});
			break;
		case "materializeDropdowns": $('.dropdown-button').dropdown();
			break;
		case "materializeMediaMaterialbox": $('.materialboxed').materialbox();
			break;
		case "materializeMediaSlider": $('.slider').slider();
			break;
		case "materializeModals": $('.modal').modal();
			break;
		case "materializeParallax": $('.parallax').parallax();
			break;
		case "materializePushpin": $('.pushpin').pushpin();
			break;
		case "materializeSelect": $('select').material_select();
			break;
		case "materializeScrollfire": Materialize.scrollFire();
			break;
		case "materializeScrollspy": $('.scrollspy').scrollSpy();
			break;
		case "materializeSidenav": $('.button-collapse').sideNav();
			break;
		case "materializeTextFields": Materialize.updateTextFields();
			break;
		case "materializeTimepicker": $('.timepicker').pickatime();
			break;
		case "materializeTimepicker3dPrintLab": $('.timepicker').pickatime({
			autoclose: true,
			default: "8:00AM",
			donetext: "Done"
		});
			break;
		case "materializeTabs": $('ul.tabs').tabs();
			break;
		case "materializeTooltips": $('.tooltipped').tooltip();
			break;
	}
	
	//console.log("Initialization successfully finished!");
}

//Function to check input fields for blankness
function inputCheckForBlanks() {
	//console.log("Beginning input field check sequence...");
	
	//Set variables
	var blanks = 0,
		fields = $("input"),
		i = 0;
	
	//Loop through input fields
	while (i < fields.length) {
		//If blank, increment blanks counter
		if (
			(fields.eq(i).val() == "")
			&& (!fields.eq(i).prop("disabled"))
		) blanks++;
		
		//Increment loop counter
		i++;
	}
	
	//Show error if any fields are blank
	if (blanks) toastShowMessage("error", "Fields cannot be blank");
	
	//Output the number of empty fields
	return(blanks);
	
	//console.log("Input field check complete!");
}

//Function to open a modal with content
function modalOpen(option, parameters) {
	//console.log("Populating and opening modal...");
	
	//Initialize modal
	initialize("materializeModals");
	
	//Populate the modal with data
	switch (option) {
		case "nvEnrollUploadTranscript": ajax("getContent", "getContentUpload.cfm?content=main&userid=" + 		parameters, false, "", "modal-content");
			ajax("getContent", "getContentUpload.cfm?content=footer&userid=" + parameters, false, "", "modal-footer");
			break;
	}
	
	//Open the modal
	$("#modal").modal("open");
	
	setTimeout(function() {
		//Bind any links
		bindLinks();
	}, getTimerValue("animationMaterialize"));
	
	//console.log("Modal sucessfully populated and opened!");
}

//Function to return a number used for timers
function timerGetValue(timerName) {
	//console.log("Fetching " + timerName + " timer value...");
	
	switch (timerName) {
		//Animate.css default animation timings
		case "animationAnimateCss": return(1000);
		//Animate.css 3dPrintLab animation timings
		case "animationAnimateCss3dPrintLab": return(1000);
		//Default time for Materialize animation timings
		case "animationMaterialize": return(1000);
		//Time to wait before doing something after getContent is called
		case "getContentDelay": return(250);
		//Time that a temporary element is to exist
		case "tempElement": return(5000);
		//Time for toasts to exist on-screen
		case "toast": return(2500);
		//Delay between checking if all scripts are loaded
		case "scriptCheck": return(25);
		//Initial index.cfm delay before script checking
		case "scriptCheckInitialDelay": return(250);
	}
	
	//console.log("Timer value successfully found!");
}

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

//Function to test certain functions
function test() {
	//Spit out message in console
	console.log("Testing");
	
	//Spit out materialize toast message
	toastShowMessage("none", "Testing");
}

//Function to generate a toast
function toastShowMessage(type, msg) {
	//console.log("Displaying toast...");
	
	//Initialize color and text variables for later user
	var color = "",
		text = "";
	
	//Set the color of the toast
	if (type == "error") color = "red";
	else if (type == "none") color = "grey darken-3";
	else if (type == "success") color = "light-green";
	
	//Process what the text of the toast should say if no text is given
	if ((msg == "") && (type == "error")) text = "An error occurred";
	else if ((msg == "") && (type == "none")) text = "Test";
	else if ((msg == "") && (type == "success")) text = "Success";
	else if (msg != "") text = msg;
	
	//Generate the toast using the local variables if the same toast doesn't exist
	if ($(".toast").length == 0) Materialize.toast(text + "!", getTimerValue("toast"), color);
	
	//console.log("Toast successfully displayed!");
}