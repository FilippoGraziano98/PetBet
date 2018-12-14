function initialize_bet_area() {
	document.getElementById("quota").innerHTML = "<p id='quota_int'>- - -</p>";
	document.getElementById("bet").value = ""
	document.getElementById("vincita_potenziale").innerHTML = "<p>- - -</p>";
	
	writeAlert("");
	document.getElementById("ok_msg").innerHTML = "";
	writeWinnerMsg("");
	writeLoserMsg("");
	
	unfreeze_bet_area();
}

function freeze_bet_area(bet_quota) {
	if(bet_quota) document.getElementById("bet").disabled = true;
	document.getElementById("scommetti").disabled = true;
}

function unfreeze_bet_area() {
	document.getElementById("scommetti").disabled = false;
	document.getElementById("bet").disabled = false;
}

//controlla che vi sia una socmmessa presente
function check_scommessa() {
	if (document.getElementById("quota_int").innerHTML.includes("- - -")){
		writeAlert("Devi prima inserire una quota!");
		return false;
	}
	if (document.getElementById("bet").value == "") {
		writeAlert("Inserisci importo");
		return false;
	}
	writeAlert("");
	return true;
}

function confirm_bet(msg="") {
	if( !check_scommessa() ) {
		return false;
	}
	if ( msg == "" ) {
		msg="Scommessa registrata con successo";
	}
	document.getElementById("ok_msg").innerHTML = "<p class=msg>"+msg+"</p>";
	freeze_bet_area(true);
	return true;
}

//function called when changing the amount of money you want to bet
function bet_update() {
	if( !check_scommessa() ) {
		freeze_bet_area(false);
		return false;
	}

	var quota = document.getElementById("quota_int").innerHTML;
	var money = document.getElementById("bet").value;

	if (money < 1) {
		writeAlert("La puntata minima è di €1");
		document.getElementById("vincita_potenziale").innerHTML = "<p>- - -</p>";
		freeze_bet_area(false);
		return false;
	}
	writeAlert("");
	quote_calculator(quota, money);

	return true;
}

//function to be called when pressing a quote button
//calcola la vincita e prepara la scommessa
function quote_calculator(chosen_quote, money) {
	document.getElementById("quota").innerHTML = "<p id=quota_int>" + chosen_quote + "</p>";
	document.getElementById("vincita_potenziale").innerHTML = "<p> &#8364 " + (parseFloat(chosen_quote) * money).toFixed(2) + "</p>";
	if( !check_scommessa() ){
		freeze_bet_area(false);
		return false;
	}
	unfreeze_bet_area();
	return true;
}

function writeAlert(msg="Input errato") {
	document.getElementById("alert_msg").innerHTML = "<p class=msg>"+msg+"</p>";
}
function writeWinnerMsg(msg="Scommessa vincente") {
	document.getElementById("winner_msg").innerHTML = "<p class=emphasized_msg>" + msg + "</p>";
}
function writeLoserMsg(msg="Scommessa Perdente") {
	document.getElementById("loser_msg").innerHTML = "<p class=emphasized_msg>" + msg + "</p>";
}

