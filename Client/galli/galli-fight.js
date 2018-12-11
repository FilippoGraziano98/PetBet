var ROUND_LEN = 5*1000; // in millisecs

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
			document.getElementById("fight").style.content = "url(img/galli/fight_1_1.gif)";
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
	document.getElementById("timer").innerHTML = "<p>"+msToTime(secs).substr(0,5)+"</p>";
	function galliFight() {
		if (end || secs == ROUND_LEN) {
			document.getElementById("timer").innerHTML = "<p>"+msToTime(secs).substr(0,5)+"</p>";
			fight_end();
			clearInterval(timerFight);
		} else {
			for(var g in GALLI_LIST){
				if(GALLI_LIST[g] instanceof gallo){
					GALLI_LIST[g].fight_getDamage();
					if(GALLI_LIST[g].isDead){
						GALLI_LIST[g].dead();
						end=true;
					}
					document.getElementById(GALLI_LIST[g].gallo_html.id+"_HP_percentage").innerHTML = String(GALLI_LIST[g].health*100/GALLI_LIST[g].HEALTH_START).substr(0,5) + ' %';
					document.getElementById(GALLI_LIST[g].gallo_html.id+"_HP_value").style.width = Math.floor(GALLI_LIST[g].health*100/GALLI_LIST[g].HEALTH_START)+'px';
				}
			}
			secs+=10;
			document.getElementById("timer").innerHTML = "<p>"+msToTime(secs).substr(0,5)+"</p>";
		}
	}
}

function fight_end() {
	var timerToTheAngles = setInterval(galliToTheAngles, 1);	
	function galliToTheAngles() {
		document.getElementById("fight").style.content = "";
		for(var g in GALLI_LIST){
			if(GALLI_LIST[g] instanceof gallo){
				if(!GALLI_LIST[g].isDead){
					GALLI_LIST[g].gallo_html.style.display = "block";
				}
			}
		}
		if (GALLI_LIST.red.left <= DIST_BORDER &&
				GALLI_LIST.blue.right <= DIST_BORDER
				) {
			clearInterval(timerToTheAngles);
		} else {
			GALLI_LIST.move_galli_to_the_angles();
		}
	}
}
