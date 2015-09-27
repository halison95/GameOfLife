var loopTime = 500; // 循环时间，ms

var timerID = undefined;	//计时器标记
var isSelecting = false;	//True:正在单击选择状态中 False：反之

var device = checkDevice();			//是否为PC态

var length = device == 1 ? 30 : 50;		//棋盘格边长
var lengthPlus1 = length + 1;		//边长+1
var lengthPlus2 = length + 2;		//边长+2
var lengthPixel = length * 10;		//屏幕显示边像素个数



$('#map').css("height", lengthPixel + "");		//外方框宽度
$('#map').css("width", lengthPixel + "");

var cell = new Array(lengthPlus2);	//cell: DOM元素数组，棋盘格，cell[行][列]
var arr0 = new Array(lengthPlus2), arr1 = new Array(lengthPlus2);	//arr0：标记地图。1黑，0白 .  arr1为临时空间

//制定周围影响方格的位置
var DX = [-1,-1,-1,0,0,1,1,1];
var DY = [-1,0,1,-1,1,-1,0,1];

//设定空白地图。第0，length+1行列都设定为有方格（不显示）但恒定为白色（死亡）
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

set(0.6);		//随机显示初始界面

function set(ratio){	//随机化设定地图，ratio:每个块成为白色块的比率
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

//计时器
//每次先把arr0的数据复制一份到arr1，此时arr1为原来的地图。
//此后以arr1作为参照，遍历arr0修改值。由于arr0修改过程中变化，所以不能直接参照arr0
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
					arr0[i][j] = 1;	//黑块
					cell[i][j].addClass('blackbg');
				}
			}
			else if(num != 2 && arr0[i][j] == 1) {
				arr0[i][j] = 0;		//白块
				cell[i][j].removeClass('blackbg');
			}
			if(arr0[i][j] == 1) {
				totNum++;
			}
		}
	}
	timerID = setTimeout(timer,loopTime);
	$('#scoreSpan')[0].innerHTML = totNum;
	$('#percentageSpan')[0].innerHTML = (totNum * 100 / length / length).toFixed(2); 
}

//按下START按钮触发
function start() {
	//document.write(""+lengthPixel);
	if(isSelecting) {
		startManually();
	}
	else if(device == 0){
		//PC端会选择Randomly或者Manually
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
	//手机平板端只有Randomly（手动操作方式格子太小不可行）
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

//随机方式开始游戏。ratio：每一方块成为白色方块的比率
function startRandom(ratio) {
	set(ratio);
	clearTimeout(timerID);
	timerID = setTimeout(timer,loopTime);	
}

//手动选择方式第二阶段：选择已经完成，开始游戏。应当只在PC端出现
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

//手动选择方式第一阶段：开始选择。应当只在PC端出现
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

//地图中所有方格绑定这个点击事件
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

//按下END按钮触发
function end() {
	isSelecting = false;
	clearTimeout(timerID);
}

/*
//判断是否为PC端，返回True则是PC端
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone"];
//                ,"iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
*/