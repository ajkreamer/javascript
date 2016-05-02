//CSGO Double bot by Dong

//To run this script:
//	Go to csgodouble.com
//	Log-in through Steam
//	Hit F12, a menu from the bottom should pop up
//	Click on the "console" tab on the top of the pop-up
//	Copy this script, paste it into the box, hit enter
//	Once everything loads, uncheck the box at the bottom so that bets are actually placed
//	Set the base value bet for betting
//	KEEP IN MIND, IT IS ENTIRELY DEPENDENT ON YOUR SETTINGS
//		If you display your bets in whole dollars, your bets will be in whole dollars
//		If you display your bets in coins, your bets will be in individual coins
//	Select the color scheme you'd like to bet on
//	Select the betting strategy you'd like to use to place bets
//	Click the green "Start" button and let it run

//Keep in mind this bet does not predict colors, nor will it get every color right every time
//This bot is designed to return a profit over time through various betting strategies
//For example, read up on the martingale betting strategy, the concept behind this bot is similar

//If you like my work, feel free to donate to me on CSGO Double, steamID id is 76561198098227534

var rollid = 0,
	roll = 0,
	rollOpt = 0,
	rounds = 0,
	roundsWon = 0,
	roundsLost = 0,
	coinsStart = 0,
	coinsWon = 0,
	coinsLost = 0,
	colorMode = 0,
	strat = 0,
	wager = [0, 0, 0],
	versionId = "1.1.1";

