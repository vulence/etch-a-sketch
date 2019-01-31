const gridCont = document.querySelector("#container");
let grid = document.createElement("div");
let val = document.querySelector("#clear");
let res = document.querySelector("#reset");
let col = document.querySelector("#colors");
let b = false;

let tempColumns = "";
let divisor = 4;

createGrid();

function fillBackground() {
	if (!b)
	{	
		if (this.style.backgroundColor !== "" && this.style.backgroundColor == "lightgrey")
		{
			let var1 = this.style.filter;
			let var2 = var1.split("(");
			let var3 = var2[1].split(")");
			let var4 = var3[0] - 0.1;
			
			this.style.filter = `brightness(${var4})`;
		}
			
		else
			this.style.backgroundColor = "lightgrey";
	}
	
	else
	{
		if (this.style.backgroundColor !== "" && this.style.backgroundColor !== "lightgrey")
		{
			let var1 = this.style.filter;
			let var2 = var1.split("(");
			let var3 = var2[1].split(")");
			let var4 = var3[0] - 0.1;
			
			this.style.filter = `brightness(${var4})`;
		}
		
		else
		{
			let hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
			this.style.backgroundColor = `${hue}`;
		}
	}
}

val.addEventListener("click", function() {
	do
	{
		divisor = prompt("Enter new size of the grid (0 - 64)");
		if (divisor < 0 || divisor > 64)
			alert("Please enter a valid size (0 - 64)");
	}
	while (divisor < 0 || divisor > 64);

	createGrid();
})

function createGrid() {
	
	tempColumns = "";
	gridCont.removeAttribute("style");
	
	while(gridCont.firstChild) {
		gridCont.firstChild.remove();
	}

	let gridPieceW = window.getComputedStyle(gridCont).width;
	let gridPieceH = window.getComputedStyle(gridCont).height;

	gridPieceW = gridPieceW.replace("px","");
	gridPieceH = gridPieceH.replace("px","");

	gridPieceW = Number(gridPieceW);
	gridPieceH = Number(gridPieceH);
	
	gridPieceW = gridPieceW / divisor;
	gridPieceH = gridPieceH / divisor;

	gridPieceW = gridPieceW.toString() + "px";
	gridPieceH = gridPieceH.toString() + "px";


	for (let i = 0; i < divisor*divisor; i++)
	{
		let grid = document.createElement("div");
		grid.setAttribute("class", "grid");
		grid.setAttribute("style", `height: ${gridPieceH}; width: ${gridPieceW};`);
		grid.style.filter = "brightness(1)";
		grid.addEventListener("mouseover", fillBackground);
		gridCont.appendChild(grid);
	}
	
	for (let i = 0; i < divisor; i++)
	{
		tempColumns += " auto";
	}
	
	tempColumns += ";";
	gridCont.setAttribute("style", `grid-template-columns: ${tempColumns}`);
}

res.addEventListener("click", createGrid);

col.addEventListener("click", function() {
	b = !b;
	
	if (b)
		col.textContent = "Black";
	else
		col.textContent = "RGB";
})