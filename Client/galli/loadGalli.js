var galli_html = '\
		<link rel=stylesheet type="text/css" href="galli/galli.css">\
		<div id=main_div_galli>\
			<br>\
			<div id=header_div><p class=title>Lotta Tra Galli</p></div>\
			<br>\
			<div class=background name="backGalli" id="backGalli">\
				<div class=field name="battle_field" id ="battle_field">\
					<br>\
					<div class=galli_lifes name="galli_lifes" id="galli_lifes">\
						<table>\
							<tr class=no_colour>\
								<td class=gallo_hp>\
									<p class=text_on_wood id="gallo_red_HP_header"> Gallo Rosso </p>\
									<div class=gallo_hp_bar_container id="gallo_red_HP_container">\
										<div class=gallo_hp_bar id="gallo_red_HP_value"></div>\
										<div class=gallo_hp_percentage id="gallo_red_HP_percentage"></div>\
								</td>\
								<td class=timer>\
									<p class=text_on_wood id="round_number">ROUND 0</p><br>\
									<p class=text_on_wood id="timer">--.--</p>\
								</td>\
								<td class=gallo_hp>\
									<div class=gallo_hp_bar_container id="gallo_blue_HP_container">\
										<div class=gallo_hp_bar id="gallo_blue_HP_value"></div>\
										<div class=gallo_hp_percentage id="gallo_blue_HP_percentage"></div>\
									</div>\
									<p class=text_on_wood id="gallo_blue_HP_header"> Gallo Blu </p>\
								</td>\
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
			<br>\
			<div id="galli_report"></div>\
			<br>\
			<div name="galli_bottom_area" id="galli_bottom_area" style="overflow-x:auto;">\
				<table>\
					<tr class=no_colour>\
						<td>\
							<div name="quote" id="quote">\
								<table class=quote>\
									<th colspan=2>\
										<br><p class=header_font_quote>Scegli su chi vuoi scommettere:</p><br><br>\
									</th>\
									<tr>\
										<td><p class=quota_gallo_nome name="gallo_red_quota_nome" id="gallo_red_quota_nome"> Gallo Rosso </p></td>\
										<td><button class=quota_gallo_button name="gallo_red_quota_button" id="gallo_red_quota_button" onclick="bet_on_handler(this)">???</button></td>\
									<tr>\
										<td><p class=quota_gallo_nome name="gallo_blue_quota_nome" id="gallo_blue_quota_nome"> Gallo Blu </p></td>\
										<td><button class=quota_gallo_button name="gallo_blue_quota_button" id="gallo_blue_quota_button" onclick="bet_on_handler(this)">???</button></td>\
								</table>\
							</div>\
						</td>\
						<td>\
							<div name="timerEndGame" id="galli_timerEndGame"></div>\
							<div name="infoGallo" id="infoGallo">STUFF</div>\
						</td>\
				</table>\
				<br>\
			</div>\
		</div>\
		<br><br>\
		'

function loadGalli(){
	var url_string = window.location.href;
	var url_base = url_string.split("?")[0];
	var update_url = url_base+"?bet_on=galli"
	if(update_url.includes("index.html")){
		history.pushState(null, null, update_url);
	}
	
	document.getElementById("dynamic_area").style.background = "var(--no-colour)";
	document.getElementById("dynamic_area").innerHTML = galli_html;
	
	document.getElementById("scommetti").removeEventListener("click", ufficialize_cavalli_bet);
	document.getElementById("scommetti").addEventListener("click", ufficialize_galli_bet);
	
	fight_prepare();
}
