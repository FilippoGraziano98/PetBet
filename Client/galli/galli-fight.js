var ROUND_LEN = 5*1000; // in millisecs

function fight_start() {
	var timerToTheCenter = setInterval(galliToTheCenter, 1);	
	function galliToTheCenter() {
		if (Math.abs(GALLI_LIST.red.top - GALLI_LIST.yellow.top) < 5 &&
				Math.abs(GALLI_LIST.blue.top - GALLI_LIST.green.top) < 5
				) {
			for(var g in GALLI_LIST && g instanceof gallo){
				g.gallo_html.style.display = "none";
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
	document.getElementById("timer").innerHTML = "<p>"+msToTime(secs).substr(0,5)+"</p>";
	function galliFight() {
		if (secs == ROUND_LEN) {
			document.getElementById("timer").innerHTML = "<p>"+msToTime(secs).substr(0,5)+"</p>";
			fight_end();
			clearInterval(timerFight);
		} else {
			//decrease lifes
			secs+=10;
			document.getElementById("timer").innerHTML = "<p>"+msToTime(secs).substr(0,5)+"</p>";
		}
	}
}

function fight_end() {
	var timerToTheAngles = setInterval(galliToTheAngles, 1);	
	function galliToTheAngles() {
		document.getElementById("fight").style.content = "";
		for(var g in GALLI_LIST && g instanceof gallo){
			g.gallo_html.style.display = "block";
		}
		if (GALLI_LIST.red.top <= DIST_BORDER &&
				GALLI_LIST.blue.top <= DIST_BORDER &&
				GALLI_LIST.yellow.bottom <= DIST_BORDER &&
				GALLI_LIST.green.bottom <= DIST_BORDER
				) {
			clearInterval(timerToTheAngles);
		} else {
			GALLI_LIST.move_galli_to_the_angles();
		}
	}
}
