function showInfoHorse(e) {
	var classifica_html = document.getElementById("classifica").innerHTML.replace("<br><br><br><br>", "<br>");
	sessionStorage.setItem("PetBetClassifica", JSON.stringify(classifica_html));

	var color = e.target.id.split("_")[1];
	var horse = document.getElementById("animate_"+color);
	var horse_id = horse.horse_id;
	var horse_name = horse.horse_name;
	var horse_age = horse.horse_age;
	var horse_wins = horse.horse_wins;
	var horse_races = horse.horse_races;

	document.getElementById("style_horse_"+color).innerHTML = '#animate_'+color+' {width: 115px; height:115px;}';
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
	document.getElementById("classifica").innerHTML = info_html;
}

function hideInfoHorse(e) {
	var color = e.target.id.split("_")[1];
	document.getElementById("style_horse_"+color).innerHTML = "";
	classifica_html = JSON.parse(sessionStorage.getItem("PetBetClassifica"));
	if(classifica_html){
		document.getElementById("classifica").innerHTML = classifica_html;
	}
	sessionStorage.removeItem("PetBetClassifica");
}
