export const imagesArray = [
    'naruto.png',
    'sasuke.png',
    'sakura.png',
    'kakashi.png',
    'hinata.png',
    'minato.png',
    'itachi.png',
    'killer-bee.png',
    'boruto.png',
    'sarada.png',
    'mitsuki.png',
    'kawaki.png' 
]
// Adding the folder path to each image src
imagesArray.forEach((e, i, arr) => arr[i] = `./images/${e}`);