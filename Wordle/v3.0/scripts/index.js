const gameName = "wordle";
const examples = ["daily", "score", "funny"];

export const numberOfTries = 6;
export const wordsLength = 5;
export const displayedList = 5;

export const letters = [
	['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	['remove', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter']
];

// create a function for using with async/await keywords
export function waitTime(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

// create 6 divs for displaying each letter of word "WORDLE" 
const gameLogo = document.getElementById("gameLogo");

for(let i = 0, len = gameName.length; i < len; i++) {
	const logoName = document.createElement("div");
	logoName.innerText = gameName[i].toUpperCase();
	gameLogo.appendChild(logoName);
}

// add click event to hide intro scene and display the game
export const playButton = document.getElementById("playButton");
const startScene = document.getElementById("startScene");
const mainScene = document.getElementById("mainScene");
const algorithms = document.getElementById("algorithms");
const availableInfo = document.getElementById("availableInfo");
 
playButton.addEventListener('click', function () {
	startScene.style.display = "none";
	mainScene.style.display = "flex";
	algorithms.style.display = "flex";
	availableInfo.style.display = "flex";
});


const infoButton = document.getElementById("infoButton");
const howtoPlay = document.getElementById("howtoPlayDiv");
const infoDiv = document.getElementById("infoDiv");
const closeInfo = document.getElementById("closeInfo");

const setting = document.getElementById("setting");
const settingBg = document.getElementById("settingBg");
const settingDiv = document.getElementById("settingDiv");
const closeSetting = document.getElementById("closeSetting");

// create a function to open and close modals 
async function openModal(bg, modal) {
	bg.classList.remove("hideBg");
    modal.classList.remove("hideDiv");

	bg.style.display = "flex";
	bg.classList.add("showBg");
    await waitTime(200);
    modal.classList.add("showDiv");
}

async function closeModal(bg, modal) {
	modal.classList.add("hideDiv");
	await waitTime(300);
	bg.classList.add("hideBg");
	await waitTime(200);
	bg.style.display = "none";

	bg.classList.remove("showBg");
    modal.classList.remove("showDiv");
}


infoButton.addEventListener('click', function() {
	openModal(howtoPlay, infoDiv);
});
closeInfo.addEventListener('click', function() {
	closeModal(howtoPlay, infoDiv);
});

setting.addEventListener('click', function() {
	openModal(settingBg, settingDiv);
});
closeSetting.addEventListener('click', function() {
	closeModal(settingBg, settingDiv);
});

// create divs to display examples in "How to Play" modal 
const exampleDiv = document.getElementById("exampleDiv");

for(let i = 0; i < examples.length; i++) {
	const exampleSubDiv = exampleDiv.getElementsByTagName("div")[i];
	for(let j = 0; j < wordsLength; j++) {
		const exampleCell = document.createElement("button");
		exampleCell.innerText = examples[i][j].toUpperCase();
		exampleSubDiv.appendChild(exampleCell);
	}
}

// create toggle buttons (from checkboxes) to choose algorithms to use
const chooseAlgorithms = document.querySelectorAll("#chooseAlgorithms div");

for(let i = 0; i < 6; i++) {
	const input = document.createElement("input")
	input.id = "algo" + i;
	input.setAttribute("type", "checkbox");
	chooseAlgorithms[i].appendChild(input);

	const toggle = document.createElement("label");
	toggle.classList.add("toggle");
	toggle.setAttribute("for", "algo" + i);
	chooseAlgorithms[i].appendChild(toggle);
	
		const slider = document.createElement("span");
		slider.classList.add("slider");
		toggle.appendChild(slider);
}
document.getElementById("algo5").checked = true;

// call scripts of the algorithms currently in use
let isChecked = 0;
const algoName = [
	"predefineWords", 
	"frequencyAnalysis", 
	"frequencyAnalysisAdv", 
	"informationEntropy", 
	"informationEntropyAdv"
];
playButton.addEventListener('click', function () {
	for(let i = 0; i < 6; i++) {
		if(document.getElementById("algo" + i).checked) {
			algorithms.getElementsByTagName("div")[i].style.display = "flex";
			if(i !== 0) {
				const jsScript = document.createElement("script");
				jsScript.setAttribute("type", "module");
				jsScript.setAttribute("src", "scripts/" + algoName[i-1] + ".js")
				document.body.appendChild(jsScript);
			}
			isChecked++;
		}
	}
	if(isChecked === 0) {
		algorithms.style.display = "none";
		availableInfo.style.display = "none";
	}
});

for(let i = 0; i < numberOfTries; i++) {
	const triesInfo = document.createElement("span");
	availableInfo.appendChild(triesInfo);
}

// create a 5x6 grid where user will enter the guesses 
export const gameboard = document.getElementById("gameboard");

for(let i = 0; i < numberOfTries; i++) {
	const gameboardRows = document.createElement("div");
	gameboard.appendChild(gameboardRows);

	for(let j = 0; j < wordsLength; j++) {
		const gameboardCols = document.createElement("span");
		gameboardRows.appendChild(gameboardCols);
	}
}

// create the keyboard
export const keyboard = document.getElementById("keyboard");

for(let i = 0, len = letters.length; i < len; i++) {
	const keyboardRows = document.createElement("div");
	keyboard.appendChild(keyboardRows);

	for(let j = 0, len = letters[i].length; j < len; j++) {
		const keyboardCols = document.createElement("span");
		keyboardCols.innerText = letters[i][j].toUpperCase();
		keyboardRows.appendChild(keyboardCols);
	}
}

// create spans where will be displayed optimal words of each algorithm
for(let i = 0; i < 6; i++) {
	const currentAlgo = algorithms.getElementsByTagName("div");
	for(let j = 0; j < displayedList+1; j++) {
		const algoSpan = document.createElement("span");
		currentAlgo[i].appendChild(algoSpan);
	}
}

// create modals for win or lose scene
const finalBg = document.getElementById("finalBg");
const finalScene = document.getElementById("finalScene");
const finalMessage = document.getElementById("finalMessage");
const replayButton = document.getElementById("replayButton");

export async function endScene(msg, btn) {
	finalBg.style.display = "flex";
	finalMessage.innerText = msg;
	replayButton.innerText = btn.toUpperCase();

	finalBg.classList.add("showBg");
	await waitTime(200);
	finalScene.classList.add("showDiv");
}

replayButton.addEventListener('click', async function() {
	finalScene.classList.add("hideDiv");
	await waitTime(300);
	finalBg.classList.add("hideBg");
	await waitTime(200);
	document.location.reload();
});