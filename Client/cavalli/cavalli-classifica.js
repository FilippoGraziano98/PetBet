var rank_classifica = 0;
var start_timer = Date.now();

function prepareClassifica(){
	rank_classifica = 0;
	start_timer = Date.now();
	
	var classifica_html =
		'<p class=title>Classifica:</p><br><br>\
			<table>'
	for(var i=0; i<5; i++){
		classifica_html =
			classifica_html+
				'<tr id=classifica_pos_'+i+'>\
					<td class=pos><p>'+String(i+1)+'</p></td>\
					<td class=horse><p>-</p></td>\
					<td class=time><p>--.---</p></td>'
	}
	classifica_html =
		classifica_html+
			'</table><br>';
	
	document.getElementById("classifica").innerHTML = classifica_html;
}

function addToClassifica(horse_colour){
	document.getElementById("infoCavallo").style.display = "none";
	document.getElementById("classifica").style.display = "block";
	var finish_time = msToTime(Date.now() - start_timer);
	document.getElementById("classifica_pos_"+rank_classifica).innerHTML = 
		"<td class=pos><p class=horse id='"+horse_colour+"'>"+String(rank_classifica+1)+"</p></td>"+
		"<td class=horse><p class=horse id='"+horse_colour+"'>"+document.getElementById("animate_"+horse_colour).horse_name+"</p></td>"+
		"<td class=time><p class=time>"+finish_time+"</p></td><br>";
	//aggiorno dati cavallo (poi in endGame li salverò in memoria)
	if ( rank_classifica == 0 ) {
		document.getElementById("animate_"+horse_colour).horse_wins++;
	}
	document.getElementById("animate_"+horse_colour).horse_races++;
	rank_classifica++;
	if (rank_classifica == 1) {
		firstPlace(horse_colour);
	}
}

function firstPlace(horse_colour) {
	var button = sessionStorage.getItem("Cavallo-bet_on");
	if(!button.includes("simulazione")) {
		var chosen_horse = button.substring(0,button.length-6);
		if (chosen_horse == horse_colour) {
			writeWinnerMsg("COMPLIMENTI! IL TUO CAVALLO HA VINTO");
			comunicate_reward_to_server();
		} else {
			writeLoserMsg("IL TUO CAVALLO HA PERSO");
		}
	} else {
		var cavallo_obj = document.getElementById("animate_"+horse_colour);
		document.getElementById("cavalli_report").innerHTML =
			"<p class=report_font> Ha vinto </p>"+
			"<p class=scommessa_cavallo_nome id=cavallo_"+horse_colour+"_scommessa_nome>"+cavallo_obj.horse_name+"</p>";
	}
	sessionStorage.removeItem("Cavallo-bet_on");
}
