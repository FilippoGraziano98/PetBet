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
			document.getElementById(bet_on+"_report").innerHTML = "<p class=subtitle>BENVENUTO AL RING</p>";
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

function freeze_bet_area(bet_quota) {
	if(bet_quota) document.getElementById("bet").disabled = true;
	document.getElementById("scommetti").disabled = true;
}
function unfreeze_bet_area() {
	document.getElementById("scommetti").disabled = false;
	document.getElementById("bet").disabled = false;
}

function initialize_bet_area() {
	document.getElementById("quota").innerHTML = "<p class=bet_font id='quota_int'>- - -</p>";
	document.getElementById("bet").value = ""
	document.getElementById("vincita_potenziale").innerHTML = "<p class=bet_font>- - -</p>";
	
	writeAlert("");
	writeOkMsg("");
	writeWelcomeMessage();
	
	unfreeze_bet_area();
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

//function called when changing the amount of money you want to bet
function bet_update() {
	if( !check_scommessa() ) {
		freeze_bet_area(false);
		return false;
	}

	var quota = document.getElementById("quota_int").innerHTML;
	var money = document.getElementById("bet").value;
	var user_budget = getBudgetFromCookie(getCookies());

	if(isNaN(parseInt(money))) {
		writeAlert("La puntata minima deve essere un numero!");
		document.getElementById("vincita_potenziale").innerHTML = "<p>- - -</p>";
		freeze_bet_area(false);
		return false;
	}

	if (parseInt(money) < 1) {
		writeAlert("La puntata minima è di €1");
		document.getElementById("vincita_potenziale").innerHTML = "<p class=bet_font>- - -</p>";
		freeze_bet_area(false);
		return false;
	} else if (parseInt(money) > parseInt(user_budget)) {
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
	document.getElementById("vincita_potenziale").innerHTML =
		"<p class=bet_font> &#8364 " + (parseFloat(chosen_quote) * money).toFixed(2) + "</p>";
	if( !check_scommessa() ){
		freeze_bet_area(false);
		return false;
	}
	unfreeze_bet_area();
	return true;
}

//params:
	//function to call if server-interaction was successfull
	//ok_msg to prin if all was successfull
function comunicate_bet_to_server(on_response_start_game, ok_msg){
	var importo_scommesso = document.getElementById("bet").value;
	
	var old_sessionid = getSessionIdFromCookie(getCookies());
	
	var url='http://localhost:8000/bet'
	var data={
		'cookies':old_sessionid,
		'importo_scommessa':importo_scommesso
	}
	
	$.post(url, data, function onsuccess(_response){
		var response = JSON.parse(_response);
		console.log(response);
		if(response.msg=="bet_success"){
			console.log("cookies: "+response.cookies);
			var new_cookie_name = response.cookies.split("=")[0]; //session-id, we'll ignore this part
			var new_cookie_value = response.cookies.split("=")[1];
			var new_cookie = changeCookieValue(old_sessionid, new_cookie_value);
			if(new_cookie) {
				set_user_info_area(new_cookie);
				writeOkMsg("Il server ha registrato la scommessa");
				if(confirm_bet(ok_msg)){
					on_response_start_game(true);
				} else {
					on_response_start_game(false);
				}
				return true;
			} else {
				//if you get here means you are manually crafting your cookies
				//I don't bother giving you errors, everythin crashes
				window.alert("Invalid_cookie");
				window.location.replace("index.html");
			}
		} else if(response.msg=="bet_failure__cookie_not_valid"){
			writeAlert("Bet failed!<br>\nInvalid cookie!<br>Try to log out and log in again<br>");
				return false;
		} else if(response.msg=="bet_failure__server_not_able_to_understand_data"){
			writeAlert("Server wasn't able to parse your data!<br>\nCheck the way you are sending your requests<br>");
			return false;
		} else {
			writeAlert("unrecognized_server_response");
			return false;
		}
	});
}

function confirm_bet(msg="") {
	if( !check_scommessa() ) {
		return false;
	}
	appendOkMsg(msg);
	freeze_bet_area(true);
	return true;
}
