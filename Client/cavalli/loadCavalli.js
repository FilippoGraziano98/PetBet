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
						<div class=horse id ="animate_red"></div>\
						<br><br><br>\
						<div class=horse id ="animate_blue"></div>\
						<br><br><br>\
						<div class=horse id ="animate_green"></div>\
						<br><br><br>\
						<div class=horse id ="animate_yellow"></div>\
						<br><br><br>\
						<div class=horse id ="animate_white"></div>\
					</div>\
				</td>\
				<td>\
					<div name="classifica" id="classifica">\
						<p class=title>Informazioni sul Cavallo</p>\
						<table>\
							<tr>\
								<td><p> Colore: </p></td>\
								<td><p>-</p></td>\
							<tr>\
								<td><p> Vittorie: </p></td>\
								<td><p>-/-</p></td>\
						</table><br>\
					</div>\
				</td>\
		</table>\
		<div name="quote" id="quote" style="overflow-x:auto;">\
			Scegli su chi vuoi scommettere:\
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
	}
}
