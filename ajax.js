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