var COLORS = ['red','blue','green', 'yellow','white'];
var START_LINE = 0;
var background_width = 1300;
var FINISH_LINE = background_width - 190;
var END_LANE = background_width - 98;

var delay_coefficient = 1;

//definito in setGame
var horses_database;			//JSON contenente la lista di tutti e 12 i cavalli
var horses_animated = [];	//lista dei 5 document.getElementById("animate_"+col);
var race_horses = [];			//lista di 5 oggetti horse (con tutte le info), che partecipano alla gara
var horses_velocity = [];
var horses_quotes = [];

function setGame() {
	document.getElementById("timerEndGame").style.display = "none";
	document.getElementById("cavalli_simulaGame").style.display = "block";
	initialize_bet_area();
	for(var c=0; c<5; c++) {	
		document.getElementById(COLORS[c] + "button").setAttribute("class", "button");
	}
	horses_database = JSON.parse(localStorage.getItem("PetBet - Horses"));
	var n_horses = horses_database.length;
	
	var race_horses_idx = [];
	var idx;
	for(var i=0; i<5; i++){
		var col = COLORS[i];
		horses_animated[i] = document.getElementById("animate_"+col);
		//scelgo random un cavallo
		do {
			idx = Math.floor(Math.random()*n_horses);
		} while( race_horses_idx.includes(idx) );
		race_horses_idx[i]=idx;
		race_horses[i]=horses_database[idx];
		console.log(race_horses[i]);

		//setto info cavallo
		horses_animated[i].horse_id = race_horses[i].id;
		horses_animated[i].horse_name = race_horses[i].name;
		horses_animated[i].horse_razza = race_horses[i].razza;
		horses_animated[i].horse_age = race_horses[i].age;
		horses_animated[i].horse_wins = race_horses[i].wins;
		horses_animated[i].horse_races = race_horses[i].races;

		//riporto il cavallo all'inizio della corsa
		horses_animated[i].style.left = START_LINE+'px';

		//scelgo random la velocità del cavallo e setto la relativa quota
		//horses_velocity[i] = Math.random()*0.4+1.2;
		horses_velocity[i] = Math.random()*0.15+1.45-Math.floor((horses_animated[i].horse_id-1)/n_horses)*0.2-Math.abs((4-horses_animated[i].horse_age)/(n_horses/4))*0.1;		
		horses_quotes[i] = 6-horses_velocity[i]*3+Math.random()*1.5;
		document.getElementById(col+"button").innerHTML = String(horses_quotes[i]).substring(0,4);
		
		//personalizzo la tabella delle quote
		document.getElementById("quota_nome_"+col).innerHTML = horses_animated[i].horse_name
		
		document.getElementById(col+"button").disabled = false;
		document.getElementById("timerEndGame").innerHTML ="";
	}
}

function startGame_Timer(){
	document.getElementById("classifica").innerHTML = "<p class=startTimer>3</p>";
	var time = setInterval(timer, 1000);
	var t = 3;
	function timer() {
		switch (t) {
			case 3:
			case 2:
				document.getElementById("classifica").innerHTML = "<p class=startTimer>"+String(t-1)+"</p>";
				t--;
				break;
			case 1:
				document.getElementById("classifica").innerHTML = "<p class=startTimer>GO!</p>";
				startGame();
				t--;
				break;
			case 0:
				clearInterval(time);
				prepareClassifica();
		}
	}	
}


function startGame() {
	var horses_position = [];
	for(var i=0; i<5; i++){
		var col = COLORS[i];
		document.getElementById("animate_"+col).style.content = "url(img/cavalli/cavallo-immagine-animata-0271.gif)";

		horses_position[i] = START_LINE;
	}
	
	function horseCuttingFinishLine(horse_colour) {
		addToClassifica(horse_colour);
	}

	var id = setInterval(race, 1);	
	function race() {
		if (horses_position[0] > END_LANE &&
				horses_position[1] > END_LANE &&
				horses_position[2] > END_LANE &&
				horses_position[3] > END_LANE &&
				horses_position[4] > END_LANE) {
			clearInterval(id);
			endGame();
		
		} else {
			for(var i=0; i<5; i++){
				var col = COLORS[i];
				if(horses_position[i] < END_LANE && horses_position[i] != FINISH_LINE) {
					horses_position[i] = horses_position[i] + Math.floor((Math.random()*(horses_velocity[i]+Math.random()*0.4)*delay_coefficient));  
					horses_animated[i].style.left = horses_position[i] + 'px'; 
				} else if (horses_position[i] == FINISH_LINE) { 
					horseCuttingFinishLine(col);
					horses_position[i]++;
					horses_animated[i].style.left = horses_position[i] + 'px';
				} else if (horses_position[i] == END_LANE) {
					document.getElementById("animate_"+col).style.content = "url(img/cavalli/cavallo-fermo.png)";
					horses_position[i]++;
					horses_animated[i].style.left = horses_position[i] + 'px';
				}
			}		
		}
	}
}


function endGame() {
	unfreeze_menu();
	document.getElementById("cavalli_simulaGame").style.display = "none";
	document.getElementById("timerEndGame").style.display = "block";
	var time = setInterval(timer, 1000);
	var t = 3;
	function timer() {
		if (t == 0) {
			clearInterval(time);
			//salvo in memoria dati (wins & races) cavalli
			for(var i=0; i<5; i++){
				var idx = race_horses[i].id;
				//sfrutto il fatto che gli id sono crescenti da 1 in poi, e univoci in horses_database
				horses_database[idx-1].wins = horses_animated[i].horse_wins;
				horses_database[idx-1].races = horses_animated[i].horse_races;
				localStorage.setItem("PetBet - Horses", JSON.stringify(horses_database));
			}
			document.getElementById("timerEndGame").innerHTML =
				"<p class=report_font>Un'altra corsa sta per iniziare! </p>"+
				"<button class=small_button onclick='setGame()'><p>VAI</p></button> <br><br>";
		}
		if (t > 0) {
			document.getElementById("timerEndGame").innerHTML = "<p class=report_font>La prossima corsa sarà disponibile tra " + t + "</p>";
			t--;
		}
	}
}

function simulaCorsa(){
	freeze_bet_area(true);
	reset_cavalli_quote_buttons();
	freeze_cavalli_bet_buttons();
	freeze_simula_button();
	freeze_menu();
	writeAlert("Non è possibile scommettere in modalità Simulazione");
	sessionStorage.setItem("Cavallo-bet_on", "simulazione__no_bet");
	startGame_Timer();
}
