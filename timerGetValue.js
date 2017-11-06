//Function to return a number used for timers
function getTimerValue(timerName) {
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