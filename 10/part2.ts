import { input } from "./input";

const inputAdapters = input.split("\n").map(x => parseInt(x, 10));

inputAdapters.sort((a, b) => a - b);

const isValidAdapter = (current: number, next: number) => (next - current) <= 3;

const getValidTailCountRecursive = (
    adapters: number[],
    currentJoltage = 0,
    currentChain: number[] = []
): number => {
    const firstInvalidNode = adapters.findIndex(x => isValidAdapter(currentJoltage, x) === false);

    // if there's only 1 adapter left and it's a potential node
    // then return 1 as this is a valid tail
    if (adapters.length === 1 && firstInvalidNode === -1) {
        console.log(currentChain.join(", "))
        return 1;
    }

    // if the first node is invalid then this is an invalid branch
    if (firstInvalidNode === 0) { 
        return 0;
    }

    const potentialNodes = adapters.slice(0, firstInvalidNode);
    const remainingNodes = adapters.slice(firstInvalidNode);

    let totalChildTailCount = 0

    for (const [ index, potential ] of potentialNodes.entries()) {
        // put all the other potential nodes back in
        const newAdapters = [
            ...potentialNodes.filter((other, otherIndex) => otherIndex !== index),
            ...remainingNodes
        ].filter(other => other > potential);

        const result = getValidTailCountRecursive(newAdapters, potential, [ ...currentChain, potential ]);

        totalChildTailCount += result;
    }

    return totalChildTailCount;
};

const answer = getValidTailCountRecursive(inputAdapters);

console.log(answer);
