function register(){
	var url='http://filippo-ubuntu:8000/register'
	var data={
		'username':$('#username').val(),
		'email':$('#email').val(),
		'password':$('#password').val(),
		'nome':$('#nome').val(),
		'cognome':$('#cognome').val(),
		'sesso':$('#sesso').val(),
		'giornoNascita':$('#giornoNascita').val(),
		'meseNascita':$('#meseNascita').val(),
		'annoNascita':$('#annoNascita').val(),
		'cittaNascita':$('#cittaNascita').val(),
		'cittaResidenza':$('#cittaResidenza').val(),
		'indirizzoResidenza':$('#indirizzoResidenza').val(),
		'cap':$('#cap').val(),
	}
	$.post(url, data, function onsuccess(_response){
			var response = JSON.parse(_response);
			console.log(response)
			if(response.msg=="registration_success"){
				window.location.replace("../login/login.html?redirect_from=registration")
			} else if(response.msg=="registration_failure__username_already_in_use"){
				document.getElementById("reg_sub_header").innerHTML="Username already in use!<br>\nChange username<br>"
			} else if(response.msg=="registration_failure__server_not_able_to_understand_data"){
				document.getElementById("reg_sub_header").innerHTML="Server wasn't able to parse your data!<br>\nCheck the way you are sending your requests<br>"
			} else {
				console.log("unrecognized_server_response");
			}
		});
	document.forms["register_form"].reset();
};
