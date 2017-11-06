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