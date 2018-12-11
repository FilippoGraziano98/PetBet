var COLORS = ['red','blue','green', 'yellow','white'];
var START_LINE = 0;
var background_width = 1300;
var FINISH_LINE = background_width - 150;
var END_LANE = background_width - 100;

var delay_coefficient = 1;

//definito in setGame
var horses_database;			//JSON contenente la lista di tutti e 12 i cavalli
var horses_animated = [];	//lista dei 5 document.getElementById("animate_"+col);
var race_horses = [];			//lista di 5 oggetti horse (con tutte le info), che partecipano alla gara
var horses_velocity = [];
var horses_quotes = [];

function setGame() {
	document.getElementById("quota").innerHTML = "<p id='quota_int'>- - -</p>";
	document.getElementById("vincita_potenziale").innerHTML = "<p>- - -</p>";
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
		horses_velocity[i] = Math.random()*0.35+1.25-Math.floor((horses_animated[i].horse_id-1)/n_horses)*0.2-Math.abs((4-horses_animated[i].horse_age)/(n_horses/4))*0.1;		
		horses_quotes[i] = 5.8-horses_velocity[i]*3+Math.random()*1.5;
		document.getElementById(col+"button").innerHTML = String(horses_quotes[i]).substring(0,4);
		
		//personalizzo la tabella delle quote
		document.getElementById("quota_nome_"+col).innerHTML = horses_animated[i].horse_name
		
		document.getElementById(col+"button").disabled = false;
		document.getElementById("timerEndGame").innerHTML ="";
	}
}

function endGame() {
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
				"<p>Un'altra corsa sta per iniziare! </p>"+
				"<button class=menu onclick='setGame()'> VAI </button> <br><br>";
		}
		if (t > 0) {
			document.getElementById("timerEndGame").innerHTML = "<p>La prossima corsa sarà disponibile tra " + t + " ...</p>";
			t--;
		}
	}
}

function startGame_Timer(){
	if (document.getElementById("quota_int").innerHTML.includes("- - -")) {
		alert("Devi prima inserire una quota!");
		return false;
	}
	alert("SCOMMESSA REGISTRATA CON SUCCESSO");
	document.getElementById("bet").disabled = true;
	document.getElementById("scommetti").disabled = true;
	document.getElementById("classifica").innerHTML = "<p class=startTimer>3</p>";
	for(var i=0; i<5; i++){
		var col = COLORS[i];
		document.getElementById(col+"button").disabled = true;
	}
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

function update_quote(idbutton) {
	var i;
	var color = idbutton.substring(0,idbutton.length-6);
	for(var x=0; x<5; x++) {
		if (COLORS[x] == color) i = x;
	}
	var money = document.getElementById("bet").value;
	var chosen_quote = String(horses_quotes[i]).substring(0,4);
	quote_calculator(chosen_quote, money);
	for(var c=0; c<5; c++) {	
		document.getElementById(COLORS[c] + "button").setAttribute("class", "button");
	}
	document.getElementById(idbutton).setAttribute("class", "buttonselected");
	document.getElementById("scommetti").disabled = false;
	document.getElementById("bet").disabled = false;
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
