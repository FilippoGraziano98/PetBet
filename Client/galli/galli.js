var RING_WIDTH = 1024;
var GALLO_WIDTH = 250;
var DIST_BORDER = 5; //distance from border
var MIN_HEALTH = 800;
var MAX_HEALTH = 1000;
var MIN_STRENGTH = 50;
var MAX_STRENGTH = 100;
var accelleration_factor = 4;

class gallo {
	constructor(gallo, horizontal){
			//vertical & horizontal parameter are given from bottom-left angle (as in carthesian plane)
		this.gallo_html = gallo;											//references the div containing the gallo
		this.ko_html = document.getElementById("ko_"+this.gallo_html.id.split("_")[1]);
		this.ko_html.style.display = "none";
		this.right = RING_WIDTH-GALLO_WIDTH-horizontal;		//distance of the div from the right border
		this.left = horizontal;												//distance of the div from the left border
		this.ko_top = 0;
		this.HEALTH_START = MIN_HEALTH+Math.floor(Math.random()*(MAX_HEALTH-MIN_HEALTH));	//inizializzo la vita con un valore random tra 0 e 1000
		this.health = this.HEALTH_START/accelleration_factor;//qui memorizzo la vita attuale
		this.strength= MIN_STRENGTH+Math.floor(Math.random()*(MAX_STRENGTH-MIN_STRENGTH));//fisso la forza del gallo a un valore tra 0 e 100
		this.isDead = false;
		console.log(this);
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
	dead(){
		this.gallo_html.style.display = "none";
		this.ko_html.style.display = "block";
		var ko_down_timer = setInterval(ko_down(this), 1);
		function ko_down(dead_gallo) {
			if (dead_gallo.ko_top > 150) {
				clearInterval(ko_down_timer);
			} else {
				dead_gallo.ko_top++;
				dead_gallo.ko_html.style.top = dead_gallo.ko_top+'px';
			}
		}
	}
}

//list of galli, global to all js (setted in populate_galli, called from loadGalli)
var GALLI_LIST = {
	populate_galli : function() {
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
	}
}


