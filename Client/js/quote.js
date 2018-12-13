function initialize_bet_area() {
	document.getElementById("quota").innerHTML = "<p id='quota_int'>- - -</p>";
	document.getElementById("vincita_potenziale").innerHTML = "<p>- - -</p>";
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
		document.getElementById("alert").innerHTML = "<p class=msg>Devi prima inserire una quota!</p>";
		return false;
	}
	if (document.getElementById("bet").value == "") {
		document.getElementById("alert").innerHTML = "<p class=msg>Inserisci importo</p>";
		return false;
	}
	document.getElementById("alert").innerHTML = "";
	return true;
}

function confirm_bet() {
	if( !check_scommessa() ) {
		return false;
	}
	document.getElementById("ok_msg").innerHTML = "<p class=msg>SCOMMESSA REGISTRATA CON SUCCESSO</p>";
	freeze_bet_area(true);
	return true;
}

function bet_update() {
	if( !check_scommessa() ) {
		freeze_bet_area(false);
		return false;
	}

	var quota = document.getElementById("quota_int").innerHTML;
	var money = document.getElementById("bet").value;

	if (money < 1) {
		document.getElementById("alert").innerHTML = "<p class=msg>La puntata minima è di €1</p>";
		document.getElementById("vincita_potenziale").innerHTML = "<p>- - -</p>";
		freeze_bet_area(false);
		return false;
	}
	document.getElementById("alert").innerHTML = "";
	quote_calculator(quota, money);

	return true;
}

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

function writeWinnerMsg(msg) {
	document.getElementById("winner_msg").innerHTML = "<p class=msg>" + msg + "</p>";
}

function writeLoserMsg(msg) {
	document.getElementById("loser_msg").innerHTML = "<p class=msg>" + msg + "</p>";
}

