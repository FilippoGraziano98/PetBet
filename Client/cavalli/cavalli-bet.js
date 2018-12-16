//setta nella scommesssa la quota del cavallo selzionato
function update_quote(idbutton) {
	var i;
	var color = idbutton.substring(0,idbutton.length-6);
	for(var x=0; x<5; x++) {
		if (COLORS[x] == color) i = x;
	}
	var money = document.getElementById("bet").value;
	var chosen_quote = String(horses_quotes[i]).substring(0,4);
	quote_calculator(chosen_quote, money);
	check_scommessa();
	for(var c=0; c<5; c++) {	
		document.getElementById(COLORS[c] + "button").setAttribute("class", "button");
	}
	document.getElementById(idbutton).setAttribute("class", "buttonselected");
	
	var chosen_horse = document.getElementById("quota_nome_"+color).innerHTML
	document.getElementById("cavalli_report").innerHTML =
		"<p class=report_font> Hai puntato su </p>"+
		"<p class=quota_cavallo_nome id='quota_nome_"+color+"'>"+chosen_horse+"</p>";
	
	sessionStorage.setItem("Cavallo-bet_on", idbutton);
}

//event listener for click on Scommetti button
function ufficialize_cavalli_bet() {
	comunicate_bet_to_server(on_server_response_start_run, "");
}

function on_server_response_start_run(check){
	if(!check){
		return false;
	}
	//freeze cavalli bet buttons
	for(var i=0; i<5; i++){
		var col = COLORS[i];
		document.getElementById(col+"button").disabled = true;
	}
	startGame_Timer();
}
