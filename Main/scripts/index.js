let gamesData = [
    {
        name: "Number Predictor",
        link: "../Number_Predictor/v2.0/index.html",
        image: "../Number_Predictor/v2.0/images/icon.png"
    },
    {
        name: "Genius Quiz",
        link: "../Genius_Quiz/v1.0/index.html",
        image: "../Genius_Quiz/v2.0/images/icon.png"
    },
    {
        name: "Brick Breaker",
        link: "../Brick_Breaker/v1.0/index.html",
        image: "../Brick_Breaker/v2.0/images/icon.png"
    },
    {
        name: "Tic Tac Toe",
        link: "../Tic_Tac_Toe/v2.0/index.html",
        image: "../Tic_Tac_Toe/v2.0/images/icon.png"
    },
    {
        name: "Guess the Number",
        link: "../Guess_the_Number/v2.0/index.html",
        image: "../Guess_the_Number/v2.0/images/icon.png"
    },
    {
        name: "Rock Paper Scissors",
        link: "../Rock_Paper_Scissors/v2.0/index.html",
        image: "../Rock_Paper_Scissors/v2.0/images/icon.png"
    },
    {
        name: "Ping Pong",
        link: "../Ping_Pong/v1.0/index.html",
        image: "../Ping_Pong/v2.0/images/icon.png"
    },
    {
        name: "Hangman",
        link: "../Hangman/v1.0/index.html",
        image: "../Hangman/v2.0/images/icon.png"
    },
    {
        name: "4 Pictures 1 Word",
        link: "../4_Pictures_1_Word/v1.0/index.html",
        image: "../4_Pictures_1_Word/v2.0/images/icon.png"
    },
    {
        name: "Matching Tiles",
        link: "../Matching_Tiles/v1.0/index.html",
        image: "../Matching_Tiles/v2.0/images/icon.png"
    },
    {
        name: "Tank Battle",
        link: "../Tank_Battle/v1.0/index.html",
        image: "../Tank_Battle/v2.0/images/icon.png"
    },
    {
        name: "Math Test",
        link: "../Math_Test/v2.0/index.html",
        image: "../Math_Test/v2.0/images/icon.png"
    },
    {
        name: "Number Quiz",
        link: "../Number_Quiz/v2.0/index.html",
        image: "../Number_Quiz/v2.0/images/icon.png"
    },
    {
        name: "Snake",
        link: "../Snake/v1.0/index.html",
        image: "../Snake/v2.0/images/icon.png"
    },
    {
        name: "Grab the Fish",
        link: "../Grab_the_Fish/v1.0/index.html",
        image: "../Grab_the_Fish/v2.0/images/icon.png"
    },
    {
        name: "Time Challenge",
        link: "../Time_Challenge/v1.0/index.html",
        image: "../Time_Challenge/v2.0/images/icon.png"
    },
    {
        name: "Memorize Cards",
        link: "../Memorize_Cards/v1.0/index.html",
        image: "../Memorize_Cards/v2.0/images/icon.png"
    },
    {
        name: "Furious Click",
        link: "../Furious_Click/v2.0/index.html",
        image: "../Furious_Click/v2.0/images/icon.png"
    },
    {
        name: "Click Race",
        link: "../Click_Race/v1.0/index.html",
        image: "../Click_Race/v2.0/images/icon.png"
    },
    {
        name: "Merge Cars",
        link: "../Merge_Cars/v1.0/index.html",
        image: "../Merge_Cars/v2.0/images/icon.png"
    },
    {
        name: "Build the Tower",
        link: "../Build_the_Tower/v1.0/index.html",
        image: "../Build_the_Tower/v2.0/images/icon.png"
    },
    {
        name: "Wordle",
        link: "../Wordle/v1.0/index.html",
        image: "../Wordle/v2.0/images/icon.png"
    }
];

for(let item of gamesData) {
    document.querySelector('.container').innerHTML += `
        <a href="${item.link}">
            <div class="item">
                <img src="${item.image}" alt="game icon">
                <p>${item.name}</p>
            </div>
        </a>`;
}

