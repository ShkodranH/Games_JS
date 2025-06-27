export const imagesArray = [
    'apple.png',
    'butterfly.png',
    'cake.png',
    'diamond.png',
    'factory.png',
    'planet.png',
    'presents.png',
    'rocket.png',
    'stars.png',
    'tree.png'
]
// Adding the folder path to each image src
imagesArray.forEach((e, i, arr) => arr[i] = `./images/${e}`);