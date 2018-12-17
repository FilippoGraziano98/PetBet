var ROUND_LEN = 5*1000; // in millisecs
var BREAK_LEN = 3; //in secs, time between two rounds
var ROUND_NUMBER = 0;

var BREAK_BEFORE_NEXT_FIGHT = 3;

var MATCH_ACTIVE = false;

function fight_prepare(){
	GALLI_LIST.populate_galli();

	//displaying list of fighting galli
	for(var g in GALLI_LIST){
		if(GALLI_LIST[g] instanceof gallo){
			document.getElementById(GALLI_LIST[g].gallo_html.id+"_HP_percentage").innerHTML = GALLI_LIST[g].health*100/GALLI_LIST[g].HEALTH_START + ' %';
			document.getElementById(GALLI_LIST[g].gallo_html.id+"_HP_value").style.width = Math.floor(GALLI_LIST[g].health*HP_BAR_WIDTH/GALLI_LIST[g].HEALTH_START)+'px';
			document.getElementById(GALLI_LIST[g].gallo_html.id+"_quota_button").innerHTML = String(GALLI_LIST[g].quota).substr(0,4);
		}
	}
	initialize_bet_area();
	reset_quote_buttons();
	document.getElementById("galli_timerEndGame").style.display = "none";
}

function round_startTimer() {
	for(var g in GALLI_LIST){
		if(GALLI_LIST[g] instanceof gallo && GALLI_LIST[g].isDead ){//se un gallo è morto blocco il match
			MATCH_ACTIVE = false;
			return;
		}
	}
	MATCH_ACTIVE = true;
	ROUND_NUMBER ++;
	document.getElementById("round_number").innerHTML = "ROUND " + ROUND_NUMBER;
	document.getElementById("timer").innerHTML = String(BREAK_LEN);
	var secs = BREAK_LEN-1;
	var countdown_round = setInterval(startTimer, 1000);
	
	function startTimer() {
		if (secs == 0) {
			clearInterval(countdown_round);
			document.getElementById("timer").innerHTML = "FIGHT!";
			round_start();
		} else {
			document.getElementById("timer").innerHTML = String(secs);
			secs--;
		}
	}
}

function round_start() {
	GALLI_LIST.rotate_galli();
	var timerToTheCenter = setInterval(galliToTheCenter, 1);	
	function galliToTheCenter() {
		if (Math.abs(GALLI_LIST.red.right - GALLI_LIST.blue.right) < 50) {
			GALLI_LIST.reset_rotation();
			for(var g in GALLI_LIST){
				if(GALLI_LIST[g] instanceof gallo){
					GALLI_LIST[g].gallo_html.style.display = "none";
				}
			}
			document.getElementById("fight").style.content = "url(img/galli/fight_round.gif)";
			clearInterval(timerToTheCenter);
			round_loop();
		} else {
			GALLI_LIST.move_galli_to_the_center();
		}
	}
}

function round_loop() {
	var timerFight = setInterval(galliFight, 10);
	var secs = 0;
	var end = false;//set to true if a gallo is dead
	document.getElementById("timer").innerHTML = String(msToTime(secs)).substr(0,5);
	function galliFight() {
		if (end || secs == ROUND_LEN) {
			document.getElementById("timer").innerHTML = String(msToTime(secs)).substr(0,5);
			round_end();
			clearInterval(timerFight);
		} else {
			for(var g in GALLI_LIST){
				if(GALLI_LIST[g] instanceof gallo){
					GALLI_LIST[g].fight_getDamage();
					if(GALLI_LIST[g].isDead){
						GALLI_LIST.dead();
						end=true;
					}
					document.getElementById(GALLI_LIST[g].gallo_html.id+"_HP_percentage").innerHTML = String(GALLI_LIST[g].health*100/GALLI_LIST[g].HEALTH_START).substr(0,5) + ' %';
					document.getElementById(GALLI_LIST[g].gallo_html.id+"_HP_value").style.width = Math.floor(GALLI_LIST[g].health*HP_BAR_WIDTH/GALLI_LIST[g].HEALTH_START)+'px';
				}
			}
			secs+=10;
			document.getElementById("timer").innerHTML = String(msToTime(secs)).substr(0,5);
		}
	}
}

function round_end() {
	document.getElementById("fight").style.content = "";
	for(var g in GALLI_LIST){
		if(GALLI_LIST[g] instanceof gallo & !GALLI_LIST[g].isDead){
			GALLI_LIST[g].gallo_html.style.display = "block";
		}
	}
	var timerToTheAngles = setInterval(galliToTheAngles, 1);	
	function galliToTheAngles() {
		if (GALLI_LIST.red.left <= DIST_BORDER &&
				GALLI_LIST.blue.right <= DIST_BORDER
				) {
			clearInterval(timerToTheAngles);
			var end_match = false;
			for(var g in GALLI_LIST){
				if(GALLI_LIST[g] instanceof gallo && GALLI_LIST[g].isDead){//se c'è un gallo ko
					GALLI_LIST.celebrate_winner();
					bet_get_reward();
					end_match = true;
				}
			}
			if( !end_match ) {
				round_startTimer();		
			} else {
				fight_end();
			}
		} else {
			GALLI_LIST.move_galli_to_the_angles();
		}
	}
}

function fight_end() {
	document.getElementById("galli_timerEndGame").style.display = "block";
	var time = setInterval(timerEndGame, 1000);
	var t = BREAK_BEFORE_NEXT_FIGHT;
	function timerEndGame() {
		if (t == 0) {
			clearInterval(time);
			document.getElementById("galli_timerEndGame").innerHTML =
				"<p class=report_font>Un'altra lotta sta per iniziare! </p>"+
				"<button class=small_button onclick='fight_prepare()'> VAI </button> <br><br>";
		}
		if (t > 0) {
			document.getElementById("galli_timerEndGame").innerHTML = "<p class=report_font>La prossima lotta sarà disponibile tra " + t + "<br><br></p>";
			t--;
		}
	}
}
