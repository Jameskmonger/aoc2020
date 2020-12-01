import { input } from "./input";

const numbers = input.split("\n").map(line => parseInt(line, 10));

const getAnswer = (target) => {
    for (const [aIndex, a] of numbers.entries()) {
        for (const [bIndex, b] of numbers.entries()) {
            for (const [cIndex, c] of numbers.entries()) {
                if (aIndex === bIndex || aIndex === cIndex || bIndex === cIndex) {
                    continue;
                }

                if ((a + b + c) === target) {
                    return a * b * c;
                }
            }
        }
    }
};

const answer = getAnswer(2020);

console.log(answer);