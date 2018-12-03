function msToTime(millisec_interval) {
  var milliseconds = parseInt((millisec_interval % 1000)),
    seconds = parseInt((millisec_interval / 1000) % 60),
    minutes = parseInt((millisec_interval / (1000 * 60)) % 60),
    hours = parseInt((millisec_interval / (1000 * 60 * 60)) % 24);

  if (hours > 0 || minutes > 0){
  	console.log("[ERROR], this shouldn't take hours or minutes lol")
  }

  seconds = (seconds < 10) ? "0" + seconds : seconds;
  console.log(String(milliseconds).length);
	milliseconds = String(milliseconds)+"0".repeat(3-String(milliseconds).length)

  return seconds + "." + milliseconds;
}

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
