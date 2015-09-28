/**
 * This file is for writing the navigation bar in html files.
 */

document.write('<nav class="navbar navbar-inverse">');
document.write('		<div class = "container-fluid">');
document.write('			<div class = "navbar-header">');
document.write('				<button type = "button" class = "navbar-toggle" data-toggle = "collapse" data-target = "#mainNavBar">');
document.write('					<span class = "icon-bar"></span>');
document.write('					<span class = "icon-bar"></span>');
document.write('					<span class = "icon-bar"></span>');
document.write('				</button>');
document.write('				<a href = "#" class = "navbar-brand">GAME OF LIFE</a>');
document.write('			</div>');
document.write('');
document.write('			<div class = "collapse navbar-collapse" id="mainNavBar">');
document.write('				<ul class = "nav navbar-nav navbar-right">');
document.write('					<li class="active"><a href="#">PLAY</a></li>');
document.write('					<li><a href="#" onclick="start()">START</a></li>');
document.write('					<li><a href="#" onclick="end()">END</a></li>');
document.write('');
document.write('					<li class="dropdown">');
document.write('						<a href = "#" class="dropdown-toggle" data-toggle = "dropdown">HELP<span class="caret"></span></a>');
document.write('						<ul class="dropdown-menu">');
if(checkDevice() == 1)
	document.write("							<li><a href=\"#\" onclick='bootbox.alert(\"1.	Press the start button.<br>2.	Choose to initialize the cells randomly or manually.<br>3.	If you chose to initialize the cells randomly, type in a number in the range (0,1) depicting the probability of every cell to be alive.<br>4.	If you chose to initialize the cells manually, click on the cells that you want alive and click on start again to start the game.\");'>TUTORIAL</a></li>");
else
	document.write("							<li><a href=\"#\" onclick='bootbox.alert(\"1.	Press the start button.<br>2.	Choose to initialize the cells randomly or manually.<br>3.	If you chose to initialize the cells randomly, type in a number in the range (0,1) depicting the probability of every cell to be alive.\");'>TUTORIAL</a></li>");
document.write("							<li><a href=\"#\" onclick='bootbox.alert(\"Zhang Haoci 2013013285. <br>Liang Songsong 2013013289.\");'>AUTHORS</a></li>");
document.write('						</ul>');
document.write('					</li>');
document.write('				</ul>');
document.write('			</div>');
document.write('		</div>');
document.write('	</nav>');