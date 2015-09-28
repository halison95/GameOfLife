/**
 * This function is for writing the START/END buttons and showing the results in html files
 * if the user device is a pad or PC.
 */
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
if(checkDevice() != 1)
	showscorePC();