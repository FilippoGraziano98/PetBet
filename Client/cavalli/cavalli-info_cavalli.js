function showInfoHorse(e) {
	var color = e.target.id.split("_")[1];
	var horse = document.getElementById("animate_"+color);
	var horse_id = horse.horse_id;
	var horse_name = horse.horse_name;
	var horse_age = horse.horse_age;
	var horse_wins = horse.horse_wins;
	var horse_races = horse.horse_races;

	document.getElementById("animate_"+color).style.width = "115px";
	document.getElementById("animate_"+color).style.height = "115px";
	info_html =
		"<p class=title>Informazioni sul Cavallo</p>"+
			"<table>"+
				"<tr>"+
					"<td><p> Id: </p></td>"+
					"<td><p>"+horse_id+"</p></td>"+
				"<tr>"+
					"<td><p> Name: </p></td>"+
					"<td><p>"+horse_name+"</p></td>"+
				"<tr>"+
					"<td><p> Age: </p></td>"+
					"<td><p>"+horse_age+"</p></td>"+
				"<tr>"+
					"<td><p> Colour: </p></td>"+
					"<td><p>"+color+"</p></td>"+
				"<tr>"+
					"<td><p> Vittorie: </p></td>"+
					"<td><p>"+horse_wins+"/"+horse_races+"</p></td>"+
			"</table><br>"
	
	document.getElementById("classifica").style.display = 'none';	//hide classifica
	document.getElementById("infoCavallo").innerHTML = info_html;
}

function hideInfoHorse(e) {
	var color = e.target.id.split("_")[1];
	document.getElementById("animate_"+color).style.width = "100px";
	document.getElementById("animate_"+color).style.height = "100px";
	document.getElementById("infoCavallo").innerHTML = "";
	document.getElementById("classifica").style.display = 'block'; //make classifica visible again

	sessionStorage.removeItem("PetBetClassifica");
}
