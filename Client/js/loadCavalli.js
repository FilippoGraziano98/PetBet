var cavalli_html = '\
		<link rel=stylesheet type="text/css" href="css/cavalli.css">\
		<div name="classifica" id="classifica">\
			<p class=title>Corsa di Cavalli</p><br>\
		</div>\
		<div>\
				<div class=field id ="container">\
				<div class=horse id ="animate1"></div>\
				<br>\
				<div class=horse id ="animate2"></div>\
				<br>\
				<div class=horse id ="animate3"></div>\
				<br>\
				<div class=horse id ="animate4"></div>\
				<br>\
				<div class=horse id ="animate5"></div>\
			</div>\
			Scegli su chi vuoi scommettere:\
			<br>\
			<button name="redbutton" id="redbutton" onclick="myMove()">ROSSO</button>\
			<br>\
			<button name="blubutton" id="blubutton" onclick="myMove()">BLU</button>\
			<br>\
			<button name="greenbutton" id="greenbutton" onclick="myMove()">VERDE</button>\
			<br>\
			<button name="yellowbutton" id="yellowbutton" onclick="myMove()">GIALLO</button>\
			<br>\
			<button name="whitebutton" id="whitebutton" onclick="myMove()">BIANCO</button>\
			<br>\
		</div>\
		'


function loadCavalli(){
	document.getElementById("dynamic_area").innerHTML = cavalli_html
}
