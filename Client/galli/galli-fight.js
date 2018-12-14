var ROUND_LEN = 5*1000; // in millisecs
var BREAK_LEN = 3; //in secs, time between two rounds
var ROUND_NUMBER = 0;

var MATCH_ACTIVE = false;

function start_round() {
	for(var g in GALLI_LIST){
		if(GALLI_LIST[g] instanceof gallo && GALLI_LIST[g].isDead ){//se un cavallo è morto blocco il match
			MATCH_ACTIVE = false;
			return;
		}
	}
	MATCH_ACTIVE = true;
	ROUND_NUMBER ++;
	document.getElementById("round_number").innerHTML = "ROUND " + ROUND_NUMBER;
	document.getElementById("timer").innerHTML = String(BREAK_LEN);
	var secs = BREAK_LEN-1;
	var countdown_round = setInterval(galliToTheCenter, 1000);
	
	function galliToTheCenter() {
		if (secs == 0) {
			clearInterval(countdown_round);
			document.getElementById("timer").innerHTML = "FIGHT!";
			fight_start();
		} else {
			document.getElementById("timer").innerHTML = String(secs);
			secs--;
		}
	}
}

function fight_start() {
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
			fight_loop();
		} else {
			GALLI_LIST.move_galli_to_the_center();
		}
	}
}

function fight_loop() {
	var timerFight = setInterval(galliFight, 10);
	var secs = 0;
	var end = false;//set to true if a gallo is dead
	document.getElementById("timer").innerHTML = String(msToTime(secs)).substr(0,5);
	function galliFight() {
		if (end || secs == ROUND_LEN) {
			document.getElementById("timer").innerHTML = String(msToTime(secs)).substr(0,5);
			fight_end();
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

function fight_end() {
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
				start_round();		
			}
		} else {
			GALLI_LIST.move_galli_to_the_angles();
		}
	}
}
