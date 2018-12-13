var galli_html = '\
		<link rel=stylesheet type="text/css" href="galli/galli.css">\
		<div id=header_div><p class=title>Lotta Tra Galli</p></div>\
		<br>\
		<div class=background name="backGalli" id="backGalli">\
			<div class=field name="battle_field" id ="battle_field">\
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
								<p id="round_number">ROUND 0</p><br>\
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
				\
				<div class=gallo id="gallo_red"></div>\
				<div class=ko id="ko_red"></div>\
				<div class=winner id="winner_red"></div>\
				<div class=gallo id="gallo_blue"></div>\
				<div class=ko id="ko_blue"></div>\
				<div class=winner id="winner_blue"></div>\
				<div class=fight id="fight"></div>\
				<br>\
			</div>\
		</div>\
		<div name="quote" id="quote">\
			<table>\
				<tr>\
					<td class=quote>\
						<br><br>\
					</td>\
				<tr>\
					<td><p class=quota_gallo_nome name="quota_nome_red" id="quota_nome_red"> Gallo Rosso </p></td>\
					<td><button class=quota_gallo_button name="redbutton" id="redbutton" onclick="start_round()">???</button></td>\
					\
					<td><p>Scegli su chi vuoi scommettere:</p></td>\
					\
					<td><button class=quota_gallo_button name="bluebutton" id="bluebutton" onclick="start_round()">???</button></td>\
					<td><p class=quota_gallo_nome name="quota_nome_blue" id="quota_nome_blue"> Gallo Blu </p></td>\
			</table>\
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
