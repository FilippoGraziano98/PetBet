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
								<td class=gallo_hp_header><p> Gallo Rosso HP:</p></td>\
								<td class=gallo_hp_value><p id="gallo_red_HP">100</p></td>\
							<tr>\
								<td class=gallo_hp_header><p> Gallo Blu HP:</p></td>\
								<td class=gallo_hp_value><p id="gallo_blue_HP">100</p></td>\
							<tr>\
								<td class=gallo_hp_header><p> Gallo Giallo HP:</p></td>\
								<td class=gallo_hp_value><p id="gallo_yellow_HP">100</p></td>\
							<tr>\
								<td class=gallo_hp_header><p> Gallo Verde HP:</p></td>\
								<td class=gallo_hp_value><p id="gallo_green_HP">100</p></td>\
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
