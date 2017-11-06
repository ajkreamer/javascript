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