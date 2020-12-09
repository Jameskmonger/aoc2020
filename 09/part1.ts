import { maxLengthArray } from "../_lib/array";
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

for (const number of numbers) {
    const preambleReceived = cache.atLimit();

    if (preambleReceived && !cacheContainsSummands(number)) {
        console.log(`No summands found for ${number}`);
        break;
    }

    cache.push(number);
}
