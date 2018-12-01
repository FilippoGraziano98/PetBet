function showInfoHorse(e) {
	var color = e.target.id.split("_")[1];
	var horse = document.getElementById("animate_"+color);
	var horse_id = horse.horse_id;
	var horse_name = horse.horse_name;
	var horse_razza = horse.horse_razza;
	var horse_age = horse.horse_age;
	var horse_wins = horse.horse_wins;
	var horse_races = horse.horse_races;
	
	var commento = "";
	switch (horse_id) {
		case 1:
			commento = "Il più bel cavallo da corsa<br>di tutti i tempi";
			break;
		case 2:
		case 3:
			commento = "Fulmine";
			break;
		case 4:
		case 5:
			commento = "Campione affermato";
			break;
		case 6:
		case 7:
			commento = "Giovane campione";
			break;
		case 8:
		case 9:
		case 10:
			commento = "Vecchia gloria";
			break;
		case 11:
		case 12:
			commento = "Ronzino";
			break;
		default:
			commento = "Cavallo da Corsa";
	}

	document.getElementById("animate_"+color).style.width = "115px";
	document.getElementById("animate_"+color).style.height = "115px";
	info_html =
		"<p class=title>Informazioni sul Cavallo</p>"+
			"<table>"+
			//"<tr>"+
			//	"<td><p> Id: </p></td>"+
			//	"<td><p>"+horse_id+"</p></td>"+
				"<tr>"+
					"<td class=info_key><p> Name: </p></td>"+
					"<td class=info_value><p>"+horse_name+"</p></td>"+
				"<tr>"+
					"<td class=info_key><p> Razza: </p></td>"+
					"<td class=info_value><p>"+horse_razza+"</p></td>"+
				"<tr>"+
					"<td class=info_key><p> Age: </p></td>"+
					"<td class=info_value><p>"+horse_age+"</p></td>"+
				"<tr>"+
					"<td class=info_key><p> Colour: </p></td>"+
					"<td class=info_value><p>"+color+"</p></td>"+
				"<tr>"+
					"<td class=info_key><p> Vittorie: </p></td>"+
					"<td class=info_value><p>"+horse_wins+"/"+horse_races+"</p></td>"+
				"<tr>"+
					"<td class=info_key><p> Cosa dicono<br>i bookmaker: </p></td>"+
					"<td class=info_value><p>"+commento+"</p></td>"+
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
