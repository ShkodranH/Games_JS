var words = [
    {
        hint: "Animals",
        arr: ["cat", "frog", "chicken", "turtle", "crab", 
        "rabbit", "shark", "crocodile", "giraffe", "cow", 
        "horse", "butterfly", "bull", "pig", "rhino", 
        "sheep", "snake", "panda", "fish", "penguin", 
        "tiger", "duck", "bat", "fox", "elephant", 
        "spider", "fly", "mouse", "monkey", "bird", 
        "dog", "skunk", "eagle", "swan", "bee", 
        "wolf", "lion", "owl", "caterpillar", "gorilla", 
        "hippo", "beetle", "kangaroo", "snail", "goat", 
        "parrot", "whale", "grasshoper", "ant", "camel", 
        "lizard", "zebra", "donkey", "scorpion", "squirrel", 
        "bear", "dolphin", "octopus", "deer", "peacock"]
    },
    {
        hint: "Food",
        arr: ["hamburger", "chocolate", "noodles", "apple", "sandwich", 
        "peas", "mango", "muffin", "candy", "oranges", 
        "coconut", "banana", "fish", "pie", "egg", 
        "lettuce", "broccoli", "lime", "milk", "sushi", 
        "avocado", "tomato", "beef", "coffee", "lemonade", 
        "cheeseburger", "spaghetti", "watermelon", "donut", "melon", 
        "pear", "celery", "burrito", "cauliflower", "walnut", 
        "lemon", "corn", "lollipop", "croissant", "eggplant", 
        "cake", "steak", "cherries", "olives", "pizza", 
        "cheese", "soup", "waffles", "grapefruit", "salad", 
        "onion", "kebabs", "pumpkin", "tea", "ginger", 
        "carrot", "rice", "garlic", "mushroom", "strawberry", 
        "cucumber", "potato", "pineapple", "chips", "milkshake", 
        "cereal", "sausage", "popcorn", "cookie", "cola", 
        "taco", "kiwi"]
    },
    {
        hint: "Countries",
        arr: ["usa", "canada", "mexico", "brasil", "argentina", 
        "japan", "china", "russia", "egypt", "india", 
        "italy", "turkey", "belgium", "england", "france", 
        "albania", "germany", "spain", "kosovo", "afghanistan", 
        "australia", "austria", "bangladesh", "bulgaria", "colombia", 
        "denmark", "finland", "georgia", "greece", "hungary", 
        "iceland", "indonesia", "nepal", "pakistan", "philippines", 
        "slovenia", "singapore", "sweden", "switzerland", "syria", 
        "thailand", "yemen"]
    },
    {
        hint: "Body parts",
        arr: ["eyes", "teeth", "toes", "head", "eyebrown", 
        "ears", "hair", "shoulder", "tongue", "bones", 
        "hand", "finger", "knee", "moustache", "ankle", 
        "nose", "leg", "thumb", "neck", "heel", 
        "mouth", "beard", "elbow", "belly", "armpit", 
        "arm", "foot", "wrist", "chin", "nail", 
        "face", "chest"]
    },
    {
        hint: "Colors",
        arr: ["black", "white", "gray", "red", "yellow", 
        "blue", "orange", "green", "purple", "pink", 
        "brown"]
    },
    {
        hint: "Household items",
        arr: ["bed", "computer", "mirror", "bin", "chair", 
        "door", "picture", "stove", "sofa", "book", 
        "cupboard", "pillow", "rug", "window", "shelves", 
        "clock", "table", "plant", "dresser", "light", 
        "desk", "fan", "heater", "doormat", "lockers", 
        "lamp", "fridge", "tv", "stool", "vase", 
        "remote", "bookcase", "curtain"]
    },
    {
        hint: "Vehicle",
        arr: ["bike", "car", "van", "scooter", "rocket", 
        "bus", "truck", "ambulance", "skateboard", "plane", 
        "train", "helicopter", "tractor", "motorbike", "boat", 
        "limo", "moped"]
    }, 
    {
        hint: "Sports",
        arr: ["soccer", "cycling", "weightlifting", "diving", "basketball", 
        "baseball", "football", "hockey", "bowling", "swimming", 
        "chess", "cricket", "archery", "boxing", "volleyball", 
        "skateboarding", "golf", "tennis", "running", "skiing", 
        "karate", "surfing", "darts", "rugby", "javelin", 
        "badminton"]
    }
]
var rand1 = Math.floor(Math.random() * words.length);
var rand2 = Math.floor(Math.random() * words[rand1].arr.length);
var currentWord = words[rand1].arr[rand2];
var lives = 9;
const keyArr = [];

document.getElementById('keywords').innerHTML = words[rand1].hint;

for(let i = 0; i < currentWord.length; i++) {
    var span = document.createElement("span");
    document.getElementById('word').appendChild(span); 
}

function play() {
    document.getElementById('intro').style.display = "none";
    document.getElementById('main').style.display = "flex";
    document.getElementById('hangman').style.display = "flex";
}

function hangman(n) {
    if(n == 8) {
        document.getElementById('base').style.display = "block";
        document.getElementById('support').style.display = "block";
    }
    if(n == 7) {
        document.getElementById('rope').style.display = "block";
        document.getElementById('upper').style.display = "block";
    }
    if(n == 6) {
        document.getElementById('head').style.display = "block";
    }
    if(n == 5) {
        document.getElementById('body').style.display = "block";
    }
    if(n == 4) {
        document.getElementById('leftArm').style.display = "block";
    }
    if(n == 3) {
        document.getElementById('rightArm').style.display = "block";
    }
    if(n == 2) {
        document.getElementById('leftLeg').style.display = "block";
    }
    if(n == 1) {
        document.getElementById('rightLeg').style.display = "block";
    }
    if(n == 0) {
        document.getElementById('mouth').style.display = "block";
        document.getElementById('leftEye').style.display = "block";
        document.getElementById('leftEye2').style.display = "block";
        document.getElementById('rightEye').style.display = "block";
        document.getElementById('rightEye2').style.display = "block";
        setTimeout(function() {
            alert("You Lost");
            document.location.reload();
        }, 100);
    }
}

function win() {
    let count2 = 0;
    for(let i = 0; i < currentWord.length; i++){
        if (document.getElementById('word').getElementsByTagName('span')[i].innerHTML != "") {
            count2++;
        }
    }
    if(currentWord.length == count2) {
        setTimeout(function() {
            alert("You Win");
            document.location.reload();
        }, 100);
    }   
}

function board(elem) {
    elem.style.visibility = "hidden"; 
}

function key(char) {
    let count = 0;
    for(let j = 0; j < currentWord.length; j++) {
        if(currentWord[j] == char) {
            document.getElementById('word').getElementsByTagName('span')[j].innerHTML = char;
            count++;
        }
    }
    if(count == 0) {
        lives--;
    }

    hangman(lives);
    win();
}

function keyboard(event) {
    let x = event.key;
    for(let i = 65; i < 91; i++) {
        if (event.keyCode == i && !keyArr.includes(x)) {
            key(x);
            document.getElementById('char').getElementsByTagName('span')[i-65].style.visibility = "hidden";
            keyArr.push(x);
        } 
    } 
}