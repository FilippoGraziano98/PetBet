//al caricamento della pagina,
	//verifico se sono stato reinidirizzato dalla registrazione
$(document).ready(function(){
	var url_string = window.location.href;
	var url = new URL(url_string);
	var redirect = url.searchParams.get("redirect_from");
	console.log("redirect_from: "+redirect);
	if(redirect=="registration"){
		document.getElementById("login_sub_header").innerHTML="Congratulations!<br>\nServer accepted your registration.<br>\nYou are now a user of PetBet!<br>\n<br>";
		//window.location.href=
	}
});

function setCookie(name,value,days) {
	var expires = "";
	if (days) {
		var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "")	+ expires + "; path=/";
}

function login(){
		if(validaForm()) { 
			var url='http://filippo-ubuntu:8000/login'
			var data={'email':$('#email').val(),'password':$('#password').val()}
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
				}
				else if(response.msg=="login_fail"){
					//window.alert("Your registration failed!\nTry again.")
					document.getElementById("login_sub_header").innerHTML="Login failed!<br>\nUser and/or Password wrong!<br>"
				}
				else {
				
				}
			});
	}
	document.forms["login_form"].reset();
};
