var cavalli_html = '\
		<link rel=stylesheet type="text/css" href="css/main_style.css">\
		<link rel=stylesheet type="text/css" href="cavalli/cavalli.css">\
		<div name="classifica" id="classifica">\
		</div>\
		<div align=center>\
			<br><br><br>\
			<div class=field id ="container">\
				<br>\
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
			<p>\
				Scegli su chi vuoi scommettere:\
				<br><br>\
				<button name="redbutton" id="redbutton" onclick="myMove()">ROSSO</button>\
				<br><br>\
				<button name="blubutton" id="blubutton" onclick="myMove()">BLU</button>\
				<br><br>\
				<button name="greenbutton" id="greenbutton" onclick="myMove()">VERDE</button>\
				<br><br>\
				<button name="yellowbutton" id="yellowbutton" onclick="myMove()">GIALLO</button>\
				<br><br>\
				<button name="whitebutton" id="whitebutton" onclick="myMove()">BIANCO</button>\
				<br><br><br>\
			</p>\
		</div>\
		'


function loadCavalli(){
	document.getElementById("dynamic_area").innerHTML = cavalli_html 
}
