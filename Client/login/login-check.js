function validaForm() {
	if(document.login_form.user.value=="") {
		alertMsg("Il campo user non pu\u00F2 essere vuoto");
		return false;
	}
	if(document.login_form.password.value=="") {
		alertMsg("Il campo password non pu\u00F2 essere vuoto");
		return false;
	}
	return true;
}

function alertMsg(msg) {
	document.getElementById("error_msg").innerHTML = msg;
}
