window.onload = function() {
	var me = true;
	var chessBoard = [];
	var over = false;

	//赢法数组
	var wins = [];

	//赢法的统计数组
	var myWin = [];
	var computerWin = [];

	for (var i=0; i< 16; i++) {
		wins[i] = [];
		for (var j=0; j<16; j++) {
			wins[i][j] = [];
		}
	}

	//统计所有的赢法
	var count = 0;
	//行所有赢法
	for (var i=0; i<16; i++) {
		for (var j=0; j<12; j++) {
			for (var k=0; k<5; k++) {
				wins[i][j+k][count] = true;
			}
			count++;
		}
	}
	//列所有赢法
	for (var i=0; i<16; i++) {
		for (var j=0; j<12; j++) {
			for (var k=0; k<5; k++) {
				wins[j+k][i][count] = true;
			}
			count++;
		}
	}
	//正斜对角所有赢法
	for (var i=0; i<12; i++) {
		for (var j=0; j<12; j++) {
			for (var k=0; k<5; k++) {
				wins[i+k][j+k][count] = true;
			}
			count++;
		}
	}
	//反斜对角所有赢法
	for (var i=0; i<12; i++) {
		for (var j=15; j>3; j--) {
			for (var k=0; k<5; k++) {
				wins[i+k][j-k][count] = true;
			}
			count++;
		}
	}

	console.log(count);

	/*********************************/

	for (var i=0; i<count; i++) {
		myWin[i] = 0;
		computerWin[i] = 0;
	}

	/********************************/
	for (var i=0; i<16; i++) {
		chessBoard[i] = [];
		for (var j=0; j<16; j++) {
			chessBoard[i][j] = 0;
		}
	} 
	var canvas = document.getElementById("chess");
	var context = canvas.getContext('2d');

	for(var i=0; i<16; i++) {
		context.moveTo(20 + 40 * i, 20);
		context.lineTo(20 + 40 * i, 620);
		context.moveTo(20, 20 + 40 * i);
		context.lineTo(620, 20 + 40 * i);
		context.strokeStyle = "#cc9966";
		context.stroke();
	}

	canvas.onclick = function(e) {
		// console.log("in_onclick");
		if (over) {
			return;
		}
		if(!me) {
			return;
		}
		var x = e.offsetX,
			y = e.offsetY,
			i = Math.floor(x / 40),
			j = Math.floor(y / 40);
		if (i<16 && j<16 && chessBoard[i][j]==0) {
			oneStep(i, j, me);
			chessBoard[i][j] = 1;

			for (var k=0; k<count; k++) {
				if(wins[i][j][k]) {
					myWin[k]++;
					computerWin[k] = 6;
					if(myWin[k]==5) {
						window.alert("你赢了");
						over = true;
					}
				}
			}
		}
		if(!over) {
			me = !me;
			computerAI();
		}
	};

	function computerAI () {
		var myScore = [];
		var computerScore = [];
		var max = 0;
		var u = 0, v = 0;
		for(var i=0; i<16; i++) {
			myScore[i] = [];
			computerScore[i] = [];
			for(var j=0; j<16; j++) {
				myScore[i][j] = 0;
				computerScore[i][j] = 0;
			}
		}
		for(var i=0; i<16; i++) {
			for(var j=0; j<16; j++) {
				if(chessBoard[i][j] == 0) {
					for(var k=0; k<count; k++) {
						if(wins[i][j][k]) {
							if(myWin[k] == 1) {
								myScore[i][j] += 200;
							} else if(myWin[k] == 2) {
								myScore[i][j] += 400;
							} else if(myWin[k] == 3) {
								myScore[i][j] += 2000;
							} else if(myWin[k] == 4) {
								myScore[i][j] += 10000;
							}
							if(computerWin[k] == 1) {
								computerScore[i][j] += 220;
							} else if(computerWin[k] == 2) {
								computerScore[i][j] += 420;
							} else if(computerWin[k] == 3) {
								computerScore[i][j] += 2100;
							} else if(computerWin[k] == 4) {
								computerScore[i][j] += 20000;
							}
						}
					}
					if(myScore[i][j] > max) {
						max = myScore[i][j];
						u = i;
						v = j;
					} else if(myScore[i][j] == max) {
						if(computerScore[i][j] > computerScore[u][v]) {
							u = i;
							v = j;
						}
					}
					if(computerScore[i][j] > max) {
						max = computerScore[i][j];
						u = i;
						v = j;
					} else if(myScore[i][j] == max) {
						if(myScore[i][j] > myScore[u][v]) {
							u = i;
							v = j;
						}
					}
				}
			}
		}
		oneStep(u, v, false);
		chessBoard[u][v] = 2;
		for (var k=0; k<count; k++) {
			if(wins[u][v][k]) {
				computerWin[k]++;
				myWin[k] = 6;
				if(computerWin[k]==5) {
					window.alert("计算机赢了");
					over = true;
				}
			}
		}
		if(!over) {
			me = !me;
		}
	}

	function oneStep(i, j, role) {
		var canvas = document.getElementById('chess');
		var context = canvas.getContext('2d');
		context.beginPath();
		context.arc(20 + 40 * i, 20 + 40 * j, 15, 0, 2 * Math.PI);
		context.closePath();
		if (role) {
			var gradient = context.createRadialGradient(20 + 40 * i, 20 + 40 * j, 5, 20 + 40 * i, 20 + 40 * j, 15)
			gradient.addColorStop(0, "#cccccc");
			gradient.addColorStop(1, "#000000");
			context.fillStyle = gradient;
		} else {
			var gradient = context.createRadialGradient(20 + 40 * i, 20 + 40 * j, 5, 20 + 40 * i, 20 + 40 * j, 15)
			gradient.addColorStop(0, "#ffffff");
			gradient.addColorStop(1, "#cccccc");
			context.fillStyle = gradient;
		}
		context.fill();
	}

};






