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

function showInfoHorse(e) {
	var classifica_html = document.getElementById("classifica").innerHTML.replace("<br><br><br><br>", "<br>");
	sessionStorage.setItem("PetBetClassifica", JSON.stringify(classifica_html));

	var color = e.target.id.split("_")[1];
	var horse = document.getElementById("animate_"+color);
	var horse_id = horse.horse_id;
	var horse_name = horse.horse_name;
	var horse_age = horse.horse_age;
	var horse_wins = horse.horse_wins;
	var horse_races = horse.horse_races;

	document.getElementById("style_horse_"+color).innerHTML = '#animate_'+color+' {width: 115px; height:115px;}';
	info_html =
		"<p class=title>Informazioni sul Cavallo</p>"+
			"<table>"+
				"<tr>"+
					"<td><p> Id: </p></td>"+
					"<td><p>"+horse_id+"</p></td>"+
				"<tr>"+
					"<td><p> Name: </p></td>"+
					"<td><p>"+horse_name+"</p></td>"+
				"<tr>"+
					"<td><p> Age: </p></td>"+
					"<td><p>"+horse_age+"</p></td>"+
				"<tr>"+
					"<td><p> Colour: </p></td>"+
					"<td><p>"+color+"</p></td>"+
				"<tr>"+
					"<td><p> Vittorie: </p></td>"+
					"<td><p>"+horse_wins+"/"+horse_races+"</p></td>"+
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
	var horses = JSON.parse(localStorage.getItem("PetBet - Horses"));
	var n_horses = horses.length;
	
	var race_horses = [];
	var race_horses_idx = [];
	var idx;
	for(var i=0; i<5; i++){
		do {
			idx = Math.floor(Math.random()*n_horses);
		} while( race_horses_idx.includes(idx) );
		race_horses_idx.push(idx);
		race_horses.push(horses[idx]);
		console.log(race_horses[i]);
	}

	var colors = ['red','blue','green', 'yellow','white'];
	for(var i=0; i<5; i++){
		var col = colors[i];
		document.getElementById("animate_"+col).horse_id = race_horses[i].id;
		document.getElementById("animate_"+col).horse_name = race_horses[i].name;
		document.getElementById("animate_"+col).horse_age = race_horses[i].age;
		document.getElementById("animate_"+col).horse_wins = race_horses[i].wins;
		document.getElementById("animate_"+col).horse_races = race_horses[i].races;
	}
	
	var vel1 = Math.random()*0.4+1.2;
	var vel2 = Math.random()*0.4+1.2;
	var vel3 = Math.random()*0.4+1.2;
	var vel4 = Math.random()*0.4+1.2;
	var vel5 = Math.random()*0.4+1.2;
	
	var quota1 = 5.8-vel1*3+Math.random()*1.5;
	var quota2 = 5.8-vel2*3+Math.random()*1.5;
	var quota3 = 5.8-vel3*3+Math.random()*1.5;
	var quota4 = 5.8-vel4*3+Math.random()*1.5;
	var quota5 = 5.8-vel5*3+Math.random()*1.5;
	
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
	var finish_line = 720;
	
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
				sessionStorage.removeItem("PetBet - Velocita "+i);
			}
			setQuote();
		
		} else {
			if(pos1 < finish_line && pos1 != finish_line-70) {
				pos1 = pos1 + Math.floor(Math.random()*(JSON.parse(sessionStorage.getItem("PetBet - Velocita 1"))+Math.random()*0.4));  
				elem1.style.left = pos1 + 'px'; 
			} else if (pos1 == finish_line-70) { 
				horseCuttingFinishLine("red");
				pos1++;
			} else if (pos1 == finish_line) {
				document.getElementById("style_horse_red").innerHTML = '';
				pos1++
			}
			
			if(pos2 < finish_line && pos2 != finish_line-70) {
				pos2 = pos2 + Math.floor(Math.random()*(JSON.parse(sessionStorage.getItem("PetBet - Velocita 2"))+Math.random()*0.4));  
				elem2.style.left = pos2 + 'px';
			} else if (pos2 == finish_line-70){
				horseCuttingFinishLine("blue");
				pos2++;	
			} else if (pos2 == finish_line) {
				document.getElementById("style_horse_blue").innerHTML = '';
				pos2++;
			}
			
			if(pos3 < finish_line && pos3 != finish_line-70) {
				pos3 = pos3 + Math.floor(Math.random()*(JSON.parse(sessionStorage.getItem("PetBet - Velocita 3"))+Math.random()*0.4));  
				elem3.style.left = pos3 + 'px';
			} else if (pos3 == finish_line-70) {
				horseCuttingFinishLine("green");
				pos3++;
			} else if (pos3 == finish_line) {
				document.getElementById("style_horse_green").innerHTML = '';
				pos3++;
			}
			
			if(pos4 < finish_line && pos4 != finish_line-70) {
				pos4 = pos4 + Math.floor(Math.random()*(JSON.parse(sessionStorage.getItem("PetBet - Velocita 4"))+Math.random()*0.4));  
				elem4.style.left = pos4 + 'px';
			} else if (pos4 == finish_line-70) {
				horseCuttingFinishLine("yellow");
				pos4++;
			} else if (pos4 == finish_line) {
				document.getElementById("style_horse_yellow").innerHTML = '';
				pos4++;
			}
			
			if(pos5 < finish_line && pos5 != finish_line-70) {
				pos5 = pos5 + Math.floor(Math.random()*(JSON.parse(sessionStorage.getItem("PetBet - Velocita 5"))+Math.random()*0.4));  
				elem5.style.left = pos5 + 'px';
			} else if (pos5 == finish_line-70) {
				horseCuttingFinishLine("white");
				pos5++;
			} else if (pos5 == finish_line) {
				document.getElementById("style_horse_white").innerHTML = '';
				pos5++;
			}				
		}
	}
}
