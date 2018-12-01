var rank_classifica = 0;
var start_timer = Date.now();

function prepareClassifica(){
	rank_classifica = 0;
	start_timer = Date.now();
	
	var classifica_html =
		'<p class=title>Classifica:</p>\
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
}
