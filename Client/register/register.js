function register(){
	var url='http://filippo-ubuntu:8000/register'
	var data={'username':$('#username').val(),'password':$('#password').val()}
	$.post(url, data, function onsuccess(response){
			console.log(response)
			if(response.includes("Registration success.")){
				//window.alert("Congratulations!\nServer accepted your registration.\nYou are now a user of PetBet!")
				window.location.replace("../login/login.html?redirect_from=registration")
			}
			else{
				//window.alert("Your registration failed!\nTry again.")
				document.getElementById("reg_sub_header").innerHTML="Your registration failed!<br>\nTry again.<br>"
			}
		});
	document.forms["register_form"].reset();
};
