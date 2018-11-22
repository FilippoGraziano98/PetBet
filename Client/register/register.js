function register(){
	if(validaAccessForm()){
		var url='http://filippo-ubuntu:8000/register'
		var data={
			'username':$('#username').val(),
			'email':$('#email').val(),
			'password':$('#password').val(),
			'nome':$('#inputUtente').val(),
			'cognome':$('#inputCognome').val(),
			'sesso':$('#sesso').val(),
			'giornoNascita':$('#giorno').val(),
			'meseNascita':$('#mese').val(),
			'annoNascita':$('#anno').val(),
			'cittaNascita':$('#nascita').val(),
			'cittaResidenza':$('#residenza').val(),
			'indirizzoResidenza':$('#indirizzo').val(),
			'cap':$('#cap').val(),
		}
		$.post(url, data, function onsuccess(_response){
				var response = JSON.parse(_response);
				console.log(response)
				if(response.msg=="registration_success"){
					document.forms["register_form"].reset();
					window.location.replace("../login/login.html?redirect_from=registration")
				} else if(response.msg=="registration_failure__username_already_in_use"){
					document.getElementById("reg_sub_header").innerHTML="Username already in use!<br>\nChange username<br>"
				} else if(response.msg=="registration_failure__server_not_able_to_understand_data"){
					document.getElementById("reg_sub_header").innerHTML="Server wasn't able to parse your data!<br>\nCheck the way you are sending your requests<br>"
				} else {
					console.log("unrecognized_server_response");
				}
			});
		//document.forms["register_form"].reset();
		return true;
	} else {
		console.log("invalid form")
		return false;
	}
};
