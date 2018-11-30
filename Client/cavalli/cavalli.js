var COLORS = ['red','blue','green', 'yellow','white'];
var START_LINE = 0;
var FINISH_LINE = 720;

var HORSES = [];//definito in setGame
var horses_velocity = [];
var horses_quotes = [];

function setGame() {
	var horses_database = JSON.parse(localStorage.getItem("PetBet - Horses"));
	var n_horses = horses_database.length;
	
	var race_horses = [];
	var race_horses_idx = [];
	var idx;
	for(var i=0; i<5; i++){
		var col = COLORS[i];
		HORSES[i] = document.getElementById("animate_"+COLORS[i]);
		
		//scelgo random un cavallo
		do {
			idx = Math.floor(Math.random()*n_horses);
		} while( race_horses_idx.includes(idx) );
		race_horses_idx.push(idx);
		race_horses.push(horses_database[idx]);
		console.log(race_horses[i]);


		//setto info cavallo
		var horse = document.getElementById("animate_"+col);
		horse.horse_id = race_horses[i].id;
		horse.horse_name = race_horses[i].name;
		horse.horse_age = race_horses[i].age;
		horse.horse_wins = race_horses[i].wins;
		horse.horse_races = race_horses[i].races;

		//riporto il cavallo all'inizio della corsa
		HORSES[i].style.left = START_LINE+'px';

		//scelgo random la velocità del cavallo e setto la relativa quota
		//horses_velocity[i] = Math.random()*0.4+1.2;
		horses_velocity[i] = Math.random()*0.35+1.25-Math.floor((horse.horse_id-1)/n_horses)*0.2-Math.abs((4-horse.horse_age)/(n_horses/4))*0.1;		
		horses_quotes[i] = 5.8-horses_velocity[i]*3+Math.random()*1.5;
		document.getElementById(col+"button").innerHTML = String(horses_quotes[i]).substring(0,4);
		
		//personalizzo la tabella delle quote
		document.getElementById("quota_nome_"+col).innerHTML = horse.horse_name
		document.getElementById("quota_colore_"+col).innerHTML = "(colore: "+col+")";
		
		document.getElementById(col+"button").disabled = false;
		document.getElementById("timerEndGame").innerHTML ="";
	}
}

function endGame() {
	var time = setInterval(timer, 1000);
	var t = 5;
	function timer() {
		if (t == 0) {
			clearInterval(time);
			for(var i=0; i<5; i++){
				var col = COLORS[i];
			}
			document.getElementById("timerEndGame").innerHTML =
				"<p>Un'altra corsa sta per iniziare! </p><br>"+
				"<button class=button onclick='setGame()'> VAI </button> <br><br>";			
		}
		if (t > 0) {
			document.getElementById("timerEndGame").innerHTML = "<p>La prossima corsa sarà disponibile tra " + t + " ...</p>";
			t--;
		}
	}
}

function startGame() {
	var horses_position = [];
	for(var i=0; i<5; i++){
		var col = COLORS[i];
		document.getElementById("animate_"+col).style.content = "url(img/cavalli/cavallo-immagine-animata-0271.gif)";
		document.getElementById(col+"button").disabled = true;

		horses_position[i] = START_LINE;
	}
	
	prepareClassifica();
	
	function horseCuttingFinishLine(horse_colour) {
		addToClassifica(horse_colour);
	}

	var id = setInterval(race, 1);	
	function race() {
		if (horses_position[0] > FINISH_LINE &&
				horses_position[1] > FINISH_LINE &&
				horses_position[2] > FINISH_LINE &&
				horses_position[3] > FINISH_LINE &&
				horses_position[4] > FINISH_LINE) {
			clearInterval(id);
			endGame();
		
		} else {
			for(var i=0; i<5; i++){
				var col = COLORS[i];
				if(horses_position[i] < FINISH_LINE && horses_position[i] != FINISH_LINE-70) {
					horses_position[i] = horses_position[i] + Math.floor(Math.random()*(horses_velocity[i]+Math.random()*0.4));  
					HORSES[i].style.left = horses_position[i] + 'px'; 
				} else if (horses_position[i] == FINISH_LINE-70) { 
					horseCuttingFinishLine(col);
					horses_position[i]++;
				} else if (horses_position[i] == FINISH_LINE) {
					document.getElementById("animate_"+col).style.content = "url(img/cavalli/cavallo-fermo.png)";
					horses_position[i]++;
				}
			}		
		}
	}
}
