function showInfoGallo_handler(e) {
	var obj_id = event.target.id;

	var col = obj_id.split("_")[1];
	showInfoGallo("gallo_"+col);
}

function showInfoGallo(gallo_id) { //gallo_red, gallo_blue
	var color = gallo_id.split("_")[1];
	
	var gallo_obj = GALLI_LIST[color];
	
	var gallo_id = gallo_obj.gallo_info_id; //unused
	var gallo_name = gallo_obj.gallo_info_name;
	var gallo_age = gallo_obj.gallo_info_age;
	var gallo_peso = gallo_obj.gallo_info_peso;
	var gallo_fattoria = gallo_obj.gallo_info_fattoria;
	var gallo_wins = gallo_obj.gallo_info_wins;
	var gallo_races = gallo_obj.gallo_info_races;
	
	var info_html = 
		"<br><p class=subtitle>Informazioni sul Gallo</p><br><br>"+
				"<table class=infoGallo>"+
				//"<tr>"+
				//	"<td><p> Id: </p></td>"+
				//	"<td><p>"+gallo_id+"</p></td>"+
					"<tr>"+
						"<td class=info_key><p> Nome: </p></td>"+
						"<td class=info_value><p>"+gallo_name+"</p></td>"+
					"<tr>"+
						"<td class=info_key><p> Età: </p></td>"+
						"<td class=info_value><p>"+gallo_age+"</p></td>"+
					"<tr>"+
						"<td class=info_key><p> Peso: </p></td>"+
						"<td class=info_value><p>"+gallo_peso+"</p></td>"+
					"<tr>"+
						"<td class=info_key><p> Colore: </p></td>"+
						"<td class=info_value><p>"+color_eng2it(color)+"</p></td>"+
					"<tr>"+
						"<td class=info_key><p> Fattoria<br>di provenienza: </p></td>"+
						"<td class=info_value><p>"+gallo_fattoria+"</p></td>"+
					"<tr>"+
						"<td class=info_key><p> Vittorie: </p></td>"+
						"<td class=info_value><p>"+gallo_wins+"/"+gallo_races+"</p></td>"+
				"</table><br>"
	
	document.getElementById("infoGallo").innerHTML = info_html;
	document.getElementById("galli_regolamento").style.display = "none";
	document.getElementById("infoGallo").style.display = "block";
	
}

function hideInfoGallo(e) {
	document.getElementById("infoGallo").style.display = "none";
	document.getElementById("galli_regolamento").style.display = "block";
	document.getElementById("infoGallo").innerHTML = "";
}
