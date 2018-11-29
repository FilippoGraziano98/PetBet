var cavalli_html = '\
		<link rel=stylesheet type="text/css" href="cavalli/cavalli.css">\
		<style type="text/css" id="style_horse_red">\
		</style>\
		<style type="text/css" id="style_horse_blue">\
		</style>\
		<style type="text/css" id="style_horse_green">\
		</style>\
		<style type="text/css" id="style_horse_yellow">\
		</style>\
		<style type="text/css" id="style_horse_white">\
		</style>\
		<div><p class=title>Corsa di Cavalli</p></div>\
		<table>\
			<tr>\
				<td>\
					<div class=field name="container" id ="container">\
						<div class=horse id="animate_red"></div>\
						<br><br><br>\
						<div class=horse id="animate_blue"></div>\
						<br><br><br>\
						<div class=horse id="animate_green"></div>\
						<br><br><br>\
						<div class=horse id="animate_yellow"></div>\
						<br><br><br>\
						<div class=horse id="animate_white"></div>\
					</div>\
				</td>\
				<td>\
					<div name="classifica" id="classifica">\
						<p class=title>Benvenuto all\'Ippodromo</p><br><br>\
						<p> Fai una scommessa per iniziare </p><br><br>\
					</div>\
				</td>\
		</table>\
		<div name="quote" id="quote" style="overflow-x:auto;">\
			<p>Scegli su chi vuoi scommettere:</p>\
			<table>\
				<tr>\
					<td>Cavallo Rosso:</td>\
					<td><button class=button name="redbutton" id="redbutton" onclick="myMove()">???</button></td>\
				</tr>\
				<tr>\
					<td>Cavallo Blu:</td>\
					<td><button class=button name="bluebutton" id="bluebutton" onclick="myMove()">???</button></td>\
				</tr>\
				<tr>\
					<td>Cavallo Verde:</td>\
					<td><button class=button name="greenbutton" id="greenbutton" onclick="myMove()">???</button></td>\
				</tr>\
				<tr>\
					<td>Cavallo Giallo:</td>\
					<td><button class=button name="yellowbutton" id="yellowbutton" onclick="myMove()">???</button></td>\
				</tr>\
				<tr>\
					<td>Cavallo Bianco:</td>\
					<td><button class=button name="whitebutton" id="whitebutton" onclick="myMove()">???</button></td>\
				</tr>\
			</table>\
		</div>\
		'


function loadCavalli(){
	document.getElementById("dynamic_area").innerHTML = cavalli_html;

	var colors = ['red','blue','green', 'yellow','white'];
	for(var i=0; i<5; i++){
		var col = colors[i];
		document.getElementById("animate_"+col).addEventListener("mouseenter", showInfoHorse, false);
		document.getElementById("animate_"+col).addEventListener("mouseout", hideInfoHorse, false);
	}
	if( ! localStorage.getItem("PetBet - Horses") ){
		var horses = [
				{"id":1, "name":"Nearco", "age":3, "wins":0, "races":0},
				{"id":2, "name":"Tenerani", "age":4, "wins":0, "races":0},
				{"id":3, "name":"Donatello", "age":5, "wins":0, "races":0},
				{"id":4, "name":"Niccolò dell'Arca'", "age":3, "wins":0, "races":0},
				{"id":5, "name":"Orsenigo", "age":4, "wins":0, "races":0},
				{"id":6, "name":"Astolfina", "age":5, "wins":0, "races":0},
				{"id":7, "name":"Macherio", "age":4, "wins":0, "races":0},
				{"id":8, "name":"Fante", "age":5, "wins":0, "races":0},
				{"id":9, "name":"Gladiolo", "age":6, "wins":0, "races":0},
				{"id":10, "name":"Vezzano", "age":5, "wins":0, "races":0},
				{"id":11, "name":"Sirte", "age":6, "wins":0, "races":0},
				{"id":12, "name":"Arco", "age":7, "wins":0, "races":0}
			]

		localStorage.setItem("PetBet - Horses", JSON.stringify(horses));
	}
	setQuote();
}
