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