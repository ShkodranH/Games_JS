export const levelsData = [
    {
        level: 1,
        pictures: ['book-1.png', 'book-2.png', 'book-3.png', 'book-4.png'],
        answer: 'book'
    },
    {
        level: 2,
        pictures: ['green-1.png', 'green-2.png', 'green-3.png', 'green-4.png'],
        answer: 'green'
    },
    {
        level: 3,
        pictures: ['chest-1.png', 'chest-2.png', 'chest-3.png', 'chest-4.png'],
        answer: 'chest'
    },
    {
        level: 4,
        pictures: ['fan-1.png', 'fan-2.png', 'fan-3.png', 'fan-4.png'],
        answer: 'fan'
    },
    {
        level: 5,
        pictures: ['game-1.png', 'game-2.png', 'game-3.png', 'game-4.png'],
        answer: 'game'
    },
    {
        level: 6,
        pictures: ['water-1.png', 'water-2.png', 'water-3.png', 'water-4.png'],
        answer: 'water'
    },
    {
        level: 7,
        pictures: ['ball-1.png', 'ball-2.png', 'ball-3.png', 'ball-4.png'],
        answer: 'ball'
    },
    {
        level: 8,
        pictures: ['net-1.png', 'net-2.png', 'net-3.png', 'net-4.png'],
        answer: 'net'
    },
    {
        level: 9,
        pictures: ['date-1.png', 'date-2.png', 'date-3.png', 'date-4.png'],
        answer: 'date'
    },
    {
        level: 10,
        pictures: ['vacuum-1.png', 'vacuum-2.png', 'vacuum-3.png', 'vacuum-4.png'],
        answer: 'vacuum'
    },
    {
        level: 11,
        pictures: ['fast-1.png', 'fast-2.png', 'fast-3.png', 'fast-4.png'],
        answer: 'fast'
    },
    {
        level: 12,
        pictures: ['train-1.png', 'train-2.png', 'train-3.png', 'train-4.png'],
        answer: 'train'
    },
    {
        level: 13,
        pictures: ['capture-1.png', 'capture-2.png', 'capture-3.png', 'capture-4.png'],
        answer: 'capture'
    },
    {
        level: 14,
        pictures: ['hot-1.png', 'hot-2.png', 'hot-3.png', 'hot-4.png'],
        answer: 'hot'
    },
    {
        level: 15,
        pictures: ['old-1.png', 'old-2.png', 'old-3.png', 'old-4.png'],
        answer: 'old'
    },
    {
        level: 16,
        pictures: ['drink-1.png', 'drink-2.png', 'drink-3.png', 'drink-4.png'],
        answer: 'drink'
    },
    {
        level: 17,
        pictures: ['full-1.png', 'full-2.png', 'full-3.png', 'full-4.png'],
        answer: 'full'
    },
    {
        level: 18,
        pictures: ['hard-1.png', 'hard-2.png', 'hard-3.png', 'hard-4.png'],
        answer: 'hard'
    },
];
// Adding the folder path to each picture src
levelsData.forEach(el => el.pictures.forEach((e, i, arr) => arr[i] = `./images/${e}`));