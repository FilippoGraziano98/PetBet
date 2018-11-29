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

function showInfoHorse(e) {
	var classifica_html = document.getElementById("classifica").innerHTML.replace("<br><br><br><br>", "<br>");
	sessionStorage.setItem("PetBetClassifica", JSON.stringify(classifica_html));
	var color = e.target.id.split("_")[1];
	document.getElementById("style_horse_"+color).innerHTML = '#animate_'+color+' {width: 110px; height:110px;}';
	info_html =
		"<p class=title>Informazioni sul Cavallo</p>"+
			"<table>"+
				"<tr>"+
					"<td><p> Colore: </p></td>"+
					"<td><p>"+color+"</p></td>"+
				"<tr>"+
					"<td><p> Vittorie: </p></td>"+
					"<td><p>0/0</p></td>"+
			"</table><br>"
	document.getElementById("classifica").innerHTML = info_html;
}

function hideInfoHorse(e) {
	var color = e.target.id.split("_")[1];
	document.getElementById("style_horse_"+color).innerHTML = "";
	classifica_html = JSON.parse(sessionStorage.getItem("PetBetClassifica"));
	document.getElementById("classifica").innerHTML = classifica_html;
	sessionStorage.removeItem("PetBetClassifica");
}

function setQuote() {
	var vel1 = Math.random()*0.5+1.1;
	var vel2 = Math.random()*0.5+1.1;
	var vel3 = Math.random()*0.5+1.1;
	var vel4 = Math.random()*0.5+1.1;
	var vel5 = Math.random()*0.5+1.1;
	
	var quota1 = 5.8-vel1*3+Math.random()*0.7;
	var quota2 = 5.8-vel2*3+Math.random()*0.7;
	var quota3 = 5.8-vel3*3+Math.random()*0.7;
	var quota4 = 5.8-vel4*3+Math.random()*0.7;
	var quota5 = 5.8-vel5*3+Math.random()*0.7;
	
	sessionStorage.setItem("PetBet - Velocita 1", JSON.stringify(vel1));
	sessionStorage.setItem("PetBet - Velocita 2", JSON.stringify(vel2));
	sessionStorage.setItem("PetBet - Velocita 3", JSON.stringify(vel3));
	sessionStorage.setItem("PetBet - Velocita 4", JSON.stringify(vel4));
	sessionStorage.setItem("PetBet - Velocita 5", JSON.stringify(vel5));

	document.getElementById("redbutton").innerHTML = String(quota1).substring(0,4);
	document.getElementById("bluebutton").innerHTML = String(quota2).substring(0,4);
	document.getElementById("greenbutton").innerHTML = String(quota3).substring(0,4);
	document.getElementById("yellowbutton").innerHTML = String(quota4).substring(0,4);
	document.getElementById("whitebutton").innerHTML = String(quota5).substring(0,4);		
}

