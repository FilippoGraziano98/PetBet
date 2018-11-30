var COLORS = ['red','blue','green', 'yellow','white'];
var START_LINE = 0;
var FINISH_LINE = 720;

var horses_velocity = [];
var horses_quotes = [];

function setGame() {
	var horses = JSON.parse(localStorage.getItem("PetBet - Horses"));
	var n_horses = horses.length;
	
	var race_horses = [];
	var race_horses_idx = [];
	var idx;
	for(var i=0; i<5; i++){
		var col = COLORS[i];
		
		//scelgo random un cavallo
		do {
			idx = Math.floor(Math.random()*n_horses);
		} while( race_horses_idx.includes(idx) );
		race_horses_idx.push(idx);
		race_horses.push(horses[idx]);
		console.log(race_horses[i]);


		//setto info cavallo
		document.getElementById("animate_"+col).horse_id = race_horses[i].id;
		document.getElementById("animate_"+col).horse_name = race_horses[i].name;
		document.getElementById("animate_"+col).horse_age = race_horses[i].age;
		document.getElementById("animate_"+col).horse_wins = race_horses[i].wins;
		document.getElementById("animate_"+col).horse_races = race_horses[i].races;

		//scelgo random la velocità del cavallo e setto la relativa quota
		//var vel1 = Math.random()*0.35+1.25-Math.floor((horse_id-1)/(3*4))*0.2-Math.abs((4-eta)/3)*0.1;		
		horses_velocity[i] = Math.random()*0.4+1.2;
		horses_quotes[i] = 5.8-horses_velocity[i]*3+Math.random()*1.5;
		document.getElementById(col+"button").innerHTML = String(horses_quotes[i]).substring(0,4);
	}
}

function endGame() {
	var time = setInterval(timer, 1000);
	var t = 5;
	var old_html = document.getElementById("classifica").innerHTML;
	function timer() {
		if (t == 0) {
			clearInterval(time);
			for(var i=0; i<5; i++){
				var col = COLORS[i];
				document.getElementById("animate_"+col).addEventListener("mouseenter", showInfoHorse, false);
				document.getElementById("animate_"+col).addEventListener("mouseout", hideInfoHorse, false);
				sessionStorage.removeItem("PetBet - Velocita "+i);
			}
			document.getElementById("classifica").innerHTML =
				old_html +
				"<p>Un'altra corsa sta per iniziare! </p> <br> <button class=button onclick='loadCavalli()'> VAI </button> <br><br>";			
		}
		if (t > 0) {
			document.getElementById("classifica").innerHTML = old_html +"<p>La prossima corsa sarà disponibile tra " + t + " ...</p>";
			t--;
		}
	}
}

function startGame() {
	for(var i=0; i<5; i++){
		var col = COLORS[i];
		document.getElementById("style_horse_"+col).innerHTML = '#animate_'+col+' {content: url(img/cavalli/cavallo-immagine-animata-0271.gif)}';
		document.getElementById("animate_"+col).removeEventListener("mouseenter", showInfoHorse, false);
		document.getElementById("animate_"+col).removeEventListener("mouseout", hideInfoHorse, false);
		document.getElementById(col+"button").disabled = true;
	}
	
	var horses = [];
	for (var i=0; i<5; i++){
		horses[i] = document.getElementById("animate_"+COLORS[i]);
	}
	
	var horses_position = [];
	for (var i=0; i<5; i++){
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
				if(horses_position[i] < FINISH_LINE && horses_position[i] != FINISH_LINE-70) {
					horses_position[i] = horses_position[i] + Math.floor(Math.random()*(horses_velocity[i]+Math.random()*0.4));  
					horses[i].style.left = horses_position[i] + 'px'; 
				} else if (horses_position[i] == FINISH_LINE-70) { 
					horseCuttingFinishLine(COLORS[i]);
					horses_position[i]++;
				} else if (horses_position[i] == FINISH_LINE) {
					document.getElementById("style_horse_"+COLORS[i]).innerHTML = '';
					horses_position[i]++;
				}
			}		
		}
	}
}
