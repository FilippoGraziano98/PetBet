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
						<div class=horse id ="animate1"></div>\
						<br><br><br>\
						<div class=horse id ="animate2"></div>\
						<br><br><br>\
						<div class=horse id ="animate3"></div>\
						<br><br><br>\
						<div class=horse id ="animate4"></div>\
						<br><br><br>\
						<div class=horse id ="animate5"></div>\
					</div>\
				</td>\
				<td>\
					<div name="classifica" id="classifica">\
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
					<td><button class=button name="blubutton" id="blubutton" onclick="myMove()">???</button></td>\
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
	document.getElementById("dynamic_area").innerHTML = cavalli_html
}
