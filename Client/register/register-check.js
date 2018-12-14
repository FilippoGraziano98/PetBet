function validaAccessForm() {
	if(document.register_form.inputUtente.value=="") {
		alertMsg("Il nome utente non pu\u00F2 essere vuoto");
		return false;
	}	if (!isNaN(parseInt(document.register_form.inputUtente.value))) {
		alertMsg("Il nome utente non pu\u00F2 essere un numero");
		return false;
	} if(document.register_form.inputCognome.value=="") {
		alertMsg("Il campo cognome non pu\u00F2 essere vuoto");
		return false;
	} if(document.register_form.nascita.value=="") {
		alertMsg("Il campo nascita non pu\u00F2 essere vuoto");
		return false;
	} if(document.register_form.residenza.value=="") {
		alertMsg("Il campo residenza non pu\u00F2 essere vuoto");
		return false;
	} if(document.register_form.indirizzo.value=="") {
		alertMsg("Il campo indirizzo non pu\u00F2 essere vuoto");
		return false;
	} if(document.register_form.cap.value=="") {
		alertMsg("Il campo cap non pu\u00F2 essere vuoto");
		return false;
	} if (isNaN(parseInt(document.register_form.cap.value)) || document.register_form.cap.value.length != 5) {
		alertMsg("CAP non valido");
		return false;
	} if (document.register_form.budget.value=="" || document.register_form.budget.value <= 0 || isNaN(parseInt(document.register_form.budget.value))) {
		alertMsg("Budget non valido");
		return false;
	} if(document.register_form.username.value=="") {
		alertMsg("Il campo username non pu\u00F2 essere vuoto");
		return false;
	} if(document.register_form.email.value=="") {
		alertMsg("Inserisci email");
		return false;
	} if(document.register_form.password.value=="") {
		alertMsg("Inserisci la password");
		return false;
	} if(document.register_form.confermaPassword.value=="") {
		alertMsg("Ripeti la password");
		return false;
	} if (document.register_form.password.value != document.register_form.confermaPassword.value) {
		alertMsg("Hai inserito password diverse");
		return false;				
	}
	return true;
}

function alertMsg(msg) {
	document.getElementById("error_msg").innerHTML = msg;
}
