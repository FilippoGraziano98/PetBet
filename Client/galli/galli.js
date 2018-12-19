var RING_WIDTH = 1300;
var GALLO_WIDTH = 250;
var DIST_BORDER = 75; //distance from border
var HP_BAR_WIDTH = 300;

var BASE_HEALTH = 900;
var MAX_HEALTH = 1000;
var BASE_STRENGTH = 90;
var MAX_STRENGTH = 100;

var MIN_QUOTA = 1;
var MAX_QUOTA = 4.5;

var GALLI_DATABASE = JSON.parse(localStorage.getItem("PetBet - Galli")); //JSON contenente la lista di tutti e 10 i galli
var chosen_galli = []; //lista contenente gli indici di galli già scelti dal database

var accelleration_factor = 4;

class gallo {
	constructor(gallo, horizontal){
			//vertical & horizontal parameter are given from bottom-left angle (as in carthesian plane)
		this.gallo_html = gallo;											//references the div containing the gallo
		this.gallo_html.style.display = "block";
		this.ko_html = document.getElementById("ko_"+this.gallo_html.id.split("_")[1]);
		this.ko_html.style.display = "none";
		this.winner_html = document.getElementById("winner_"+this.gallo_html.id.split("_")[1]);
		this.winner_html.style.display = "none";
		document.getElementById(this.gallo_html.id+"_HP_value").style['background-color'] = "var(--forest-green)";
		this.right = RING_WIDTH-GALLO_WIDTH-horizontal;		//distance of the div from the right border
		this.left = horizontal;												//distance of the div from the left border
		this.ko_top = 325;
		this.ko_border = 250;
		this.ko_size = 0;
		this.winner_height = 0;
		
		this.set_anagraphic_info();
		
		//per la salute conta più l'età
		var health_age_decrease_component = Math.abs((10-parseInt(String(this.gallo_info_age).split(" "))))*20;
		var health_peso_decrease_component = Math.abs((2-parseFloat(String(this.gallo_info_peso).split(" "))))*2*10;
		this.HEALTH_START = BASE_HEALTH-health_age_decrease_component-health_peso_decrease_component+Math.floor(Math.random()*(MAX_HEALTH-BASE_HEALTH));	//inizializzo la vita con un valore random tra 0 e 1000
		this.health = this.HEALTH_START;//qui memorizzo la vita attuale
		
		//per la forza conta più il peso
		var strength_age_decrease_component = Math.floor(Math.abs((10-parseInt(String(this.gallo_info_age).split(" "))))*2.5);
		var strength_peso_decrease_component = Math.abs((2-parseFloat(String(this.gallo_info_peso).split(" "))))*2*5;
		this.strength = BASE_STRENGTH-strength_age_decrease_component-strength_peso_decrease_component+Math.floor(Math.random()*(MAX_STRENGTH-BASE_STRENGTH));//fisso la forza del gallo a un valore tra 0 e 100
		
		this.quota = MAX_QUOTA+Math.random()*0.3-Math.random()*(this.HEALTH_START/MAX_HEALTH)-Math.random()*2*(this.strength/MAX_STRENGTH);
		this.isDead = false;
		console.log(this);
	}
	set_anagraphic_info(){
		var idx;
		do {
			idx = Math.floor(Math.random()*GALLI_DATABASE.length);
		} while( chosen_galli.includes(idx) );
		var gallo_info = GALLI_DATABASE[idx];
		chosen_galli.push(idx);
		console.log(gallo_info);
		
		this.gallo_info_id = gallo_info['id'];
		this.gallo_info_name = gallo_info['name'];
		this.gallo_info_age = gallo_info['age'];
		this.gallo_info_peso = gallo_info['peso'];
		this.gallo_info_fattoria = gallo_info['fattoria'];
		this.gallo_info_wins = gallo_info['wins'];
		this.gallo_info_races = gallo_info['races'];
	}
	move(horizontal){
		//horizontal	{>0 => right, 0 => nomove, <0 => left}
		this.right -= horizontal;
		this.left += horizontal;

		assert(this.right + this.left + GALLO_WIDTH == RING_WIDTH, 
					"Position values of gallo "+this.gallo_html.id+" exceeds size of container image");
	//	console.log(gallo.id+" -> "+
	//							"top:"+gallo.top+","+
	//							"bottom:"+gallo.bottom+","+
	//							"right:"+gallo.right+","+
	//							"left:"+gallo.left)
		this.gallo_html.style.right = this.right + 'px';
		this.gallo_html.style.left = this.left + 'px';
	}

	fight_getDamage(){
		var damage = Math.floor(Math.random()*MAX_STRENGTH/this.strength)*accelleration_factor;
		//console.log(this.gallo_html.id+" -> "+damage)
		this.health -= damage;
		if(this.health*100/this.HEALTH_START > 75){
			document.getElementById(this.gallo_html.id+"_HP_value").style['background-color'] = "var(--forest-green)";
		} else if(this.health*100/this.HEALTH_START > 50) {
			document.getElementById(this.gallo_html.id+"_HP_value").style['background-color'] = "var(--yellow)";
		} else if(this.health*100/this.HEALTH_START > 25) {
			document.getElementById(this.gallo_html.id+"_HP_value").style['background-color'] = "var(--dark-orange)";
		} else {
			document.getElementById(this.gallo_html.id+"_HP_value").style['background-color'] = "var(--dark-red)";
		}
		if(this.health <= 0){
			this.health = 0; //not to get hegative health
			this.isDead = true;
		} else {
			this.isDead = false;
		}
	}
}

