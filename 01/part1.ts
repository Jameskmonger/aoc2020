import { input } from "./input";

const numbers = input.split("\n").map(line => parseInt(line, 10));

const getAnswer = (target) => {
    for (const [aIndex, a] of numbers.entries()) {
        for (const [bIndex, b] of numbers.entries()) {
            if (aIndex === bIndex) {
                continue;
            }

            if ((a + b) === target) {
                return a * b;
            }
        }
    }
};

const answer = getAnswer(2020);

console.log(answer);
