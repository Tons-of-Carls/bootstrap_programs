var col = 0

var grid = [[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]];

var score = 0;

var time = 60.0;

var shots = 0;
var hits = 0;

var gameInProgress = true;

var move = setInterval(handleTgMv, 1000);

function right()
{
	if(col < 11)
	{
		col++;
	}
	else
	{
		col = 0;
	}
	
	document.getElementById("ship").className = "col-lg-1 col-lg-offset-" + col;
}

function left()
{
	if(col > 0)
	{
		col--;
	}
	else
	{
		col = 11;
	}
	
	document.getElementById("ship").className = "col-lg-1 col-lg-offset-" + col;
}

function shoot()
{
	if(gameInProgress)
	{	

		shots++;
		for(var i = 0; i < 5; i++)
		{
			if(grid[i][col] != 0)
			{
				grid[i][col]--;
				hits++;
				if(grid[i][col] == 0)
				{
					score++;
				}
				display();
				break;
			}
		}
		if(shots == 0)
		{
			document.getElementById("accuracy").innerHTML = "0";
		}
		else
		{
			document.getElementById("accuracy").innerHTML = "" + Math.floor((hits/shots)*100) + "%";
		}
	}
}


function handleTgMv()
{
	for(var i = 0; i < 5; i++)
	{
		for(var debu = 0; debu < 12; debu++)
		{
			if(grid[i][debu] != 0)
			{
				if(i%2 == 1)
				{					
					if(debu < 11)
					{
						grid[i][debu + 1] = grid[i][debu];
						grid[i][debu] = 0;
					}
					else
					{
						grid[i][0] = grid[i][debu];
						grid[i][debu] = 0;
					}
				}
				else
				{					
					if(debu > 0)
					{
						grid[i][debu - 1] = grid[i][debu];
						grid[i][debu] = 0;
					}
					else
					{
						grid[i][11] = grid[i][debu];
						grid[i][debu] = 0;
					}
				}
				break;
			}
		}
	}
	time-=1;
	
	if(time <= 0)
	{
		clearInterval(move);
		gameInProgress = false;
	}
	
	display();
}

function display()
{
	document.getElementById("score").innerHTML = score;
	document.getElementById("time").innerHTML = time + " s";
	
	var rowsNoTrgt = 0;
	for(var r = 0; r < 5; r++)
	{
		var hastrgt = false;
		for(var c = 0; c < 12; c++)
		{
			if(grid[r][c] != 0)
			{
				hastrgt = true;
				if(grid[r][c] == 5)
				{
					set("black", r, c);
				}
				else if(grid[r][c] == 4)
				{
					set("purple", r, c);
				}
				else if(grid[r][c] == 3)
				{
					set("green", r, c);
				}
				else if(grid[r][c] == 2)
				{
					set("yellow", r, c);
				}
				else
				{
					set("red", r, c);
				}
			}
		}
		if(!hastrgt)
		{
			document.getElementById("row" + (r + 1)).innerHTML = '';
			rowsNoTrgt++;
		}
	}
	
	if(rowsNoTrgt == 5)
	{
		initalize();
	}
}

function controlHandler(evnt)
{
	if(evnt.key == "ArrowLeft")
	{
		left();
	}
	else if(evnt.key == "ArrowRight")
	{
		right();
	}
	else if(evnt.key == "ArrowUp")
	{
		shoot();
	}
}

function set(color, row, col)
{
	if(col == 0)
	{
		document.getElementById("row" + (row + 1)).innerHTML = '<div class = "col-lg-1" style = "height:5vh;background-color:'+ color +';" id = "trgt'+ (row+1) +'"></div>';
	}
	else
	{
		document.getElementById("row" + (row + 1)).innerHTML = '<div class = "col-lg-1 col-lg-offset-'+ col +'" style = "height:5vh;background-color:'+ color +';" id = "trgt'+ row +'"></div>';
	}
}

function initalize()
{	
	document.addEventListener("keyup", controlHandler);
	
	for(var i = 0; i < 5; i++)
	{
		var rand = Math.floor(Math.random()*12);
		var lv = Math.floor(Math.random()*5) + 1;
		grid[i][rand] = lv;
		
	}
	
	display();
}

function resetScore()
{
	score = 0;
}