function themeSet(i) {
	var style;
	
	if (i == 0) var css = '#betOpts{width:120px}'
	if (i == 1) var css = 'body{background-color:#191919;color:#888}.navbar-default{background-color:#232323;border-color:#454545}#sidebar{background-color:#191919;border-color:#202020}.side-icon.active,.side-icon:hover{background-color:#202020}.side-icon .fa{color:#454545}.well{background:#232323;border-color:#323232;color:#888}#pullout{background-color:#191919;border-color:#323232}.form-control{background-color:#323232;border-color:#454545}.divchat{background-color:#323232;color:#999;border:none}.chat-link,.chat-link:hover,.chat-link:active{color:#bbb}.panel{background-color:#323232}.panel-default{border-color:#454545}.panel-default>.panel-heading{color:#888;background-color:#303030;border-color:#454545}.my-row{border-color:#454545}.list-group-item{border-color:#454545;background-color:#323232}.btn-default{border-color:#454545;background:#323232;text-shadow:none;color:#888;box-shadow:none}.btn-default:hover,.btn-default:active{background-color:#282828;color:#888;border-color:#454545}.btn-default[]{border-color:#454545;background-color:#353535}.input-group-addon{background-color:#424242;border-color:#454545;color:#888}.progress{color:#bbb;background-color:#323232}.navbar-default .navbar-nav>li>a:focus,.navbar-default .navbar-nav>li>a:hover{color:#999}.navbar-default .navbar-nav>.open>a,.navbar-default .navbar-nav>.open>a:focus,.navbar-default .navbar-nav>.open>a:hover{color:#888;background-color:#323232}.dropdown-menu{background-color:#252525}.dropdown-menu>li>a{color:#888}.dropdown-menu>li>a:focus,.dropdown-menu>li>a:hover{background-color:#323232;color:#999}.dropdown-menu .divider{background-color:#454545}.form-control[],.form-control[readonly],fieldset[] .form-control{background-color:#404040;opacity:.5}#betOpts{width:120px}';
	
	style = document.getElementById('automated-style');
	if (!style) {
		var head;
		head = document.getElementsByTagName('head')[0];
		style = document.createElement('style');
		style.type = 'text/css';
		style.id = 'automated-style';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	style.innerHTML = css;
}

function optionsAdd() {
	var opts = document.createElement('div');
    opts.innerHTML = '' +
        '<div class="row">' +
            '<div class="col-lg-3">' +
				'<ul class="list-group">' +
					'<li class="list-group-item"><span class="badge">v' + versionId + '</span>' +
						'<h4>DoubleDong<sup>&trade;</sup> Bot</h4><small>Automated bot for betting on csgodouble.com<br>Written by <a href="https://steamcommunity.com/profiles/76561198098227534/" target="_blank"><b>&#9733; Dong</b></a><br>Check <a href="https://github.com/ajkreamer/javascript/blob/master/bots/botDouble.js">GitHub</a> to make sure version ' + versionId + ' is the latest version of the DoubleDong bot</small>' +
					'</li>' +
				'</ul>' +
				'<h3>Bot controls:</h3>' +
				'<div class="form-group">' +
                    '<div class="btn-group">' +
                        '<button type="button" class="btn btn-success" id="modeStart" onclick=modeSet(2)>Start</button>' +
                        '<button type="button" class="btn btn-warning" id="modePause" onclick=modeSet(1)>Pause</button>' +
                        '<button type="button" class="btn btn-danger" id="modeStop" onclick=modeSet(0)>Stop</button>' +
					'</div>' +
					'<br><br>' +
					'<div>' +
						'<button type="button" class="btn btn-default" id="theme" onclick=themeSet(1)>Set theme to DongBot Dark</button>' +
                    '</div>' +
					'<div class="checkbox">' +
						'<label><input class="" id="simulate" type="checkbox" checked> Run as simulation? (No coins actually bet)</label>' +
					'</div>' +
                '</div>' +
			'</div>' +
			'<div class="col-lg-4">' +
				'<h3>Options</h3>' +
				'<div class="form-group">' +
					'<div class="input-group">' +
						'<div class="input-group-addon" id="betOpts">Minimum bet</div>' +
						'<input type="number" class="form-control" placeholder="Set base value" id="wagerBase">' +
					'</div>' +
				'</div>' +
				'<div class="form-group">' +
					'<div class="input-group">' +
						'<div class="input-group-addon" id="betOpts">Calculated bet</div>' +
						'<input type="number" class="form-control" placeholder="Calculated wager" id="wagerValue">' +
					'</div>' +
				'</div>' +
				'<div class="form-group">' +
					'<div class="input-group">' +
						'<div class="input-group-addon" id="betOpts"><input id="betGreen" type="checkbox"> &nbsp; Green bet</div>' +
						'<input type="number" class="form-control" placeholder="Coins to bet on green" id="wagerGreen">' +
					'</div>' +
				'</div>' +
				'<div class="form-group">' +
					'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Color bet <span class="caret"></span></button>' +
					'<ul class="dropdown-menu">' +
						'<li><a href="#">Red</a></li>' +
						'<li><a href="#">Black</a></li>' +
						'<li><a href="#">Rainbow</a></li>' +
						'<li><a href="#">Last Roll</a></li>' +
						'<li><a href="#">Random</a></li>' +
					'</ul>' +
					' &nbsp; ' +
					'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Strategy <span class="caret"></span></button>' +
					'<ul class="dropdown-menu">' +
						'<li><a href="#">Static</a></li>' +
						'<li><a href="#">Martingale</a></li>' +
						'<li class="disabled"><a href="#">Fibonacci</a></li>' +
						'<li class="disabled"><a href="#">D\'Alembert</a></li>' +
						'<li class="disabled"><a href="#">Oscar\'s Grind</a></li>' +
					'</ul>' +
				'</div>' +
            '</div>' +
            '<div class="col-lg-3">' +
                '<h3>Statistics</h3>' +
                '<p><b>Rounds:</b> <span id="botRounds">' + rounds + '</span></p>' +
                '<p><b>Wins:</b> <span id="botWins">' + roundsWon + '</span></p>' +
                '<p><b>Loses:</b> <span id="botLosses">' + roundsLost + '</span></p>' +
                '<p><b>W/L Ratio:</b> <span id="botRatio">0, 0.00 percent win rate</span></p>' +
                '<p><b>Coins Won:</b> <span id="coinWins">' + coinsWon + '</span></p>' +
                '<p><b>Coins Lost:</b> <span id="coinLosses">' + coinsLost + '</span></p>' +
                '<p><b>Profit Ratio:</b> <span id="coinTotal">0, 0.00 percent increase</span></p>' +
            '</div>' +
			'<div class="col-lg-2">' +
                '<h3>Status</h3>' +
                '<p><b>Status:</b> <span id="botStatus"></span></p>' +
                '<p><b>Strategy:</b> <span id="botStrat"></span></p>' +
                '<p><b>Color Mode:</b> <span id="botColor"></span></p>' +
            '</div>' +
        '</div>';
    document.getElementsByClassName('well')[1].appendChild(opts);
}

function modeSet(i) {
	switch (i) {
		case 0:	document.getElementById('botStatus').innerHTML = '<font color="#c9302c">Stopped</font>';
			console.log("Stopping bot...");
			console.log("");
			break;
		case 1:	document.getElementById('botStatus').innerHTML = '<font color="#ec971f">Paused</font>';
			console.log("Suspending bot...");
			console.log("");
			break;
		case 2: if (document.getElementById('botStatus').innerHTML == '<font color="#c9302c">Stopped</font>') statsReset();
			document.getElementById('botStatus').innerHTML = '<font color="#449d44">Running</font>';
			console.log("Restarting bot...");
			botRestart();
			break;
	}
	mode = i;
}

function stratSet(i) {
	if (i == 0) document.getElementById('botStrat').innerHTML = 'Static';
	if (i == 1) document.getElementById('botStrat').innerHTML = 'Martingale';
	if (i == 2) document.getElementById('botStrat').innerHTML = 'Oscar\'s Grind';
	if (i == 3) document.getElementById('botStrat').innerHTML = 'D\'Alembert';
	if (i == 4) document.getElementById('botStrat').innerHTML = 'Fibonacci';
	strat = i;
	betBase = document.getElementById("wagerBase").value;
	betBase = Number(betBase);
	wager[0] = betBase;
	wager[1] = betBase;
}

function betSet(i) {
	switch (i) {
		case 0: document.getElementById('botColor').innerHTML = '<font color="#c9302c">Red</font>';
			break;
		case 1: document.getElementById('botColor').innerHTML = '<font color="#c9302c">Black</font>';
			break;
		case 2: val = Math.floor((Math.random() * 2) + 1);
			if (val == 1) document.getElementById('botColor').innerHTML = '<font color="#c9302c">R</font>a<font color="#c9302c">i</font>n<font color="#c9302c">b</font>o<font color="#c9302c">w</font>';
			else document.getElementById('botColor').innerHTML = 'R<font color="#c9302c">a</font>i<font color="#c9302c">n</font>b<font color="#c9302c">o</font>w';
			break;
		case 3: document.getElementById('botColor').innerHTML = 'Last Roll';
			break;
		case 4: string = "";
			val = Math.floor((Math.random() * 2) + 1);
			if (val == 1) string = string + '<font color="#c9302c">R</font>';
			else string = string + 'R';
			val = Math.floor((Math.random() * 2) + 1);
			if (val == 1) string = string + '<font color="#c9302c">a</font>';
			else string = string + 'a';
			val = Math.floor((Math.random() * 2) + 1);
			if (val == 1) string = string + '<font color="#c9302c">n</font>';
			else string = string + 'n';
			val = Math.floor((Math.random() * 2) + 1);
			if (val == 1) string = string + '<font color="#c9302c">d</font>';
			else string = string + 'd';
			val = Math.floor((Math.random() * 2) + 1);
			if (val == 1) string = string + '<font color="#c9302c">o</font>';
			else string = string + 'o';
			val = Math.floor((Math.random() * 2) + 1);
			if (val == 1) string = string + '<font color="#c9302c">m</font>';
			else string = string + 'm';
			document.getElementById('botColor').innerHTML = string;	
			break;
	}
	colorMode = i;
}

function rollLast() {
	var last = document.getElementById('past').childNodes[9];
	return(last.innerHTML);
}

function rollLastId() {
	var last = document.getElementById('past').childNodes[9];
	return(last.getAttribute('data-rollid'));
}

function statsSet() {
	rounds = rounds + 1;
	document.getElementById("botRounds").innerHTML = rounds;
}

function statsReset() {
	console.log("Resetting bot statistics");
	rounds = 0,
	document.getElementById("botRounds").innerHTML = rounds;
	roundsWon = 0,
	document.getElementById("botWins").innerHTML = roundsWon;
	roundsLost = 0,
	document.getElementById("botLosses").innerHTML = roundsLost;
	document.getElementById("botRatio").innerHTML = "0, 0.00 percent win rate";
	coinsWon = 0,
	document.getElementById("coinWins").innerHTML = coinsWon;
	coinsLost = 0;
	document.getElementById("coinLosses").innerHTML = coinsLost;
	document.getElementById("coinTotal").innerHTML = "0, 0.00 percent increase";
}

function botStart() {
	console.log("DoubleDong bot version " + versionId + " starting up...");
	console.log("Bot starting...");
	console.log("Changing theme...");
	themeSet(0);
	console.log("Adding DoubleDong Bot buttons...");
	optionsAdd();
	console.log("Updating bot status...");
	modeSet(0);
	stratSet(0);
	betSet(0);
	console.log("Setting up global variables...");
	coinsStart = document.getElementById("balance").innerHTML;
	coinsStart = Number(coinsStart);
	roll = rollLast();
	rollid = rollLastId();
	console.log("Bot startup complete!");
	console.log("");
}

function botRestart() {
	console.log("Bot starting...");
	console.log("Resetting global variables...");
	roll = rollLast();
	rollid = rollLastId();
	coinsStart = document.getElementById("balance").innerHTML;
	coinsStart = Number(coinsStart);
	console.log("Bot restart complete!");
	console.log("");
}

function botProcess() {
	if (document.getElementById("botStatus").innerHTML == '<font color="#449d44">Running</font>') {
		rollidNew = rollLastId();
		if (rollidNew > rollid) {
			rollid = rollidNew;
			roll = rollLast();
			betBase = document.getElementById("wagerBase").value;
			betBase = Number(betBase);
			child = 9;
			last = document.getElementById('past').childNodes[child].innerHTML;
			while (last == "0") {
				child = child - 1;
				last = document.getElementById('past').childNodes[child].innerHTML;
			}
			last = Number(last);
			if ((last > 0) && (last < 8) && (rollOpt == "red")) result = 1;
			if ((last > 7) && (rollOpt == "black")) result = 1;
			if ((last > 0) && (last < 8) && (rollOpt == "black")) result = 2;
			if ((last > 7) && (rollOpt == "red")) result = 2;
			if ((last == 0) && (wager[2] == 0)) result = 2;
			if ((last == 0) && (wager[2] > 0)) result = 3;
			if (rollOpt == 0) result = 0;
			if (result == 1) {
				console.log("Victory!");
				roundsWon = roundsWon + 1;
				document.getElementById("botWins").innerHTML = '<font color="#449d44">' + roundsWon + '</font>';
				coinsWon = coinsWon + (wager[1] * 2);
				document.getElementById("coinWins").innerHTML = '<font color="#449d44">' + coinsWon + '</font>';
			}
			if (result == 2) {
				console.log("Defeat!");
				roundsLost = roundsLost + 1;
				document.getElementById("botLosses").innerHTML = '<font color="#c9302c">' + roundsLost + '</font>';
			}
			if (result == 3) {
				console.log("Victory!");
				roundsWon = roundsWon + 1;
				document.getElementById("botWins").innerHTML = '<font color="#449d44">' + roundsWon + '</font>';
				coinsWon = coinsWon + (wager[2] * 14);
				document.getElementById("coinWins").innerHTML = '<font color="#449d44">' + coinsWon + '</font>';
			}
			if (result == 0) {
				console.log("No previous bet!");
			}
			roundsOverall = roundsWon - roundsLost;
			roundsRate = roundsWon/(roundsWon + roundsLost);
			roundsRate = roundsRate * 100;
			roundsRate = (roundsRate).toFixed(2);
			if (roundsRate > 50) {
				roundsRate = '<font color="#449d44">' + roundsRate + '</font>';
				roundsOverall = '<font color="#449d44">+' + roundsOverall + '</font>';
			}
			if (roundsRate < 50) {
				roundsRate = '<font color="#c9302c">' + roundsRate + '</font>';
				roundsOverall = '<font color="#c9302c">' + roundsOverall + '</font>';
			}
			document.getElementById("botRatio").innerHTML = roundsOverall + ", " + roundsRate + " percent win rate (Updates after rolls)";
			coinsOverall = coinsWon - coinsLost;
			coinsRate = coinsOverall/coinsStart;
			coinsRate = coinsRate * 100;
			coinsRate = (coinsRate).toFixed(5);
			if (coinsRate > 0) {
				coinsRate = '<font color="#449d44">+' + coinsRate + '</font>';
				coinsOverall = '<font color="#449d44">+' + coinsOverall + '</font>';
			}
			if (coinsRate < 0) {
				coinsRate = '<font color="#c9302c">' + coinsRate + '</font>';
				coinsOverall = '<font color="#c9302c">' + coinsOverall + '</font>';
			}
			document.getElementById("coinTotal").innerHTML = coinsOverall + ", " + coinsRate + " percent increase (Updates after rolls)";
			betWager = 0;
			switch (strat) {
				case 0: betWager = betBase;
					break;
				case 1: if (rollOpt == 0) {
						betWager = betBase;
						wager[0] = betBase;
						wager[1] = betBase;
					}
					if ((last > 0) && (last < 8) && (rollOpt == "red")) betWager = betBase;
					if ((last > 7) && (rollOpt == "black")) betWager = betBase;
					if ((last > 0) && (last < 8) && (rollOpt == "black")) betWager = wager[1] * 2;
					if ((last > 7) && (rollOpt == "red")) betWager = wager[1] * 2;
					if (last == 0) betWager = wager[1] * 2;
					break;
			}
			document.getElementById("wagerValue").value = betWager;
			document.getElementById("betAmount").value = betWager;
			switch (colorMode) {
				case 0: $button = $("#panel1-7 .betButton");
					rollOpt = "red";
					break;
				case 1: $button = $("#panel8-14 .betButton");
					rollOpt = "black";
					break;
				case 2: child = 9;
					last = document.getElementById('past').childNodes[child].innerHTML;
					while (last == "0") {
						child = child - 1;
						last = document.getElementById('past').childNodes[child].innerHTML;
					}
					if (last < 8) {
						$button = $("#panel8-14 .betButton");
						rollOpt = "black";
					}
					else {
						$button = $("#panel1-7 .betButton");
						rollOpt = "red";
					}
					break;
				case 3: child = 9;
					last = document.getElementById('past').childNodes[child].innerHTML;
					while (last == "0") {
						child = child - 1;
						last = document.getElementById('past').childNodes[child].innerHTML;
					}
					if (last < 8) {
						$button = $("#panel1-7 .betButton");
						rollOpt = "red";
					}
					else {
						$button = $("#panel8-14 .betButton");
						rollOpt = "black";
					}
					break;
				case 4: val = Math.floor((Math.random() * 2) + 1);
					if (val == 1) {
						$button = $("#panel1-7 .betButton");
						rollOpt = "red";
					}
					else {
						$button = $("#panel8-14 .betButton");
						rollOpt = "black";
					}
					break;
				default: $button = $("#panel1-7 .betButton");
					rollOpt = "red";
					break;
			}
			if (document.getElementById("simulate").checked == false) {
				setTimeout(function() {
					console.log("Placing bet...");
					console.log("");
					$button.click();
					statsSet();
					wager[0] = wager[1];
					wager[1] = betWager;
					wager[2] = 0;
					betWagerGreen = 0;
					if (document.getElementById("betGreen").checked == true) {
						betWagerGreen = document.getElementById("wagerGreen").value;
						document.getElementById("betAmount").value = betWagerGreen;
						$button = $("#panel0-0 .betButton");
						$button.click();
						wager[2] = Number(betWagerGreen);
					}
					coinsLost = coinsLost + betWager + wager[2];
					document.getElementById("coinLosses").innerHTML = '<font color="#c9302c">' + coinsLost + '</font>';
				}, 5000);
			}
		}
	}
}

function botRun() {
	botStart();
	setInterval(botProcess, 1000);
}

botRun();