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