//event listener for click on gallo quote button
function bet_on(pressed_button){
	var chosen_gallo = pressed_button.id.split('_')[1];

	var money = document.getElementById("bet").value;
	var chosen_quote = pressed_button.innerHTML;
	quote_calculator(chosen_quote, money);
	
	var selected_buttons = document.getElementsByClassName("quota_gallo_button_selected");
	for (var i = 0; i < selected_buttons.length; i++) {
		  selected_buttons[i].setAttribute("class", "quota_gallo_button");
	}
	
	pressed_button.setAttribute("class", "quota_gallo_button_selected");
	sessionStorage.setItem("Gallo-bet_on", "gallo_"+chosen_gallo);
}

//event listener for click on Scommetti button
function ufficialize_bet() {
	var chosen_gallo = sessionStorage.getItem("Gallo-bet_on");
	var check = confirm_bet("Hai scommesso su "+chosen_gallo);
	if(!check){
		return false;
	}
	
	start_round();
}

function bet_get_reward(){
	var winning_gallo = null;
	for(var g in GALLI_LIST){
		if(GALLI_LIST[g] instanceof gallo && !GALLI_LIST[g].isDead ){
			winning_gallo = GALLI_LIST[g].gallo_html.id;
		}
	}
	var gallo_bet_on = sessionStorage.getItem("Gallo-bet_on");
	if(winning_gallo == gallo_bet_on)
		writeWinnerMsg();
	else
		writeLoserMsg();
}
