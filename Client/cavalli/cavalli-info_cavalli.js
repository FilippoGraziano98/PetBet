var permanent_info = false;

function showInfoHorse(e) {
	if(e.type == "click") {
		permanent_info = true;
	} else { //alternative is "mouseenter", as this is a common event handler
		permanent_info = false;
	}
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

	document.getElementById("animate_"+color).style.transform = "scale(1.20)";
	
	info_html =
		"<br><p class=subtitle>Informazioni sul Cavallo</p><br><br>"+
			"<table class=infoCavallo>"+
			//"<tr>"+
			//	"<td><p> Id: </p></td>"+
			//	"<td><p>"+horse_id+"</p></td>"+
				"<tr>"+
					"<td class=info_key><p> Nome: </p></td>"+
					"<td class=info_value><p>"+horse_name+"</p></td>"+
				"<tr>"+
					"<td class=info_key><p> Razza: </p></td>"+
					"<td class=info_value><p>"+horse_razza+"</p></td>"+
				"<tr>"+
					"<td class=info_key><p> Età: </p></td>"+
					"<td class=info_value><p>"+horse_age+"</p></td>"+
				"<tr>"+
					"<td class=info_key><p> Colore: </p></td>"+
					"<td class=info_value><p>"+color_eng2it(color)+"</p></td>"+
				"<tr>"+
					"<td class=info_key><p> Vittorie: </p></td>"+
					"<td class=info_value><p>"+horse_wins+"/"+horse_races+"</p></td>"+
				"<tr>"+
					"<td class=info_key><p> Cosa dicono<br>i bookmaker: </p></td>"+
					"<td class=info_value><p>"+commento+"</p></td>"+
			"</table><br>"
	
	document.getElementById("infoCavallo").innerHTML = info_html;
	document.getElementById("classifica").style.display = 'none';	//hide classifica
	document.getElementById("infoCavallo").style.display = 'block';
}

function hideInfoHorse(e) {
	var color = e.target.id.split("_")[1];
	document.getElementById("animate_"+color).style.transform = "";
	if(!permanent_info) {
		document.getElementById("infoCavallo").style.display = 'none';
		document.getElementById("classifica").style.display = 'block'; //make classifica visible again
		document.getElementById("infoCavallo").innerHTML = "";
	 }
}
