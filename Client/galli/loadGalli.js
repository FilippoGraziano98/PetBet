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
							<tr>\
								<td class=gallo_hp>\
									<div class=gallo_hp_name id=gallo_red_hp_name><p class=text_on_wood id="gallo_red_HP_header"> Gallo Rosso </p></div>\
									<div class=gallo_hp_bar_container id="gallo_red_HP_container">\
										<div class=gallo_hp_bar id="gallo_red_HP_value"></div>\
										<div class=gallo_hp_percentage id="gallo_red_HP_percentage"></div>\
									</div>\
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
									<div class=gallo_hp_name id=gallo_blue_hp_name><p class=text_on_wood id="gallo_blue_HP_header"> Gallo Blu </p></div>\
								</td>\
						</table>\
					</div>\
					\
					<div class=gallo id="gallo_red"></div>\
					<div class=ko id="ko_red"></div>\
					<div class=winner id="winner_red"></div>\
					<div class=gallo id="gallo_blue"></div>\
					<div class=ko id="ko_blue"></div>\
					<div class=winner id="winner_blue"></div>\
					<div class=fight id="fight"></div>\
				</div>\
			</div>\
			<br>\
			<div id="galli_report"></div>\
			<div name="galli_bottom_area" id="galli_bottom_area" style="overflow-x:auto;">\
				<table>\
					<tr class=back>\
						<td class=bottom_area_data>\
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
						<td class=bottom_area_data>\
							<div name="galli_regolamento" id="galli_regolamento">\
								<br><p class=subtitle>Informazioni sul Gallo</p><br><br>\
								<table class=infoGallo>\
									<tr>\
										<td class=info_key><p> Nome: </p></td>\
										<td class=info_value><p> - </p></td>\
									<tr>\
										<td class=info_key><p> Età: </p></td>\
										<td class=info_value><p> - </p></td>\
									<tr>\
										<td class=info_key><p> Peso: </p></td>\
										<td class=info_value><p> - </p></td>\
									<tr>\
										<td class=info_key><p> Colore: </p></td>\
										<td class=info_value><p> - </p></td>\
									<tr>\
										<td class=info_key><p> Fattoria<br>di provenienza: </p></td>\
										<td class=info_value><p> - </p></td>\
									<tr>\
										<td class=info_key><p> Vittorie: </p></td>\
										<td class=info_value><p> - </p></td>\
								</table><br>\
							</div>\
							<div name="infoGallo" id="infoGallo"></div>\
						</td>\
					<tr class=back>\
						<td colspan=2>\
							<div name="simulaGame" id="galli_simulaGame">\
								<p class=report_font>Vuoi simulare una lotta senza scommettere? </p>\
								<button class=small_button id=simula_fight onclick="simulaFight()"><p>SIMULA</p></button>\
								<br>\
							</div>\
							<div name="timerEndGame" id="galli_timerEndGame"></div>\
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
	
	if( ! localStorage.getItem("PetBet - Galli") ){
		var galli = [
				{"id":1, "name":"Gonzalo", "age":"10 mesi", "peso":"2 kg", "fattoria":"Minnesota", "wins":0, "races":0},
				{"id":2, "name":"Carlos", "age":"12 mesi", "peso":"2 kg", "fattoria":"Kentucky", "wins":0, "races":0},
				{"id":3, "name":"Rodrigo", "age":"11 mesi", "peso":"2.5 kg", "fattoria":"Texas", "wins":0, "races":0},
				{"id":4, "name":"José", "age":"13 mesi", "peso":"3 kg", "fattoria":"Utah", "wins":0, "races":0},
				{"id":5, "name":"Ràmon", "age":"14 mesi", "peso":"2.5 kg", "fattoria":"Virginia", "wins":0, "races":0},
				{"id":6, "name":"Cesar", "age":"16 mesi", "peso":"2.5 kg", "fattoria":"Arizona", "wins":0, "races":0},
				{"id":7, "name":"Pablo", "age":"10 mesi", "peso":"2 kg", "fattoria":"Alabama", "wins":0, "races":0},
				{"id":8, "name":"Alonso", "age":"9 mesi", "peso":"1.5 kg", "fattoria":"Illinois", "wins":0, "races":0},
				{"id":9, "name":"Panchito", "age":"8 mesi", "peso":"1.5 kg", "fattoria":"Kansas", "wins":0, "races":0},
				{"id":10, "name":"Carmelo", "age":"7 mesi", "peso":"1 kg", "fattoria":"Nevada", "wins":0, "races":0}
			]

		localStorage.setItem("PetBet - Galli", JSON.stringify(galli));
	}
	
	var galli_id = ['gallo_red','gallo_blue'];
	for (var i = 0; i < galli_id.length; i++) {
		document.getElementById(galli_id[i]).addEventListener("mouseenter", showInfoGallo_handler, false);
		document.getElementById(galli_id[i]).addEventListener("click", showInfoGallo_handler, false);
		document.getElementById(galli_id[i]).addEventListener("mouseout", hideInfoGallo_handler, false);
		//metto i Listener anche sulle barre della vita (altrimenti durante la lotta non si ha modo di accedere alle info del gallo)
		document.getElementById(galli_id[i]+"_hp_name").addEventListener("mouseenter", showInfoGallo_handler, false);
		document.getElementById(galli_id[i]+"_hp_name").addEventListener("click", showInfoGallo_handler, false);
		document.getElementById(galli_id[i]+"_hp_name").addEventListener("mouseout", hideInfoGallo_handler, false);
		document.getElementById(galli_id[i]+"_HP_container").addEventListener("mouseenter", showInfoGallo_handler, false);
		document.getElementById(galli_id[i]+"_HP_container").addEventListener("click", showInfoGallo_handler, false);
		document.getElementById(galli_id[i]+"_HP_container").addEventListener("mouseout", hideInfoGallo_handler, false);
		document.getElementById(galli_id[i]+"_HP_value").addEventListener("mouseenter", showInfoGallo_handler, false);
		document.getElementById(galli_id[i]+"_HP_value").addEventListener("click", showInfoGallo_handler, false);
		document.getElementById(galli_id[i]+"_HP_value").addEventListener("mouseout", hideInfoGallo_handler, false);
		document.getElementById(galli_id[i]+"_HP_percentage").addEventListener("mouseenter", showInfoGallo_handler, false);
		document.getElementById(galli_id[i]+"_HP_percentage").addEventListener("click", showInfoGallo_handler, false);
		document.getElementById(galli_id[i]+"_HP_percentage").addEventListener("mouseout", hideInfoGallo_handler, false);
		//e anche sui div di KO e coriandoli (altrimenti a fine lotta non posso più accedere alle info)
		document.getElementById("ko_"+galli_id[i].split("_")[1]).addEventListener("mouseenter", showInfoGallo_handler, false);
		document.getElementById("ko_"+galli_id[i].split("_")[1]).addEventListener("click", showInfoGallo_handler, false);
		document.getElementById("ko_"+galli_id[i].split("_")[1]).addEventListener("mouseout", hideInfoGallo_handler, false);
		document.getElementById("winner_"+galli_id[i].split("_")[1]).addEventListener("mouseenter", showInfoGallo_handler, false);
		document.getElementById("winner_"+galli_id[i].split("_")[1]).addEventListener("click", showInfoGallo_handler, false);
		document.getElementById("winner_"+galli_id[i].split("_")[1]).addEventListener("mouseout", hideInfoGallo_handler, false);
	}
	
	document.getElementById("scommetti").removeEventListener("click", ufficialize_cavalli_bet);
	document.getElementById("scommetti").addEventListener("click", ufficialize_galli_bet);
	
	//easter egg
	var cookie=getCookies();
	if(cookie && getNameFromCookie(cookie) == "Filippo") {
		var rooster_club = "\
			<br><p class=subtitle>Regolamento del Rooster Club:</p><br><br>\
			<table class=regolamento>\
				<tr>\
					<td class=info_key><p>Prima regola:</p></td>\
					<td class=info_value><p>non parlare mai del Rooster Club.</p></td>\
				<tr>\
					<td class=info_key><p>Seconda regola:</p></td>\
					<td class=info_value><p>non dovete parlare mai del Fight Club.</p></td>\
				<tr>\
					<td class=info_key><p>Terza regola:</p></td>\
					<td class=info_value><p>se un gallo si accascia, è spompato, grida basta, fine del combattimento.</p></td>\
				<tr>\
					<td class=info_key><p>Quarta regola:</p></td>\
					<td class=info_value><p>si combatte solo due per volta.</p></td>\
				<tr>\
					<td class=info_key><p>Quinta regola:</p></td>\
					<td class=info_value><p>un combattimento alla volta.</p></td>\
				<tr>\
					<td class=info_key><p>Sesta regola:</p></td>\
					<td class=info_value><p>niente camicia, niente scarpe.</p></td>\
				<tr>\
					<td class=info_key><p>Settima regola:</p></td>\
					<td class=info_value><p>i combattimenti durano per tutto il tempo necessario.</p></td>\
				<tr>\
					<td class=info_key><p>Ottava ed ultima regola:</p></td>\
					<td class=info_value><p>se questa è la vostra prima sera al Rooster Club, dovete scommettere.</p></td>\
			</table>\
			"
			
			var elems = document.getElementsByClassName('bottom_area_data');
			for (var i = 0; i < elems.length; i++) {
				elems[i].style.height="470px";
			}
			document.getElementById("galli_regolamento").innerHTML = rooster_club;
	}
	
	fight_prepare();
}
