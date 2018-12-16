function logout() {
	localStorage.removeItem("PetBet-Cookies");
	sessionStorage.removeItem("PetBet-Cookies");
	window.location.replace("index.html");
}
