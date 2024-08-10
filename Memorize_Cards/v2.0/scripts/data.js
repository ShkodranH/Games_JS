export const levelsData = [
    {
        level: 1,
        images: imagesArray.sort(() => Math.random() - 0.5).slice(0, 4),
    },
    {
        level: 2,
        pictures: ['green-1.png', 'green-2.png', 'green-3.png', 'green-4.png'],
        answer: 'green'
    },
];
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