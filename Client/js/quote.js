function writeAlert(msg="Input errato") {
	document.getElementById("alert_msg").innerHTML = "<p class=msg>"+msg+"</p>";
}
function writeOkMsg(msg="input corretto") {
	document.getElementById("ok_msg").innerHTML = "<p class=msg>"+msg+"</p>";
}
function appendOkMsg(msg=""){
	document.getElementById("ok_msg").innerHTML += "<br><p class=msg>"+msg+"</p>";
}
function writeWelcomeMessage(){
	bet_on = get_Bet_on_subject();
	switch (bet_on) {
		case "cavalli":
			document.getElementById(bet_on+"_report").style.backgroundColor = "#FAEBD7";
			document.getElementById(bet_on+"_report").innerHTML = "<p class=subtitle>BENVENUTO ALL\'IPPODROMO</p>";
			break;
		case "galli" :
			document.getElementById(bet_on+"_report").style.backgroundColor = "#FAEBD7";
			document.getElementById(bet_on+"_report").innerHTML = "<p class=subtitle>BENVENUTO SUL RING</p>";
			break;
		default:
			console.log("bet_on (expects cavalli or galli): " + bet_on);
			break;
	}
}
function writeWinnerMsg(msg="Scommessa vincente") {
	bet_on = get_Bet_on_subject();
	switch (bet_on) {
		case "cavalli":
		case "galli" :
			document.getElementById(bet_on+"_report").style.backgroundColor = "green";
			document.getElementById(bet_on+"_report").innerHTML = "<p class=emphasized_msg>" + msg + "</p>";
			break;
		default:
			console.log("bet_on (expects cavalli or galli): " + bet_on);
			break;
	}
}
function writeLoserMsg(msg="Scommessa Perdente") {
	bet_on = get_Bet_on_subject();
	switch (bet_on) {
		case "cavalli":
		case "galli" :
			document.getElementById(bet_on+"_report").style.backgroundColor = "var(--dark-red)";
			document.getElementById(bet_on+"_report").innerHTML = "<p class=emphasized_msg>" + msg + "</p>";
			break;
		default:
			console.log("bet_on (expects cavalli or galli): " + bet_on);
			break;
	}
}
function writeVincitaPotenziale(value=""){
	if(value != "") {
		document.getElementById("vincita_potenziale_euro_symbol").innerHTML = "&#8364";
		document.getElementById("vincita_potenziale_value").innerHTML = parseFloat(value).toFixed(2);
	} else {
		document.getElementById("vincita_potenziale_euro_symbol").innerHTML = "";
		document.getElementById("vincita_potenziale_value").innerHTML = "- - -";
	}
}
function getVincitaPotenziale(){
	return document.getElementById("vincita_potenziale_value").innerHTML;
}
function writeQuota(quota=""){
	if(quota != "") {
		document.getElementById("quota").innerHTML = "<p class=bet_font id='quota_int'>"+quota+"</p>";
	} else {
		document.getElementById("quota").innerHTML = "<p class=bet_font id='quota_int'>- - -</p>";
	}
}
function getQuota(){
	if(document.getElementById("quota_int").innerHTML.includes("- - -")) {
		return false;
	}
	return document.getElementById("quota_int").innerHTML;
}
function resetBet(){//bet is the input text wher to write the amount of money you want to bet
	document.getElementById("bet").value = "";
}
function getBet(){
	return document.getElementById("bet").value;
}

function freeze_bet_area(bet_quota) {
	if(bet_quota) document.getElementById("bet").disabled = true;
	document.getElementById("scommetti").disabled = true;
}
function unfreeze_bet_area() {
	document.getElementById("scommetti").disabled = false;
	document.getElementById("bet").disabled = false;
}

function initialize_bet_area() {
	writeQuota("");
	resetBet();
	writeVincitaPotenziale("");
	
	writeAlert("");
	writeOkMsg("");
	writeWelcomeMessage();
	
	unfreeze_bet_area();
}

//controlla che vi sia una socmmessa presente
function check_scommessa() {
	if (!getQuota()){
		writeAlert("Devi prima inserire una quota!");
		return false;
	}
	var importo_scommesso = getBet();
	if (importo_scommesso == "") {
		writeAlert("Inserisci importo");
		return false;
	}
	writeAlert("");
	return true;
}

//function called when changing the amount of money you want to bet
function bet_update() {
	if( !check_scommessa() ) {
		freeze_bet_area(false);
		return false;
	}

	var quota = getQuota();
	var money = getBet();
	var user_budget = getBudgetFromCookie(getCookies());

	if(isNaN(parseInt(money))) {
		writeAlert("La puntata minima deve essere un numero!");
		writeVincitaPotenziale("");
		freeze_bet_area(false);
		return false;
	}

	if (parseInt(money) < 1) {
		writeAlert("La puntata minima è di €1");
		writeVincitaPotenziale("");
		freeze_bet_area(false);
		return false;
	} else if (parseInt(money) > parseInt(user_budget)) {
		writeAlert("Non puoi scommettere un importo superiore al tuo budget");
		writeVincitaPotenziale("");
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
	writeQuota(chosen_quote);
	if (money!="")
		writeVincitaPotenziale(String(parseFloat(chosen_quote) * money));
	if( !check_scommessa() ){
		freeze_bet_area(false);
		return false;
	}
	unfreeze_bet_area();
	return true;
}

function confirm_bet(msg="") {
	if( !check_scommessa() ) {
		return false;
	}
	appendOkMsg(msg);
	freeze_bet_area(true);
	return true;
}
