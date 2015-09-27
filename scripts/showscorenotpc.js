
function showscore()
{
	document.write('	<div id = "score">');
	document.write('					<div id = "show-score">');
	document.write('						NUMBER <br> <span id="scoreSpan">0</span>');
	document.write('					</div>');
	document.write('					<div id = "show-percentage">');
	document.write('						PERCENTAGE<br> <span id="percentageSpan">0<span>%');
	document.write('					</div>');
	document.write('				</div>');
}
if(checkDevice() == 1)
	showscore();