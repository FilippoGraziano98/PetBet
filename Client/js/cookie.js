function setCookie(name,value,days) {
	console.log(navigator.userAgent);
	var expires = "";
	if (days) {
		var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "")	+ expires + "; path=/";
}
