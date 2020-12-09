import { maxLengthArray, sumArray } from "../_lib/array";
import { input } from "./input";

const numbers = input.split("\n").map(x => parseInt(x, 10));

const PREAMBLE_SIZE = 25;

const cache = maxLengthArray<number>(PREAMBLE_SIZE);

const cacheContainsSummands = (target: number) => {
    const cacheValues = cache.getValue();
    
    for (const [aIndex, a] of cacheValues.entries()) {
        for (const [bIndex, b] of cacheValues.entries()) {
            if (aIndex === bIndex) {
                continue;
            }

            if ((a + b) === target) {
                return true;
            }
        }
    }

    return false;
};

const findContigiousSummandSet = (target: number, startIndex: number = 0): number[] => {
    const factors: number[] = [];

    let currentIndex = startIndex;

    while (sumArray(factors) < target && (currentIndex < numbers.length - 1)) {
        factors.push(numbers[currentIndex]);

        currentIndex++;
    }

    if (sumArray(factors) === target) {
        return factors;
    }

    return findContigiousSummandSet(target, startIndex + 1);
};

const findEncryptionWeakness = (target: number) => {
    console.log(`Finding encryption weakness for ${target}`);

    const summands = findContigiousSummandSet(target);

    summands.sort((a, b) => b - a);

    const highest = summands[0];
    const lowest = summands[summands.length - 1];

    const weakness = highest + lowest;

    console.log(`result: ${weakness}`);
};

for (const number of numbers) {
    const preambleReceived = cache.atLimit();

    if (preambleReceived && !cacheContainsSummands(number)) {
        findEncryptionWeakness(number);
        break;
    }

    cache.push(number);
}
