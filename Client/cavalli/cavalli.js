function msToTime(millisec_interval) {
  var milliseconds = parseInt((millisec_interval % 1000) / 100),
    seconds = parseInt((millisec_interval / 1000) % 60),
    minutes = parseInt((millisec_interval / (1000 * 60)) % 60),
    hours = parseInt((millisec_interval / (1000 * 60 * 60)) % 24);

  if (hours > 0){
  	console.log("[ERROR], this shouldn't take hours lol")
  }

  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return minutes + ":" + seconds + "." + milliseconds;
}

function myMove() {
	document.getElementById("redbutton").disabled = true;
	document.getElementById("blubutton").disabled = true;
	document.getElementById("yellowbutton").disabled = true;
	document.getElementById("whitebutton").disabled = true;
	document.getElementById("greenbutton").disabled = true;
	document.getElementById("orangebutton").disabled = true;
	
	var elem1 = document.getElementById("animate1");   
	var elem2 = document.getElementById("animate2");   
	var elem3 = document.getElementById("animate3");   
	var elem4 = document.getElementById("animate4");   
	var elem5 = document.getElementById("animate5");   
	var elem6 = document.getElementById("animate6");
	   
	var pos1 = 0;
	var pos2 = 0;
	var pos3 = 0;
	var pos4 = 0;
	var pos5 = 0;
	var pos6 = 0;
	
	document.getElementById("classifica").innerHTML = 
		"<p class=title>Classifica:</p><br><br>"
	var start_timer = Date.now();
	
	var id = setInterval(frame, 1);
	
	function horseCuttingFinishLine(horse) {
		/*  sostituisci gli alert con quello che volevi fare tu,
		 	il tempo non sono riuscito a metterlo perchè la funzione alert non me lo faceva stampare,
		 	comunque puoi usare performance.now() (https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute)
		*/
		var finish_time = msToTime(Date.now() - start_timer);
		switch(horse) {
			case "red":
				document.getElementById("classifica").innerHTML = 
					document.getElementById("classifica").innerHTML +
					"<p class=horse id='red'>Red Horse: </p><p class=time>"+finish_time+"</p><br>"
				break;
			case "blu":
				document.getElementById("classifica").innerHTML = 
					document.getElementById("classifica").innerHTML +
					"<p class=horse id='blu'>Blu Horse: </p><p class=time>"+finish_time+"</p><br>"
				break;
			case "green":
				document.getElementById("classifica").innerHTML = 
					document.getElementById("classifica").innerHTML +
					"<p class=horse id='green'>Green Horse: </p><p class=time>"+finish_time+"</p><br>"
				break;
			case "yellow":
				document.getElementById("classifica").innerHTML = 
					document.getElementById("classifica").innerHTML +
					"<p class=horse id='yellow'>Yellow Horse: </p><p class=time>"+finish_time+"</p><br>"
				break;
			case "white":
				document.getElementById("classifica").innerHTML = 
					document.getElementById("classifica").innerHTML +
					"<p class=horse id='white'>White Horse: </p><p class=time>"+finish_time+"</p><br>"
				break;
			case "orange":
				document.getElementById("classifica").innerHTML = 
					document.getElementById("classifica").innerHTML +
					"<p class=horse id='orange'>Orange Horse: </p><p class=time>"+finish_time+"</p><br>"
				break;
			default:
				//this is never supposed to happen
				alert("Error");
		}
	}
	
	function frame() {
		if (pos1 > 750 && pos2 > 750 && pos3 > 750 && pos4 > 750 && pos5 > 750 && pos6 > 750) {
			clearInterval(id);
			document.getElementById("redbutton").disabled = false;
			document.getElementById("blubutton").disabled = false;
			document.getElementById("yellowbutton").disabled = false;
			document.getElementById("whitebutton").disabled = false;
			document.getElementById("greenbutton").disabled = false;
			document.getElementById("orangebutton").disabled = false;
			
		} else {
			if(pos1 < 750) {
				pos1 = pos1 + Math.floor(Math.random()*1.1);  
				elem1.style.left = pos1 + 'px'; 
			} else if (pos1 == 750) { 
				horseCuttingFinishLine("red");
				pos1++;
			}
			if(pos2 < 750) {
				pos2 = pos2 + Math.floor(Math.random()*1.1);  
				elem2.style.left = pos2 + 'px';
			} else if (pos2 == 750){
				horseCuttingFinishLine("blu");
				pos2++;	
			}
			if(pos3 < 750) {
				pos3 = pos3 + Math.floor(Math.random()*1.1);  
				elem3.style.left = pos3 + 'px';
			} else if (pos3 == 750) {
				horseCuttingFinishLine("green");
				pos3++;
			}
			if(pos4 < 750) {
				pos4 = pos4 + Math.floor(Math.random()*1.1);  
				elem4.style.left = pos4 + 'px';
			} else if (pos4 == 750) {
				horseCuttingFinishLine("yellow");
				pos4++;
			}
			if(pos5 < 750) {
				pos5 = pos5 + Math.floor(Math.random()*1.1);  
				elem5.style.left = pos5 + 'px';
			} else if (pos5 == 750) {
				horseCuttingFinishLine("white");
				pos5++;
			}
			if(pos6 < 750) {
				pos6 = pos4 + Math.floor(Math.random()*1.1);  
				elem6.style.left = pos6 + 'px';
			} else if (pos6 == 750) {
				horseCuttingFinishLine("orange");
				pos6++;
			}				
		}
	}
}
