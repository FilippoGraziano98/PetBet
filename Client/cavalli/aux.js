function color_eng2it(color){
	var color_it = "";
	switch (color){
		case "red":
			color_it = "rosso";
			break;
		case "blue":
			color_it = "blu";
			break;
		case "green":
			color_it = "verde";
			break;
		case "yellow":
			color_it = "giallo";
			break;
		case "white":
			color_it = "bianco";
			break;
	}
	return color_it;
}
