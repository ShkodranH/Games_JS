const algoName = [
	"filterWords",
	"predefineWords", 
	"frequencyAnalysis", 
	"frequencyAnalysisAdvance", 
	"informationEntropy", 
	"informationEntropyAdvance"
];
const selectAlgo = document.getElementById("selectAlgo");

// create div for each algorithm and add corresponding images and title
for(let i = 0; i < algoName.length; i++) {
	const algoDiv = document.createElement("div");
	algoDiv.classList.add("algoDiv");
	selectAlgo.appendChild(algoDiv);

		const hoverDiv = document.createElement("div");
		algoDiv.appendChild(hoverDiv);

		const algoImage = document.createElement("img");
		algoImage.setAttribute("src", "./images/" + algoName[i] + ".png");
		algoImage.setAttribute("alt", "Algorithm Image");
		algoDiv.appendChild(algoImage);

		const algoText = document.createElement("p");
		let thisAlgoName = algoName[i].replace(/([A-Z])/g, ' $1')
		algoText.innerText = thisAlgoName;
		algoDiv.appendChild(algoText);
}
// add a button to link with the game page
const playLink = document.createElement("a");
playLink.setAttribute("href", "index.html");
selectAlgo.appendChild(playLink);

	const playBtn = document.createElement("button");
	playBtn.innerText = "Play the Game";
	playLink.appendChild(playBtn);


const resultsDiv = document.getElementById("resultsDiv");
const infoDiv = document.getElementById("infoDiv");
const algoDiv = document.getElementsByClassName("algoDiv");
// add click event to hide choose scene and run the test
for(let i = 0; i < algoName.length; i++) {
	algoDiv[i].addEventListener('click', function() {
		selectAlgo.style.display = "none";
		resultsDiv.style.display = "flex";
		infoDiv.style.display = "flex";

		const jsScript = document.createElement("script");
		jsScript.setAttribute("type", "module");
		jsScript.setAttribute("src", "testing/" + algoName[i] + ".js")
		document.body.appendChild(jsScript);
	});
}


export const wordsLength = 5;
export const numberOfTries = 15;
// create elements of the graph
const bars = document.getElementById("bars");
const baseNums = document.getElementById("baseNums");

for(let i = 0; i < 7; i++) {
	const column = document.createElement("div");
	column.classList.add("column");
	bars.appendChild(column);

		const val = document.createElement("span");
		val.innerText = 0;

		column.appendChild(val);
		const colDiv = document.createElement("div");
		column.appendChild(colDiv);

	const number = document.createElement("div");
	let n = (i !== 6) ? i + 1 : "+";
	number.innerText = n;
	baseNums.appendChild(number);
}


export const colDiv = document.querySelectorAll(".column div");
export const colSpan = document.querySelectorAll(".column span");

export const avgScore = document.getElementById("avgScore");

export const progressVal = document.querySelector("#progress p");
export const progressBar = document.querySelector("#progress div");

export const timeSpent = document.querySelector("#time span");
export const finishTime = document.querySelectorAll("#time span")[1];

export const tableCol = document.querySelectorAll("#table div");

// create spans for each cell of the table 
for(let i = 0; i < 15; i++) {
	const tableHead = document.createElement("span");
	tableHead.innerText = i + 1;
	tableCol[0].appendChild(tableHead);
	const tableBody = document.createElement("span");
	tableBody.innerText = 0;
	tableCol[1].appendChild(tableBody);
} 

// create a function for using with async/await keywords
export function waitTime(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}