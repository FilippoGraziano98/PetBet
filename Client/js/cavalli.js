function msToTime(millisec_interval) {
  var milliseconds = parseInt((millisec_interval % 1000)),
    seconds = parseInt((millisec_interval / 1000) % 60),
    minutes = parseInt((millisec_interval / (1000 * 60)) % 60),
    hours = parseInt((millisec_interval / (1000 * 60 * 60)) % 24);

  if (hours > 0 || minutes > 0){
  	console.log("[ERROR], this shouldn't take hours or minutes lol")
  }

  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return seconds + "." + milliseconds;
}

function myMove() {
	document.getElementById("redbutton").disabled = true;
	document.getElementById("blubutton").disabled = true;
	document.getElementById("yellowbutton").disabled = true;
	document.getElementById("whitebutton").disabled = true;
	document.getElementById("greenbutton").disabled = true;
	
	var elem1 = document.getElementById("animate1");   
	var elem2 = document.getElementById("animate2");   
	var elem3 = document.getElementById("animate3");   
	var elem4 = document.getElementById("animate4");   
	var elem5 = document.getElementById("animate5");   
	   
	var pos1 = 0;
	var pos2 = 0;
	var pos3 = 0;
	var pos4 = 0;
	var pos5 = 0;
	
	document.getElementById("classifica").innerHTML = 
		"<p class=title>Corsa di Cavalli</p>" +
		"<p class=title>Classifica:</p><br>"
	var start_timer = Date.now();
	
	var id = setInterval(frame, 1);
	var pos = 1;
	
	function horseCuttingFinishLine(horse) {
		var finish_time = msToTime(Date.now() - start_timer);
		switch(horse) {
			case "red":
				document.getElementById("classifica").innerHTML = 
					document.getElementById("classifica").innerHTML +
					"<p class=horse id='red'>"+pos+" - Red Horse: </p><p class=time>"+finish_time+"</p><br>"
					pos++;
				break;
			case "blu":
				document.getElementById("classifica").innerHTML = 
					document.getElementById("classifica").innerHTML +
					"<p class=horse id='blu'>"+pos+" - Blu Horse: </p><p class=time>"+finish_time+"</p><br>"
					pos++;
				break;
			case "green":
				document.getElementById("classifica").innerHTML = 
					document.getElementById("classifica").innerHTML +
					"<p class=horse id='green'>"+pos+" - Green Horse: </p><p class=time>"+finish_time+"</p><br>"
					pos++;
				break;
			case "yellow":
				document.getElementById("classifica").innerHTML = 
					document.getElementById("classifica").innerHTML +
					"<p class=horse id='yellow'>"+pos+" - Yellow Horse: </p><p class=time>"+finish_time+"</p><br>"
					pos++;
				break;
			case "white":
				document.getElementById("classifica").innerHTML = 
					document.getElementById("classifica").innerHTML +
					"<p class=horse id='white'>"+pos+" - White Horse: </p><p class=time>"+finish_time+"</p><br>"
					pos++;
				break;
			default:
				//this is never supposed to happen
				alert("Error");
		}
	}
	
	function frame() {
		if (pos1 > 750 && pos2 > 750 && pos3 > 750 && pos4 > 750 && pos5 > 750) {
			clearInterval(id);
			document.getElementById("classifica").innerHTML = 
					document.getElementById("classifica").innerHTML + "<br>"
			document.getElementById("redbutton").disabled = false;
			document.getElementById("blubutton").disabled = false;
			document.getElementById("yellowbutton").disabled = false;
			document.getElementById("whitebutton").disabled = false;
			document.getElementById("greenbutton").disabled = false;
			
		} else {
			if(pos1 < 750) {
				pos1 = pos1 + Math.floor(Math.random()*1.3);  
				elem1.style.left = pos1 + 'px'; 
			} else if (pos1 == 750) { 
				horseCuttingFinishLine("red");
				pos1++;
			}
			if(pos2 < 750) {
				pos2 = pos2 + Math.floor(Math.random()*1.3);  
				elem2.style.left = pos2 + 'px';
			} else if (pos2 == 750){
				horseCuttingFinishLine("blu");
				pos2++;	
			}
			if(pos3 < 750) {
				pos3 = pos3 + Math.floor(Math.random()*1.3);  
				elem3.style.left = pos3 + 'px';
			} else if (pos3 == 750) {
				horseCuttingFinishLine("green");
				pos3++;
			}
			if(pos4 < 750) {
				pos4 = pos4 + Math.floor(Math.random()*1.3);  
				elem4.style.left = pos4 + 'px';
			} else if (pos4 == 750) {
				horseCuttingFinishLine("yellow");
				pos4++;
			}
			if(pos5 < 750) {
				pos5 = pos5 + Math.floor(Math.random()*1.3);  
				elem5.style.left = pos5 + 'px';
			} else if (pos5 == 750) {
				horseCuttingFinishLine("white");
				pos5++;
			}				
		}
	}
}
