import { input } from "./input";

enum BSPInstruction { UPPER, LOWER }

// assumes there are no invalid characters in the input
const generateBSPInstructions =
    (lowerChar: string, input: string): BSPInstruction[] =>
        input.split("").map(c => c === lowerChar ? BSPInstruction.LOWER : BSPInstruction.UPPER);

const BOARDING_PASS_REGEX = /((?:B|F){7})((?:L|R){3})/;
const splitBoardingPassInstructions = (pass: string): { row: BSPInstruction[], col: BSPInstruction[] } => {
    const result = BOARDING_PASS_REGEX.exec(pass);

    if (result === null) {
        return null;
    }

    return {
        row: generateBSPInstructions("F", result[1]),
        col: generateBSPInstructions("L", result[2])
    };
};

const calculateBSPLocation = (instructions: BSPInstruction[], max: number, min: number = 0): number => {
    const next = instructions.shift();

    const midPoint = Math.ceil((max - min) / 2);

    if (instructions.length === 0) {
        if (next === BSPInstruction.LOWER) {
            return min;
        } else if (next === BSPInstruction.UPPER) {
            return max;
        }
    }

    if (next === BSPInstruction.LOWER) {
        max = max - midPoint;
    } else if (next === BSPInstruction.UPPER) {
        min = min + midPoint;
    }

    return calculateBSPLocation(instructions, max, min);
};

const calculateSeatId = ({ row, col }: { row: BSPInstruction[], col: BSPInstruction[] }) => {
    const rowPosition = calculateBSPLocation(row, 127);
    const colPosition = calculateBSPLocation(col, 7);

    return rowPosition * 8 + colPosition;
};

const seatIds = input.split("\n").map(splitBoardingPassInstructions).map(calculateSeatId);
seatIds.sort((a, b) => a - b);

const getMissingSeatId = () => {
    for (let i = seatIds[0]; i < seatIds.length; i++) {
        if (!seatIds.includes(i)) {
            return i;
        }
    }

    return null;
};

const answer = getMissingSeatId()

console.log(answer);
