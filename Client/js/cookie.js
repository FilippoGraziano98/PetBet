function setCookie(name,value,days) {
	console.log(navigator.userAgent);
	if (navigator.userAgent.includes("Chrome")){
		document.cookies="session-id="+response.cookies;
		//document.cookies.sessionid=response.cookies;
		localStorage.cookies="session-id="+response.cookies;
		sessionStorage.cookies="session-id="+response.cookies;
		console.log(localStorage.cookies);
	} else if (navigator.userAgent.includes("Firefox")){
		var expires = "";
		if (days) {
			var date = new Date();
				date.setTime(date.getTime() + (days*24*60*60*1000));
				expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "")	+ expires + "; path=/";
	}
}

function getCookies(){


}
