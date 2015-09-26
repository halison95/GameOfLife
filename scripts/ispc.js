function IsPC() {
	    var userAgentInfo = navigator.userAgent;
	    var Agents = ["Android", "iPhone",
	                "SymbianOS", "Windows Phone",
	                "iPad", "iPod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	}
function showscorePC()
{
	document.write('		<div class="col-md-4" id = "right-column">');
	document.write('		<div class = "game-controller" id = "start-game" onclick="start()">START</div>');
	document.write('				<div class = "game-controller" id = "end-game" onclick="end()">END</div>');
	document.write('				<div id = "score">');
	document.write('					<div id = "show-score">');
	document.write('						NUMBER <br> <span id="scoreSpan">0</span>');
	document.write('					</div>');
	document.write('					<div id = "show-percentage">');
	document.write('						PERCENTAGE<br> <span id="percentageSpan">0<span>%');
	document.write('					</div>');
	document.write('				</div></div>');
}
if(IsPC()==true)
	showscorePC();