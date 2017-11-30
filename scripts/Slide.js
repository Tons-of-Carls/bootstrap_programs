var animate = setInterval(slideShow, 10);

var s = 0;
var i = 0;


function slideShow()
{
	document.getElementById("slide" + s).style.display = "inline";
	document.getElementById("slide" + s).style.opacity = "" + (1 - i);
	if(s == 2)
	{
		document.getElementById("slide" + 0).style.display = "inline";
		document.getElementById("slide" + 0).style.opacity = "" + i;
	}
	else
	{
		document.getElementById("slide" + (s+1)).style.display = "inline";
		document.getElementById("slide" + (s+1)).style.opacity = "" + i;
	}

	if(i >= 1 && s == 2)
	{
		s = 0;
		i = 0;
	}
	else if(i >= 1)
	{
		s++;
		i = 0;
	}
	else
	{
		i+=.01;
	}
	
}