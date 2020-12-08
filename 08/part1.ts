import { input } from "./input";

type Instruction = { instruction: string, amount: number };

const INSTRUCTION_REGEX = /(\w+) ([\+\-0-9]+)/;
const parseInstruction = (line: string): Instruction => {
    const result = INSTRUCTION_REGEX.exec(line);

    const [_, instruction, amount] = result;

    return {
        instruction,
        amount: parseInt(amount, 10)
    };
};

const processInstructions = (instructions: Instruction[]) => {
    const processedInstructions = new Map<number, boolean>();

    let pointer = 0;
    let accumulator = 0;

    while (true) {
        if (processedInstructions.get(pointer)) {
            return accumulator;
        }

        const { instruction, amount } = instructions[pointer];
        processedInstructions.set(pointer, true);

        if (instruction === "nop") {
            pointer++;
            continue;
        } else if (instruction === "jmp") {
            pointer += amount;
            continue;
        } else if (instruction === "acc") {
            accumulator += amount;
            pointer++;
            continue;
        }
    }
}

const instructions = input.split("\n").map(parseInstruction);

console.log(
    processInstructions(instructions)
);
