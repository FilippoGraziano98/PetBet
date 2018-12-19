function freeze_galli_bet_buttons() {
	document.getElementById("gallo_red_quota_button").disabled = true;
	document.getElementById("gallo_blue_quota_button").disabled = true;
}
function unfreeze_galli_bet_buttons() {
	document.getElementById("gallo_red_quota_button").disabled = false;
	document.getElementById("gallo_blue_quota_button").disabled = false;
}
function freeze_simula_button(){
	document.getElementById("simula_fight").disabled = true;
}
function unfreeze_simula_button(){
	document.getElementById("simula_fight").disabled = false;
}

function reset_quote_buttons(){
	var selected_buttons = document.getElementsByClassName("quota_gallo_button_selected");
	for (var i = 0; i < selected_buttons.length; i++) {
		  selected_buttons[i].setAttribute("class", "quota_gallo_button");
	}
	writeWelcomeMessage();
}

//event listener for click on gallo quote button
function bet_on_handler(pressed_button){
	var chosen_gallo = pressed_button.id.split('_')[1];

	var money = document.getElementById("bet").value;
	var chosen_quote = pressed_button.innerHTML;
	quote_calculator(chosen_quote, money);
	
	reset_quote_buttons();
	pressed_button.setAttribute("class", "quota_gallo_button_selected");
	
	var gallo_name = GALLI_LIST[chosen_gallo].gallo_info_name;
	
	document.getElementById("galli_report").innerHTML =
		"<p class=report_font> Hai puntato su </p>"+
		"<p class=scommessa_gallo_nome id=gallo_"+chosen_gallo+"_scommessa_nome>"+gallo_name+"</p>";
	
	sessionStorage.setItem("Gallo-bet_on", "gallo_"+chosen_gallo);
}

//event listener for click on Scommetti button
function ufficialize_galli_bet() {
	var cookie=getCookies();
	if(cookie){
		comunicate_bet_to_server(on_server_response_start_match, "");
	}
	writeAlert("Solo gli utenti registrati possono scommettere");
}

function on_server_response_start_match(check){
	if(!check){
		return false;
	}
	freeze_galli_bet_buttons();
	freeze_simula_button();
	round_startTimer();
}

function bet_get_reward(){
	var winning_gallo = null;
	for(var g in GALLI_LIST){
		if(GALLI_LIST[g] instanceof gallo && !GALLI_LIST[g].isDead ){
			winning_gallo = GALLI_LIST[g].gallo_html.id;
		}
	}
	var gallo_bet_on = sessionStorage.getItem("Gallo-bet_on");
	if( !gallo_bet_on.includes("simulazione")){
		if(winning_gallo == gallo_bet_on){
			writeWinnerMsg("COMPLIMENTI! IL TUO GALLO HA VINTO");
			comunicate_reward_to_server();
		}	else {
			writeLoserMsg("IL TUO GALLO HA PERSO");
		}
	}
	sessionStorage.removeItem("Gallo-bet_on");
}

//add button for reset fight and fight without bet
