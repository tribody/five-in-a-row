window.onload = function() {
	var me = false;
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

	var count = 0;
	for (var i=0; i<16; i++) {
		for (var j=0; j<12; j++) {
			for (var k=0; k<5; k++) {
				wins[i][j+k][count] = true;
			}
			count++;
		}
	}

	for (var i=0; i<16; i++) {
		for (var j=0; j<12; j++) {
			for (var k=0; k<5; k++) {
				wins[j+k][i][count] = true;
			}
			count++;
		}
	}

	for (var i=0; i<12; i++) {
		for (var j=0; j<12; j++) {
			for (var k=0; k<5; k++) {
				wins[i+k][j+k][count] = true;
			}
			count++;
		}
	}

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
		if (over) {
			return;
		}
		var x = e.offsetX,
			y = e.offsetY,
			i = Math.floor(x / 40),
			j = Math.floor(y / 40);
			if (i<16 && j<16 && chessBoard[i][j]==0) {
				oneStep(i, j, me);
				if(me) {
					chessBoard[i][j] = 1;
				} else {
					chessBoard[i][j] = 2;
				}
				me = !me;
				for (var k=0; k<count; k++) {
					if(wins[i][j][k]) {
						myWin[k]++;
						computerWin[k] = 6;
						if(myWind[k]==5) {
							window.alert("你赢了");
							over = true;
						}
					}
				}
			}
	}
	// oneStep(3, 4, true);
};



function oneStep(i, j, role) {
	var canvas = document.getElementById('chess');
	var context = canvas.getContext('2d');
	context.beginPath();
	context.arc(20 + 40 * i, 20 + 40 * j, 15, 0, 2 * Math.PI);
	context.closePath();
	if (role) {
		var gradient = context.createRadialGradient(20 + 40 * i, 20 + 40 * j, 5, 20 + 40 * i, 20 + 40 * j, 15)
		gradient.addColorStop(0, "#ffffff");
		gradient.addColorStop(1, "#cccccc");
		context.fillStyle = gradient;
	} else {
		var gradient = context.createRadialGradient(20 + 40 * i, 20 + 40 * j, 5, 20 + 40 * i, 20 + 40 * j, 15)
		gradient.addColorStop(0, "#cccccc");
		gradient.addColorStop(1, "#000000");
		context.fillStyle = gradient;
	}
	context.fill();
}