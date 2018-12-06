var galli_html = '\
		<link rel=stylesheet type="text/css" href="galli/galli.css">\
		<div>\
			<br>\
			<table>\
			<tr>\
				<td>\
					<p class=title>Lotta Tra Galli</p>\
					<br><br>\
					<div class=galli_lifes name="galli_lifes" id="galli_lifes">\
						<table>\
							<tr>\
								<td class=gallo_hp_header><p id="gallo_red_HP_header"></p></td>\
								<td class=gallo_hp_value>\
									<div style="background-color: var(--no-colour); border-style: solid; width:100px; height: 18px; position: relative;">\
										<div class=gallo_hp_bar id="gallo_red_HP_value"></div>\
								</td>\
							<tr>\
								<td class=gallo_hp_header><p id="gallo_blue_HP_header"></p></td>\
								<td class=gallo_hp_value>\
									<div style="background-color: var(--no-colour);border-style: solid; width:100px; height: 18px; position: relative;">\
										<div class=gallo_hp_bar id="gallo_blue_HP_value"></div>\
									</div>\
								</td>\
							<tr>\
								<td class=gallo_hp_header><p id="gallo_yellow_HP_header"></p></td>\
								<td class=gallo_hp_value>\
									<div style="background-color: var(--no-colour);border-style: solid; width:100px; height: 18px; position: relative;">\
										<div class=gallo_hp_bar id="gallo_yellow_HP_value"></div>\
									</div>\
								</td>\
							<tr>\
								<td class=gallo_hp_header><p id="gallo_green_HP_header"></p></td>\
								<td class=gallo_hp_value>\
									<div style="background-color: var(--no-colour);border-style: solid; width:100px; height: 18px; position: relative;">\
										<div class=gallo_hp_bar id="gallo_green_HP_value"></div>\
									</div>\
								</td>\
						</table>\
					</div>\
					<br>\
					<div class=timer name="timer" id="timer"></div>\
					<br>\
					<button class=button name="fight_btn" id="fight_btn" onclick="fight_start()">Fight</button>\
				</td>\
				<td>\
					<div class=field name="container" id ="container">\
						<div class=gallo id="gallo_red"></div>\
						<div class=gallo id="gallo_blue"></div>\
						<div class=gallo id="gallo_yellow"></div>\
						<div class=gallo id="gallo_green"></div>\
						<div class=fight id="fight"></div>\
					</div>\
				</td>\
			</table>\
		</div>\
		'

function loadGalli(){
	document.getElementById("dynamic_area").innerHTML = galli_html;
	GALLI_LIST.populate_galli();
}
