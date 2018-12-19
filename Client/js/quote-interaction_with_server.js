//params:
	//function to call if server-interaction was successfull
function comunicate_bet_to_server(on_response_start_game){
	var importo_scommesso = getBet();
	
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
				if(confirm_bet("")){
					on_response_start_game(true);
				} else {
					on_response_start_game(false);
				}
				return true;
			} else {
				//if you get here means you are manually crafting your cookies
				//I don't bother giving you errors, everythin crashes
				window.alert("Invalid_cookie - error in handling client-server inteaction");
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

function comunicate_reward_to_server(){
	var vincita = getVincitaPotenziale();
	
	var old_sessionid = getSessionIdFromCookie(getCookies());
	
	var url='http://localhost:8000/bet_reward'
	var data={
		'cookies':old_sessionid,
		'vincita':vincita
	}
	console.log(data);
	
	$.post(url, data, function onsuccess(_response){
		var response = JSON.parse(_response);
		console.log(response);
		if(response.msg=="reward_success"){
			console.log("cookies: "+response.cookies);
			var new_cookie_name = response.cookies.split("=")[0]; //session-id, we'll ignore this part
			var new_cookie_value = response.cookies.split("=")[1];
			var new_cookie = changeCookieValue(old_sessionid, new_cookie_value);
			if(new_cookie) {
				set_user_info_area(new_cookie);
				writeOkMsg("Il server ha convalidato la vincita");
				return true;
			} else {
				//if you get here means you are manually crafting your cookies
				//I don't bother giving you errors, everythin crashes
				window.alert("Invalid_cookie - error in handling client-server inteaction");
				window.location.replace("index.html");
			}
		} else if(response.msg=="reward_failure__cookie_not_valid"){
			writeAlert("Server unable to give you your reward!<br>\nInvalid cookie!<br>Try to log out and log in again<br>");
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
