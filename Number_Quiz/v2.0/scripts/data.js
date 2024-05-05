export const questionData = [
    {
        level: 1,
        question: "1, 3, 5, ?",
        hint: "+ 2",
        answer: "7"
    },
    {
        level: 2,
        question: "6, 12, 24, ?",
        hint: "x 2",
        answer: "48"
    },
    {
        level: 3,
        question: "6 = 30\n3 = 15\n7 = 35\n4 = ?  ",
        hint: "n = 5n",
        answer: "20"
    },
    {
        level: 4,
        question: " 5    4    6    7    5\n30  12  42  63  ?\n 6    3    7    9    8",
        hint: "R1 * R3 = R2",
        answer: "40"
    },
    {
        level: 5,
        question: "A + 3B = 60\nA - 2B  = 10\nA ÷ B = ?",
        hint: "R1 - R2",
        answer: "3"
    },
    {
        level: 6,
        question: "0, 40, 70, ?, 100",
        hint: "+ (n - 10)",
        answer: "90"
    },
    {
        level: 7,
        question: "B12 = 24\nA29 = 29\nD51 = ?  ",
        hint: "A = 1, B = 2, ...",
        answer: "204"
    },
    {
        level: 8,
        question: "36 = 73\n22 = 45\n25 = 51\n49 = ? ",
        hint: "n = 2n + 1",
        answer: "99"
    },
    {
        level: 9,
        question: "8 = 72\n3 = 12\n5 = 30\n6 = ? ",
        hint: "n = n x (n + 1)",
        answer: "42"
    },
    {
        level: 10,
        question: "12, 3, 23, 5\n36, 9, 76, ?",
        hint: "a(+)b = n",
        answer: "13"
    },
    {
        level: 11,
        question: "<img src='images/square.png'> = 4\n<img src='images/hexagon.png'> = 6\n<img src='images/triangle.png'> = 3\n<img src='images/circle.png'> = ?",
        hint: "vertices",
        answer: "0"
    },
    {
        level: 12,
        question: "1 = 3\n2 = 6\n3 = 18\n4 = 72\n5 = ?",
        hint: "k (x R1) = R2",
        answer: "360"
    },
    {
        level: 13,
        question: "3 + 9 = 90\n4 + 2 = 20\n6 + 5 = 61\n1 + 8 = ? ",
        hint: "a(^2) + b(^2) = n",
        answer: "65"
    },
    {
        level: 14,
        question: "   22, 55 | 29\n   37, 85 | 61\n49, 285 | ?  ",
        hint: "a(x)b + c(x)d = n",
        answer: "116"
    },
    {
        level: 15,
        question: "4       \n6  2   \n9  ?  1",
        hint: "No help there!",
        answer: "3"
    },
]

// Replacing newlines(\n) with <br> tag 
// Replacing spaces with no breakable spaces(&nbsp;)
questionData.forEach(item => {
    item.question = item.question.replace("?", "<span>?</span>");
    item.question = item.question.replace(/\n/g, "<br>");
    item.question = item.question.replace(/ /g, "&nbsp;");
});
questionData[10].question = questionData[10].question.replace(/&nbsp;/g, " ");