var galli_html = '\
		<link rel=stylesheet type="text/css" href="galli/galli.css">\
		<div id=header_div><p class=title>Lotta Tra Galli</p></div>\
		<br>\
		<div id=body_div>\
			<br>\
			<div class=galli_lifes name="galli_lifes" id="galli_lifes">\
				<table>\
					<tr>\
						<td class=gallo_hp_header><p id="gallo_red_HP_header"></p></td>\
						<td class=gallo_hp_value>\
							<div class=gallo_hp_bar_container id="gallo_red_HP_container">\
								<div class=gallo_hp_bar id="gallo_red_HP_value"></div>\
								<div class=gallo_hp_percentage id="gallo_red_HP_percentage"></div>\
						</td>\
						<td class=timer>\
							<div class=timer name="timer" id="timer"><p>--.--</p></div>\
						</td>\
						<td class=gallo_hp_value>\
							<div class=gallo_hp_bar_container id="gallo_blue_HP_container">\
								<div class=gallo_hp_bar id="gallo_blue_HP_value"></div>\
								<div class=gallo_hp_percentage id="gallo_blue_HP_percentage"></div>\
							</div>\
						</td>\
						<td class=gallo_hp_header><p id="gallo_blue_HP_header"></p></td>\
				</table>\
			</div>\
			<br>\
			<div class=field name="battle_field" id ="battle_field">\
				<div class=gallo id="gallo_red"></div>\
				<div class=ko id="ko_red"></div>\
				<div class=winner id="winner_red"></div>\
				<div class=gallo id="gallo_blue"></div>\
				<div class=ko id="ko_blue"></div>\
				<div class=winner id="winner_blue"></div>\
				<div class=fight id="fight"></div>\
			</div>\
			<br>\
			<button name="fight_btn" id="fight_btn" onclick="fight_start()">Fight</button>\
			<br><br>\
		</div>\
		'

function loadGalli(){
	document.getElementById("dynamic_area").innerHTML = galli_html;
	GALLI_LIST.populate_galli();

	//displaying list of fighting galli
	for(var g in GALLI_LIST){
		if(GALLI_LIST[g] instanceof gallo){
			document.getElementById(GALLI_LIST[g].gallo_html.id+"_HP_header").innerHTML = GALLI_LIST[g].gallo_html.id;
			document.getElementById(GALLI_LIST[g].gallo_html.id+"_HP_percentage").innerHTML = GALLI_LIST[g].health*100/GALLI_LIST[g].HEALTH_START + ' %';
			document.getElementById(GALLI_LIST[g].gallo_html.id+"_HP_value").style.width = Math.floor(GALLI_LIST[g].health*HP_BAR_WIDTH/GALLI_LIST[g].HEALTH_START)+'px';
		}
	}
}
