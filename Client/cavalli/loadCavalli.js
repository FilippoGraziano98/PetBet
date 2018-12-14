var cavalli_html = '\
		<link rel=stylesheet type="text/css" href="cavalli/cavalli.css">\
		<div id=header_div><p class=title>Corsa di Cavalli</p></div>\
		<br>\
		<div class=back name="backcavalli" id="backcavalli">\
			<br><br>\
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
			<br><br>\
		</div>\
		<br>\
		<div name="quote" id="quote" style="overflow-x:auto;">\
				<table>\
					<tr>\
						<td class=quote>\
							<p>Scegli su chi vuoi scommettere:</p>\
							<br><br>\
							<table>\
								<tr>\
									<td><p class=quota_cavallo_nome name="quota_nome_red" id="quota_nome_red"></p></td>\
									<td><button class=button name="redbutton" id="redbutton" onclick="update_quote(this.id)">???</button></td>\
								</tr>\
								<tr>\
									<td><p class=quota_cavallo_nome name="quota_nome_blue" id="quota_nome_blue"></p></td>\
									<td><button class=button name="bluebutton" id="bluebutton" onclick="update_quote(this.id)">???</button></td>\
								</tr>\
								<tr>\
									<td><p class=quota_cavallo_nome name="quota_nome_green" id="quota_nome_green"></p></td>\
									<td><button class=button name="greenbutton" id="greenbutton" onclick="update_quote(this.id)">???</button></td>\
								</tr>\
								<tr>\
									<td><p class=quota_cavallo_nome name="quota_nome_yellow" id="quota_nome_yellow"></p></td>\
									<td><button class=button name="yellowbutton" id="yellowbutton" onclick="update_quote(this.id)">???</button></td>\
								</tr>\
								<tr>\
									<td><p class=quota_cavallo_nome name="quota_nome_white" id="quota_nome_white"></p></td>\
									<td><button class=button name="whitebutton" id="whitebutton" onclick="update_quote(this.id)">???</button></td>\
								</tr>\
							</table>\
						</td>\
						<td class=classifica>\
							<div name="infoCavallo" id="infoCavallo">\
							</div>\
							<div name="classifica" id="classifica">\
								<p class=title>Benvenuto all\'Ippodromo</p><br><br>\
								<p> Fai una scommessa per iniziare </p><br><br>\
							</div>\
							<div name="timerEndGame" id="timerEndGame">\
							</div>\
						</td>\
					</tr>\
				</table>\
		</div>\
		'


function loadCavalli(){
	document.getElementById("dynamic_area").style.background = "var(--no-colour)";
	document.getElementById("dynamic_area").innerHTML = cavalli_html;

	var COLORS = ['red','blue','green', 'yellow','white'];
	for(var i=0; i<5; i++){
		var col = COLORS[i];
		document.getElementById("animate_"+col).addEventListener("mouseenter", showInfoHorse, false);
		document.getElementById("animate_"+col).addEventListener("mouseout", hideInfoHorse, false);
	}
	if( ! localStorage.getItem("PetBet - Horses") ){
		var horses = [
				{"id":1, "name":"Nearco", "age":4, "razza":"Purosangue Inglese", "wins":0, "races":0},
				{"id":2, "name":"Tenerani", "age":4, "razza":"Purosangue Inglese", "wins":0, "races":0},
				{"id":3, "name":"Donatello", "age":5, "razza":"Purosangue Inglese", "wins":0, "races":0},
				{"id":4, "name":"Niccolò dell'Arca'", "age":4, "razza":"Purosangue Arabo", "wins":0, "races":0},
				{"id":5, "name":"Orsenigo", "age":5, "razza":"Purosangue Arabo", "wins":0, "races":0},
				{"id":6, "name":"Astolfina", "age":3, "razza":"Purosangue Arabo", "wins":0, "races":0},
				{"id":7, "name":"Macherio", "age":3, "razza":"Mezzosangue", "wins":0, "races":0},
				{"id":8, "name":"Fante", "age":6, "razza":"Mezzosangue", "wins":0, "races":0},
				{"id":9, "name":"Gladiolo", "age":6, "razza":"Mezzosangue", "wins":0, "races":0},
				{"id":10, "name":"Vezzano", "age":7, "razza":"Cavallo da Sella Italiano", "wins":0, "races":0},
				{"id":11, "name":"Sirte", "age":7, "razza":"Cavallo da Sella Italiano", "wins":0, "races":0},
				{"id":12, "name":"Arco", "age":8, "razza":"Cavallo da Sella Italiano", "wins":0, "races":0}
			]

		localStorage.setItem("PetBet - Horses", JSON.stringify(horses));
	}
	document.getElementById("scommetti").addEventListener("click", startGame_Timer);
	freeze_bet_area(false);
	setGame("redbutton");
}