function myMove() {
	var colors = ['red','blue','green', 'yellow','white'];

	for(var i=0; i<5; i++){
		var col = colors[i];
		document.getElementById("style_horse_"+col).innerHTML = '#animate_'+col+' {content: url(img/cavalli/cavallo-immagine-animata-0271.gif)}';
		document.getElementById("animate_"+col).removeEventListener("mouseenter", showInfoHorse, false);
		document.getElementById("animate_"+col).removeEventListener("mouseout", hideInfoHorse, false);
		document.getElementById(col+"button").disabled = true;
	}
	
	var elem1 = document.getElementById("animate_red");   
	var elem2 = document.getElementById("animate_blue");   
	var elem3 = document.getElementById("animate_green");   
	var elem4 = document.getElementById("animate_yellow");   
	var elem5 = document.getElementById("animate_white");   
	
	var start_line = 0;
	var finish_line = 730;
	
	var pos1 = start_line;
	var pos2 = start_line;
	var pos3 = start_line;
	var pos4 = start_line;
	var pos5 = start_line;
	
	
	var classifica_html =
		'<p class=title>Classifica:</p>\
			<table>'
	for(var i=1; i<6; i++){
		classifica_html =
			classifica_html+
				'<tr id='+i+'>\
					<td class=pos><p>'+i+'</p></td>\
					<td class=horse><p>-</p></td>\
					<td class=time><p>--.---</p></td>'
	}
	classifica_html =
		classifica_html+
			'</table><br>';
	
	document.getElementById("classifica").innerHTML = classifica_html;
		
	var start_timer = Date.now();
	
	var id = setInterval(frame, 1);
	var pos = 1;
	
	function horseCuttingFinishLine(horse) {
		var finish_time = msToTime(Date.now() - start_timer);
		document.getElementById("style_horse_"+horse).innerHTML = '';
		switch(horse) {
			case "red":
				document.getElementById(pos).innerHTML = 
					"<td class=pos><p class=horse id='red'>"+pos+"</p></td>"+
					"<td class=horse><p class=horse id='red'> Red Horse: </p></td>"+
					"<td class=time><p class=time>"+finish_time+"</p></td><br>"
				pos++;
				break;
			case "blue":
				document.getElementById(pos).innerHTML = 
					"<td class=pos><p class=horse id='blu'>"+pos+"</p></td>"+
					"<td class=horse><p class=horse id='blu'> Blu Horse: </p></td>"+
					"<td class=time><p class=time>"+finish_time+"</p></td><br>"
					pos++;
				break;
			case "green":
				document.getElementById(pos).innerHTML = 
					"<td class=pos><p class=horse id='green'>"+pos+"</p></td>"+
					"<td class=horse><p class=horse id='green'> Green Horse: </p></td>"+
					"<td class=time><p class=time>"+finish_time+"</p></td><br>"
					pos++;
				break;
			case "yellow":
				document.getElementById(pos).innerHTML = 
					"<td class=pos><p class=horse id='yellow'>"+pos+"</p></td>"+
					"<td class=horse><p class=horse id='yellow'> Yellow Horse: </p></td>"+
					"<td class=time><p class=time>"+finish_time+"</p></td><br>"
					pos++;
				break;
			case "white":
				document.getElementById(pos).innerHTML = 
					"<td class=pos><p class=horse id='white'>"+pos+"</p></td>"+
					"<td class=horse><p class=horse id='white'> White Horse: </p></td>"+
					"<td class=time><p class=time>"+finish_time+"</p></td><br>"
					pos++;
				break;
			default:
				//this is never supposed to happen
				alert("Error");
		}
	}
	
	function frame() {
		if (pos1 > finish_line && pos2 > finish_line && pos3 > finish_line && pos4 > finish_line && pos5 > finish_line) {
			clearInterval(id);
			console.log(document.getElementById("classifica").innerHTML);
			for(var i=0; i<5; i++){
				var col = colors[i];
				document.getElementById("animate_"+col).addEventListener("mouseenter", showInfoHorse, false);
				document.getElementById("animate_"+col).addEventListener("mouseout", hideInfoHorse, false);
				document.getElementById(col+"button").disabled = false;
				sessionStorage.removeItem("PetBet - Velocita 1");
				sessionStorage.removeItem("PetBet - Velocita 2");
				sessionStorage.removeItem("PetBet - Velocita 3");				
				sessionStorage.removeItem("PetBet - Velocita 4");
				sessionStorage.removeItem("PetBet - Velocita 5");
				setQuote();
			}
			
		} else {
			if(pos1 < finish_line) {
				pos1 = pos1 + Math.floor(Math.random()*(JSON.parse(sessionStorage.getItem("PetBet - Velocita 1"))+Math.random()*0.4));  
				elem1.style.left = pos1 + 'px'; 
			} else if (pos1 == finish_line) { 
				horseCuttingFinishLine("red");
				pos1++;
			}
			if(pos2 < finish_line) {
				pos2 = pos2 + Math.floor(Math.random()*(JSON.parse(sessionStorage.getItem("PetBet - Velocita 2"))+Math.random()*0.4));  
				elem2.style.left = pos2 + 'px';
			} else if (pos2 == finish_line){
				horseCuttingFinishLine("blue");
				pos2++;	
			}
			if(pos3 < finish_line) {
				pos3 = pos3 + Math.floor(Math.random()*(JSON.parse(sessionStorage.getItem("PetBet - Velocita 3"))+Math.random()*0.4));  
				elem3.style.left = pos3 + 'px';
			} else if (pos3 == finish_line) {
				horseCuttingFinishLine("green");
				pos3++;
			}
			if(pos4 < finish_line) {
				pos4 = pos4 + Math.floor(Math.random()*(JSON.parse(sessionStorage.getItem("PetBet - Velocita 4"))+Math.random()*0.4));  
				elem4.style.left = pos4 + 'px';
			} else if (pos4 == finish_line) {
				horseCuttingFinishLine("yellow");
				pos4++;
			}
			if(pos5 < finish_line) {
				pos5 = pos5 + Math.floor(Math.random()*(JSON.parse(sessionStorage.getItem("PetBet - Velocita 5"))+Math.random()*0.4));  
				elem5.style.left = pos5 + 'px';
			} else if (pos5 == finish_line) {
				horseCuttingFinishLine("white");
				pos5++;
			}				
		}
	}
}
