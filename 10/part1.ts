import { input } from "./input";

const inputAdapters = input.split("\n").map(x => parseInt(x, 10));

inputAdapters.sort((a, b) => a - b);

const getDifferencesRecursive = (
    adapters: number[],
    currentJoltage = 0,
    differences = { oneJolt: 0, threeJolt: 0 }
): { oneJolt: number, threeJolt: number } => {
    if (adapters.length === 0) {
        return {
            oneJolt: differences.oneJolt,
            threeJolt: differences.threeJolt + 1
        };
    }

    const [lowest, ...remaining] = adapters;

    const difference = lowest - currentJoltage;

    if (difference > 3) {
        throw Error("oops");
    }

    return getDifferencesRecursive(
        remaining,
        lowest,
        {
            oneJolt: difference === 1 ? differences.oneJolt + 1 : differences.oneJolt,
            threeJolt: difference === 3 ? differences.threeJolt + 1 : differences.threeJolt
        }
    );
};

const differences = getDifferencesRecursive(inputAdapters);
const answer = differences.oneJolt * differences.threeJolt;

console.log(answer);