//list of galli, global to all js (setted in populate_galli, called from loadGalli)
var GALLI_LIST = {
	populate_galli : function() {
		chosen_galli = [];//reset lista degli indici dei galli scelti
    this.red = new gallo(document.getElementById("gallo_red"),DIST_BORDER);
    this.blue = new gallo(document.getElementById("gallo_blue"),RING_WIDTH-GALLO_WIDTH-DIST_BORDER);
	},
	rotate_galli : function() {
		GALLI_LIST.red.gallo_html.style.transform = "rotate(10deg)";
		GALLI_LIST.blue.gallo_html.style.transform = "rotate(-10deg)";
	},
	reset_rotation : function() {
		GALLI_LIST.red.gallo_html.style.transform = "rotate(0deg)";
		GALLI_LIST.blue.gallo_html.style.transform = "rotate(0deg)";
	},
	move_galli_to_the_center : function() {
		GALLI_LIST.red.move(+2);
		GALLI_LIST.blue.move(-2);
	},
	move_galli_to_the_angles : function() {
		GALLI_LIST.red.move(-2);
		GALLI_LIST.blue.move(+2);
	}, 
	dead(){
		for(var g in GALLI_LIST){
			if(GALLI_LIST[g] instanceof gallo){
				if( GALLI_LIST[g].isDead ){
					GALLI_LIST[g].gallo_html.style.display = "none";
					GALLI_LIST[g].ko_html.style.display = "block";
				}
			}
		}
		var ko_down_timer = setInterval(zoom_out, 10);
		function zoom_out() {
			for(var g in GALLI_LIST){
				if(GALLI_LIST[g] instanceof gallo){
					if(GALLI_LIST[g].isDead){
						if (GALLI_LIST[g].ko_size >= 200) {
							clearInterval(ko_down_timer);
						} else {
							GALLI_LIST[g].ko_size += 4;
							GALLI_LIST[g].ko_html.style.height = GALLI_LIST[g].ko_size+'px';
							GALLI_LIST[g].ko_html.style.width = Math.floor(GALLI_LIST[g].ko_size*5/4)+'px';
							GALLI_LIST[g].ko_top -= 2;
							GALLI_LIST[g].ko_html.style.top = GALLI_LIST[g].ko_top+'px';
							GALLI_LIST[g].ko_border -= 2.5;
							if(GALLI_LIST[g].gallo_html.id == "gallo_red") {
								GALLI_LIST[g].ko_html.style.left = GALLI_LIST[g].ko_border+'px';
							} else {
								GALLI_LIST[g].ko_html.style.right = GALLI_LIST[g].ko_border+'px';
							}
						}
					}
				}
			}
		}
	},
	celebrate_winner() {		
		var winning_gallo_id = null;
		var winning_gallo_obj = null;
		var loser_gallo_obj = null;
		for(var g in GALLI_LIST){
			if(GALLI_LIST[g] instanceof gallo){
				if(!GALLI_LIST[g].isDead){
					winning_gallo_obj = GALLI_LIST[g];
					winning_gallo_id = GALLI_LIST[g].gallo_html.id;
				} else {
					loser_gallo_obj = GALLI_LIST[g];
				}
			}
		}
		
		winning_gallo_obj.winner_html.style.display = "block";
		
		var gallo_bet_on = sessionStorage.getItem("Gallo-bet_on");
		if( gallo_bet_on.includes("simulazione") ){
			var winning_gallo_name="";
				switch(winning_gallo_id) {
					case "gallo_red":
						winning_gallo_name="Gallo Rosso";
						break;
					case "gallo_blue":
						winning_gallo_name="Gallo Blue";
						break;
					default:
						winning_gallo_name=winning_gallo_id;
						break;
				}
				document.getElementById("galli_report").innerHTML =
					"<p class=report_font> Ha vinto </p>"+
					"<p class=scommessa_gallo_nome id="+winning_gallo_id+"_scommessa_nome>"+winning_gallo_name+"</p>";
		}
		winning_gallo_obj.gallo_info_wins++;
		winning_gallo_obj.gallo_info_races++;
		loser_gallo_obj.gallo_info_races++;
	},
	update_galli_database() {
		for(var g in GALLI_LIST){
			if(GALLI_LIST[g] instanceof gallo){
				var gallo_obj = GALLI_LIST[g];
				var idx = gallo_obj.gallo_info_id;
				//sfrutto il fatto che gli id sono crescenti da 1 in poi, e univoci in GALLI_DATABASE
				GALLI_DATABASE[idx-1].wins = gallo_obj.gallo_info_wins;
				GALLI_DATABASE[idx-1].races = gallo_obj.gallo_info_races;
				localStorage.setItem("PetBet - Galli", JSON.stringify(GALLI_DATABASE));
			}
		}
	}
}


