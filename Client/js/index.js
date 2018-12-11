function bet_update() {
	var quota = document.getElementById("quota_int").innerHTML;
	var money = document.getElementById("bet").value;
	if(quota.includes("- - -")) {
		alert("Devi prima inserire una quota!");
	}
	else {
		if (money < 1) {
			alert("La puntata minima è di €1");
			document.getElementById("vincita_potenziale").innerHTML = "<p>- - -</p>";
			document.getElementById("scommetti").disabled = true;
			return false;
		}
		document.getElementById("scommetti").disabled = false;
		quote_calculator(quota, money);
	}
}

function quote_calculator(chosen_quote, money) {
	document.getElementById("quota").innerHTML = "<p id=quota_int>" + chosen_quote + "</p>";
	document.getElementById("vincita_potenziale").innerHTML = "<p> &#8364 " + (parseFloat(chosen_quote) * money).toFixed(2) + "</p>";
}

