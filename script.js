//selecting default mode as easy 
var modeselect=3;

//generating colors array as per the mode
var colors = generatecolorsarray(modeselect);

//function generatecolorsarray definition
function generatecolorsarray(modeselect) {
	var arr = []
	for (var i = 0; i < modeselect; i++) {
		arr.push(getcolors());
	}
	return arr;
}

//function getcolors definition
function getcolors() {
	var r = Math.round(Math.random()*255);
	var g = Math.round(Math.random()*255);
	var b = Math.round(Math.random()*255);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

//getting each tag by DOM select and manipulation
var correctcolortag = document.querySelector("#correctcolor");
var sqlist=document.querySelectorAll(".square");
var modebtn = document.querySelectorAll(".modebtn");
var colorchecker = document.querySelector("#colorchecker");
var resetbtn = document.querySelector("button");
var headertag = document.querySelector(".header");	

//definition for adding event listener to both hard and easy mode btn
for (var i = 0; i < modebtn.length; i++) {
	modebtn[i].addEventListener("click", function() {
		modebtn[0].classList.remove("selected");
		modebtn[1].classList.remove("selected");
		this.classList.add("selected");
		this.textContent === "EASY" ? modeselect = 3 : modeselect = 6;
		reset(modeselect);
	});
}

//resetbutton or new colors button definition
resetbtn.addEventListener("click", function() {
	reset(modeselect);
});

//reset function to reset for a new game
function reset(modeselect) {
	colorchecker.textContent = "";
	resetbtn.textContent = "NEW COLORS";
	headertag.style.backgroundColor = "skyblue";
	colors = generatecolorsarray(modeselect);
	correctcolor = colors[randomnum()];
	correctcolortag.textContent = correctcolor;
	for (var i = 0; i < sqlist.length; i++) {
		if(i<modeselect) {
			sqlist[i].style.display = "block";
			sqlist[i].style.backgroundColor = colors[i];
	 	}
	 	else {
	 		sqlist[i].style.display = "none";
	 	}
    }
}

//setting the correct color by taking a random color from the colors array 
var correctcolor = colors[randomnum()];

//function randomnum definition
function randomnum() {
	var num=Math.random()*(colors.length-1);
	var num1=Math.round(num);
	return num1;
}

//displaying the correct color on the header
correctcolortag.textContent = correctcolor;

//assigning each div square a color from colors array
for (var i = 0; i <= modeselect - 1; i++) {
 	sqlist[i].style.backgroundColor = colors[i];
}

//assigning an event listener to every div square
for (var i = 0; i < sqlist.length; i++) {
	sqlist[i].addEventListener("click", function(){
		var clickedcolor = this.style.backgroundColor;
		if(clickedcolor === correctcolor) {
		colorchecker.textContent = "Correct...";
		resetbtn.textContent = "Play Again ?"
		headertag.style.backgroundColor = correctcolor;
		winningcolor(correctcolor);
		}
		else {
		colorchecker.textContent="Try Again";
		this.style.backgroundColor = "#232323";  
		} 
	});
}

//function winningcolor definition i.e. after user selected correct color , converting all div squares to that color.
function winningcolor(correctcolor) {
	for ( var i=0; i < modeselect ; i++) {
		sqlist[i].style.backgroundColor = correctcolor;
	}	
}