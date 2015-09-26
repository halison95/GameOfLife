var loopTime = 500; // 循环时间，ms

	var timerID = undefined;
	var isSelecting = false;	//True:正在单击选择状态中 False：反之
	
	var isPc = IsPC();

	var length = isPc ? 50 : 30;
	var lengthPlus1 = length + 1;
	var lengthPlus2 = length + 2;
	var lengthPixel = length * 10;
	
	$('#map').css("height", lengthPixel + "");
	$('#map').css("width", lengthPixel + "");
	
	var cell = new Array(lengthPlus2);	//cell[lengthPlus2][lengthPlus2]: DOM元素数组，棋盘格，cell[行][列]
	var arr0 = new Array(lengthPlus2), arr1 = new Array(lengthPlus2);	//arr0[lengthPlus2][lengthPlus2],标记地图。1黑，0白 .  arr1为临时空间
	
	
	for (var i = 0; i <= lengthPlus1; i++) {
		cell[i] = new Array(lengthPlus2);
		arr0[i] = new Array(lengthPlus2);
		arr1[i] = new Array(lengthPlus2);
		for (var j = 0; j <= lengthPlus1; j++){
			if(j != 0 && j != lengthPlus1 && i!= 0 && i != lengthPlus1) {
				cell[i][j] = $('<div class="cell" style="left:' + (i-1)*10 + 'px;top:'+ (j-1)*10 + 'px"></div>');
				cell[i][j].mousedown(clickEvent);
				$('#map').append(cell[i][j]);
			}
			arr1[i][j] = arr0[i][j] = 0;
		}
	}

	var DX = [-1,-1,-1,0,0,1,1,1];
	var DY = [-1,0,1,-1,1,-1,0,1];

	function set(ratio){
		for(var i = 1; i <= length; i++) {
			for(var j = 1; j <= length; j++) {
				if(Math.random() > ratio) {
					cell[i][j].addClass('blackbg');
					arr0[i][j] = 1;
				}
				else {
					cell[i][j].removeClass('blackbg');
					arr0[i][j] = 0;
				}
			}
		}
	}

	function timer() {
		var totNum = 0;
		for (var i = 1; i <= length; i++) {
			for (var j = 1; j <= length; j++) {
				arr1[i][j] = arr0[i][j];
			}
		}
		for (var i = 1; i <= length; i++) {
			for (var j = 1; j <= length; j++) {
				var num = 0;
				for (var k = 0; k < 8; k++) {
					if(arr1[i + DX[k]][j + DY[k]] == 1){
						num++;
					}
				}
				if(num == 3) {
					if(arr0[i][j] == 0) {
						arr0[i][j] = 1;
						cell[i][j].addClass('blackbg');
					}
				}
				else if(num != 2 && arr0[i][j] == 1) {
					arr0[i][j] = 0;
					cell[i][j].removeClass('blackbg');
				}
				if(arr0[i][j] == 1) {
					totNum++;
				}
			}
		}
		timerID = setTimeout(timer,loopTime);
		$('#scoreSpan')[0].innerHTML = totNum;
		$('#percentageSpan')[0].innerHTML = (totNum / 25).toFixed(2); // totNum / 2length0 * 100%
	}

	function start() {
		if(isSelecting) {
			startManually();
		}
		else if(isPc){
			bootbox.dialog(
			{
				message: "Which way would you like the elements to be initialized?",
				title: "Initializing Elements",
				buttons: 
				{
					success: 
					{
						label: "Randomly",
						className: "btn-success",
						callback: function() {
							bootbox.prompt("Type in a number in range (0,1).", function(result) {
								if (result === null || isNaN(result) || result < 0 || result > 1) {
		  							bootbox.alert("Input invalid. Please try again.");
								} else {
		    						startRandom(result);
								}
							});
						}
					},
					danger: 
					{
						label: "Manually",
						className: "btn-danger",
						callback: function() {
							startSelect();
						}
					},
					main: 
					{
						label: "Quit",
						className: "btn-primary",
						callback: function() 
						{}
					}
				}
			});
		}
		else {
			bootbox.prompt("Type in a number in range (0,1).", function(result) {
				if (result === null || isNaN(result) || result < 0 || result > 1) {
						bootbox.alert("Input invalid. Please try again.");
				} else {
					startRandom(result);
				}
			});
		}		
	}

	function startRandom(ratio) {
		set(ratio);
		clearTimeout(timerID);
		timerID = setTimeout(timer,loopTime);	
	}

	function startManually() {
		isSelecting = false;
		for(var i = 1; i <= length; i++) {
			for(var j = 1; j <= length; j++) {
				//console.log(i + " " + j);
				if(cell[i][j].hasClass('blackbg')) {
					arr0[i][j] = 1;
				}
				else {
					arr1[i][j] = 0;
				}
			}
		}
		timerID = setTimeout(timer,loopTime);
	}

	function startSelect() {
		clearTimeout(timerID);
		for(var i = 1; i <= length; i++) {
			for(var j = 1; j <= length; j++) {
				cell[i][j].removeClass('blackbg');
				arr0[i][j] = 0;
			}
		}
		isSelecting = true;
	}
	function clickEvent() {
		if(isSelecting == true) {
			if($(this).hasClass('blackbg')) {
				$(this).removeClass('blackbg');
			}
			else {
				$(this).addClass('blackbg');	
			}
		}
	}
	function end() {
		isSelecting = false;
		clearTimeout(timerID);
	}
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
	set(0.6);