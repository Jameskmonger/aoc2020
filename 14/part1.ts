import { sumArray } from "../_lib/array";
import { input } from "./input";

const getBinaryString = (value: number, length: number) => value.toString(2).padStart(length, '0');
const getMaskedValue = (mask: string, value: string) => {
    const val = parseInt(value, 10);
    const binary = getBinaryString(val, mask.length);

    const resultString = mask.split('').reduce(
        (acc, cur, curIdx) => acc + (cur === 'X' ? binary[curIdx] : mask[curIdx]),
        ''
    );

    return parseInt(resultString, 2);
};

const instructions = input.split('\n').map(line => line.split(" = "));

type State = {
    mask: string;
    memory: { [key: number]: number }
};
const initialState: State = { mask: null, memory: {} };

const result = instructions.reduce(
    (state, [action, value]) => {
        if (action === "mask") {
            return {
                ...state,
                mask: value
            };
        }

        const parsed = /mem\[(\d+)\]/.exec(action);
        const address = parseInt(parsed[1], 10);

        return {
            ...state,
            memory: {
                ...state.memory,
                [address]: getMaskedValue(state.mask, value)
            }
        }
    },
    initialState
);

console.log(sumArray(Object.values(result.memory)));
