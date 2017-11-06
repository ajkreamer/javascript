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