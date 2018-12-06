var RING_SIZE = 800;
var GALLO_SIZE = 125;
var DIST_BORDER = 150; //distance from border
var MAX_HEALTH = 1000;

class gallo {
	constructor(gallo, vertical, horizontal){
			//vertical & horizontal parameter are given from bottom-left angle (as in carthesian plane)
		this.gallo_html = gallo;											//references the div containing the gallo
		this.top = RING_SIZE-GALLO_SIZE-vertical;				//distance of the div from the top border
		this.bottom = vertical;													//distance of the div from the bottom border
		this.right = RING_SIZE-GALLO_SIZE-horizontal;		//distance of the div from the right border
		this.left = horizontal;												//distance of the div from the left border
		this.HEALTH_START = MAX_HEALTH;
		this.health = MAX_HEALTH;
	}
	move(vertical, horizontal){
		//vertical 		{>0 => up, 0 => nomove, <0 => down}
		//horizontal	{>0 => right, 0 => nomove, <0 => left}
		this.top -= vertical;
		this.bottom += vertical;
		this.right -= horizontal;
		this.left += horizontal;

		assert(	this.top + this.bottom + GALLO_SIZE == RING_SIZE && 
					this.right + this.left + GALLO_SIZE == RING_SIZE, 
					"Position values of gallo "+this.gallo_html.id+" exceeds size of container image");
	//	console.log(gallo.id+" -> "+
	//							"top:"+gallo.top+","+
	//							"bottom:"+gallo.bottom+","+
	//							"right:"+gallo.right+","+
	//							"left:"+gallo.left)
		this.gallo_html.style.top = this.top + 'px';
		this.gallo_html.style.right = this.right + 'px';
		this.gallo_html.style.bottom = this.bottom + 'px';
		this.gallo_html.style.left = this.left+ 'px';
	}
	fight_getDamage(){
		this.health -= Math.floor(Math.random()*2);
	}
}

//list of galli, global to all js (setted in populate_galli, called from loadGalli)
var GALLI_LIST = {
	populate_galli : function() {
    this.red = new gallo(document.getElementById("gallo_red"),
								RING_SIZE-GALLO_SIZE-DIST_BORDER,
								DIST_BORDER
								);
    this.blue = new gallo(document.getElementById("gallo_blue"),
								RING_SIZE-GALLO_SIZE-DIST_BORDER,
								RING_SIZE-GALLO_SIZE-DIST_BORDER
								);
    this.yellow = new gallo(document.getElementById("gallo_yellow"),
								DIST_BORDER,
								RING_SIZE-GALLO_SIZE-DIST_BORDER
								);
		this.green = new gallo(document.getElementById("gallo_green"),
								DIST_BORDER,
								DIST_BORDER
								);
	},
	move_galli_to_the_center : function() {
		GALLI_LIST.red.move(-1, +1);
		GALLI_LIST.blue.move(-1, -1);
		GALLI_LIST.yellow.move(+1, -1);
		GALLI_LIST.green.move(+1, +1);
	},
	move_galli_to_the_angles : function() {
		GALLI_LIST.red.move(+1, -1);
		GALLI_LIST.blue.move(+1, +1);
		GALLI_LIST.yellow.move(-1, +1);
		GALLI_LIST.green.move(-1, -1);
	}
}


