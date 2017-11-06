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