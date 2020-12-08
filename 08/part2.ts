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

const processInstructions = (instructions: Instruction[]): { result: number, error: boolean } => {
    const processedInstructions = new Map<number, boolean>();

    let pointer = 0;
    let accumulator = 0;

    while (pointer < instructions.length) {
        if (processedInstructions.get(pointer)) {
            return {
                result: accumulator,
                error: true
            };
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

    return {
        result: accumulator,
        error: false
    };
}

const instructions = input.split("\n").map(parseInstruction);

const flipBrokenInstruction = (instruction: string) => instruction === "nop" ? "jmp" : "nop";
const bruteforceFixInstructions = () => {
    let result = null;

    for (let pointer = 0; pointer < instructions.length; pointer++) {
        const instruction = instructions[pointer];

        // acc instructions werent changed
        if (instruction.instruction === "acc") {
            continue;
        }
        
        instructions[pointer] = {
            instruction: flipBrokenInstruction(instruction.instruction),
            amount: instruction.amount
        };
        const { result, error } = processInstructions(instructions);

        if (!error) {
            return result;
        }

        instructions[pointer] = instruction;
    }

    return result;
};

console.log(
    bruteforceFixInstructions()
);
