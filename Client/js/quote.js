function initialize_bet_area() {
	document.getElementById("quota").innerHTML = "<p class=bet_font id='quota_int'>- - -</p>";
	document.getElementById("bet").value = ""
	document.getElementById("vincita_potenziale").innerHTML = "<p class=bet_font>- - -</p>";
	
	writeAlert("");
	document.getElementById("ok_msg").innerHTML = "";
	document.getElementById("report").style.backgroundColor = "#FAEBD7";
	document.getElementById("report").innerHTML = "<p class=subtitle>BENVENUTO ALL\'IPPODROMO</p>";
	
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
	var importo_scommesso = document.getElementById("bet").value;
	if (importo_scommesso == "") {
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
	var user_budget = getBudgetFromCookie(getCookies());

	if (money < 1) {
		writeAlert("La puntata minima è di €1");
		document.getElementById("vincita_potenziale").innerHTML = "<p class=bet_font>- - -</p>";
		freeze_bet_area(false);
		return false;
	} else if (money > user_budget) {
		writeAlert("Non puoi scommettere un importo superiore al tuo budget");
		document.getElementById("vincita_potenziale").innerHTML = "<p class=bet_font>- - -</p>";
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
	document.getElementById("quota").innerHTML = "<p class=bet_font id=quota_int>" + chosen_quote + "</p>";
	document.getElementById("vincita_potenziale").innerHTML = "<p class=bet_font> &#8364 " + (parseFloat(chosen_quote) * money).toFixed(2) + "</p>";
	unfreeze_bet_area();
}

function writeAlert(msg="Input errato") {
	document.getElementById("alert_msg").innerHTML = "<p class=msg>"+msg+"</p>";
}
function writeWinnerMsg(msg="Scommessa vincente") {
	document.getElementById("report").style.backgroundColor = "green";
	document.getElementById("report").innerHTML = "<p class=emphasized_msg>" + msg + "</p>";
}
function writeLoserMsg(msg="Scommessa Perdente") {
	document.getElementById("report").style.backgroundColor = "var(--dark-red)";
	document.getElementById("report").innerHTML = "<p class=emphasized_msg>" + msg + "</p>";
}

