//al caricamento della pagina,
	//verifico se sono stato reinidirizzato dalla registrazione
$(document).ready(function(){
	var url_string = window.location.href;
	var url = new URL(url_string);
	var redirect = url.searchParams.get("redirect_from");
	console.log("redirect_from: "+redirect);
	if(redirect=="registration"){
		document.getElementById("login_sub_header").innerHTML="Congratulations!<br>\nServer accepted your registration.<br>\nYou are now a user of PetBet!<br>\n<br>";
		//now removing redirect_from from the visualized url
		var current_url = window.location.href;
		var update_url = current_url.split("?")[0]
		console.log(update_url)
		if(update_url.includes("login.html")){
			//window.location.href=update_url; //this resulted in reloading the page
			history.pushState(null, null, update_url);
		}
	}
});

function login(){
	var url='http://filippo-ubuntu:8000/login'
	var data={
		'user':$('#user').val(),
		'password':$('#password').val()
	}
	$.post(url, data, function onsuccess(_response){
			var response = JSON.parse(_response);
			console.log(response);
			if(response.msg=="login_success"){
				console.log("cookies: "+response.cookies);
				setCookie("sessionid","abcd",true);
				document.cookies="session-id="+response.cookies;
				//document.cookies.sessionid=response.cookies;
				localStorage.cookies="session-id="+response.cookies;
				sessionStorage.cookies="session-id="+response.cookies;
				console.log(localStorage.cookies)
				//goto home with cookies
				//window.location.replace("../login/login.html?redirect_from=registration")
			} else if(response.msg=="login_failure__credentials_not_valid"){
				document.getElementById("login_sub_header").innerHTML="Login failed!<br>\nUser and/or Password wrong!<br>"
			} else if(response.msg=="login_failure__server_not_able_to_understand_data"){
				document.getElementById("reg_sub_header").innerHTML="Server wasn't able to parse your data!<br>\nCheck the way you are sending your requests<br>"
			} else {
				console.log("unrecognized_server_response");
			}
		});
	document.forms["login_form"].reset();
};
