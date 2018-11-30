var rank_classifica = 1;
var start_timer = Date.now();

function prepareClassifica(){
	rank_classifica = 1;
	start_timer = Date.now();
	
	var classifica_html =
		'<p class=title>Classifica:</p>\
			<table>'
	for(var i=1; i<6; i++){
		classifica_html =
			classifica_html+
				'<tr id='+i+'>\
					<td class=pos><p>'+i+'</p></td>\
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
	document.getElementById(rank_classifica).innerHTML = 
			"<td class=pos><p class=horse id='"+horse_colour+"'>"+rank_classifica+"</p></td>"+
			"<td class=horse><p class=horse id='"+horse_colour+"'>"+document.getElementById("animate_"+horse_colour).horse_name+"</p></td>"+
			"<td class=time><p class=time>"+finish_time+"</p></td><br>"
	rank_classifica++;
}
