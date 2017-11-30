var randNum = 0;
var tries = 0;

function handleGuess()
{
	var guess = document.getElementById("number").value;
	
	if(guess == randNum)
	{
		document.getElementById("programResponse").innerHTML = "Correct";
		generateNumber();
	}
	else if(guess < randNum)
	{
		document.getElementById("programResponse").innerHTML = "Higher";
		tries++;
	}
	else
	{
		document.getElementById("programResponse").innerHTML = "Lower";
		tries++;
	}
	
	document.getElementById("tries").innerHTML = tries;
}

function generateNumber()
{
	randNum = Math.floor(Math.random()*100);
	tries = 0;
}