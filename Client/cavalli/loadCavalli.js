var cavalli_html = '\
		<link rel=stylesheet type="text/css" href="cavalli/cavalli.css">\
		<div name="classifica" id="classifica">\
			<p class=title>Corsa di Cavalli</p><br>\
		</div>\
		<div>\
				<div class=field id ="container">\
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
				Scegli su chi vuoi scommettere:\
				<div class=strisciapari id="striscia0">Cavallo Rosso:\
				<button class=button name="redbutton" id="redbutton" onclick="myMove()">???</button></div>\
				<div class=strisciadispari id="striscia1"> Cavallo Blu:\
				<button class=button name="blubutton" id="blubutton" onclick="myMove()">???</button></div>\
				<div class=strisciapari id="striscia2">Cavallo Verde:\
				<button class=button name="greenbutton" id="greenbutton" onclick="myMove()">???</button></div>\
				<div class=strisciadispari id="striscia3"> Cavallo Giallo:\
				<button class=button name="yellowbutton" id="yellowbutton" onclick="myMove()">???</button></div>\
				<div class=strisciapari id="striscia4"> Cavallo Bianco:\
				<button class=button name="whitebutton" id="whitebutton" onclick="myMove()">???</button></div>\
		'


function loadCavalli(){
	document.getElementById("dynamic_area").innerHTML = cavalli_html
}
