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