var galli_html = '\
		<link rel=stylesheet type="text/css" href="galli/galli.css">\
		<div><p class=title>Lotta Tra Galli</p></div>\
			<br>\
			<div class=field name="container" id ="container">\
				<table>\
					<tr>\
						<td>\
							<div class=gallo id="gallo_red"></div>\
						</td>\
						<td>\
							<div class=gallo id="gallo_blue"></div>\
						</td>\
				</table>\
			</div>\
		'

function loadGalli(){
	document.getElementById("dynamic_area").innerHTML = galli_html;
}
