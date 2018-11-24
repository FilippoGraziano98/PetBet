function logout() {
	localStorage.removeItem("PetBetCookies");
	sessionStorage.removeItem("PetBetCookies");
	window.location.replace("index.html")
}
