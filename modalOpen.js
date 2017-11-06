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