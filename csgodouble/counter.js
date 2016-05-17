//This script displays the day's results when run

//To use it, go to the roll results page of any day
//Hit CTRL+Shift+J
//Paste this in the console box
//Hit enter

roll = [0];
rollTotal = 0;

function rollsGather() {
	iRow = 0;
	iCell = 2;
	running = true;
	begin = false;

	table = document.getElementsByTagName('tbody')[0];

	while (running) {
		row = table.getElementsByTagName('tr')[iRow];
		cell = row.getElementsByTagName('td')[iCell];
		
		if (cell.className == "") {
			if (begin) {
				begin = false;
				running = false;
				iCell--;
			}
			else {
				iCell++;
			}
		}
		else {
			begin = true;
			
			if (row.getElementsByTagName('td')[iCell].className == 'td-val ball-0') roll.push("green");
			if (row.getElementsByTagName('td')[iCell].className == 'td-val ball-1') roll.push("red");
			if (row.getElementsByTagName('td')[iCell].className == 'td-val ball-8') roll.push("black");
			
			rollTotal++;
			
			if (iCell >= 11) {
					iRow++;
					iCell = 2;
				}
			else {
				iCell++;
			}
		}
	}
	
	console.log("Data successfully collected");
}

function colorReport(color, limit) {
	i = 1;
	result = 0;
	success = 0;
	
	while (i <= rollTotal) {
		if (color == roll[i]) success++;
		else {
			if (success == limit) result++;
			success = 0;
		}
		i++;
	}
	
	return(result);
}

function rollsReport() {
	iCounter = 1;
	
	statsTotal = rollTotal + ' rolls total<br>';
	
	statsGreen = "";
	while (iCounter <= 5) {
		if (colorReport("green", iCounter) == 0) statsGreen = statsGreen + '<br>';
		else statsGreen = statsGreen + colorReport("green", iCounter) + ' ' + iCounter + 'x green<br>';
		iCounter++;
	}
	iCounter = 1;
	statsRed = "";
	while (iCounter <= 25) {
		if (colorReport("red", iCounter) == 0) statsRed = statsRed + '<br>';
		else statsRed = statsRed + colorReport("red", iCounter) + ' ' + iCounter + 'x red<br>';
		iCounter++;
	}
	iCounter = 1;
	statsBlack = "";
	while (iCounter <= 25) {
		if (colorReport("black", iCounter) == 0) statsBlack = statsBlack + '<br>';
		else statsBlack = statsBlack + colorReport("black", iCounter) + ' ' + iCounter + 'x black<br>';
		iCounter++;
	}
	
	var report = document.createElement('div');
	report.innerHTML = ''+
		'<div class="row">' +
			'<div class="col-lg-3">' +
				'<ul class="list-group">' +
					'<li class="list-group-item" id="rolls">' +
						'<h4>Totals:</h4>' +
						statsTotal +
					'</li>' +
				'</ul>' +
			'</div>' +
			'<div class="col-lg-3">' +
				'<ul class="list-group">' +
					'<li class="list-group-item" id="rollsGreen">' +
						'<h4>Green rolls:</h4>' +
						statsGreen +
					'</li>' +
				'</ul>' +
			'</div>' +
			'<div class="col-lg-3">' +
				'<ul class="list-group">' +
					'<li class="list-group-item" id="rollsRed">' +
						'<h4>Red rolls:</h4>' +
						statsRed +
					'</li>' +
				'</ul>' +
			'</div>' +
			'<div class="col-lg-3">' +
				'<ul class="list-group">' +
					'<li class="list-group-item" id="rollsBlack">' +
						'<h4>Black rolls:</h4>' +
						statsBlack +
					'</li>' +
				'</ul>' +
			'</div>' +
		'</div>';

	placement = document.getElementsByClassName('container')[1];
	placement.insertBefore(report, placement.firstChild);

	console.log("");
	console.log("Report successfully completed!");
}

//Collect data
rollsGather();

//Report the data
rollsReport();