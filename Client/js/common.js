function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

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
