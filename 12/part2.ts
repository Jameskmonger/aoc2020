import { input } from "./input";

type State = { north: number; east: number; dNorth: number; dEast: number; };

type Instruction = { action: string; value: number }
const parseInstruction = (x: string) => {
    const [_, action, value] = /(\w)(\d+)/.exec(x);

    return { action, value: parseInt(value, 10) };
};
const instructions: Instruction[] = input.split("\n").map(parseInstruction);

const initialState: State = {
    north: 0,
    east: 0,
    dNorth: 1,
    dEast: 10
};
const reducer = (state: State, { action, value }: Instruction): State => {
    switch (action) {
        case "L": {
            const rotations = value / 90;
            
            let { dNorth, dEast } = state;

            for (let i = 0; i < rotations; i++) {
                const tempEast = dEast;
                dEast = -dNorth;
                dNorth = tempEast;
            }

            return { ...state, dNorth, dEast };
        }
        case "R": {
            const rotations = value / 90;
            
            let { dNorth, dEast } = state;

            for (let i = 0; i < rotations; i++) {
                const tempEast = dEast;
                dEast = dNorth;
                dNorth = -tempEast;
            }
            return { ...state, dNorth, dEast };
        }

        case "N":
            return { ...state, dNorth: state.dNorth + value };
        case "E":
            return { ...state, dEast: state.dEast + value };
        case "S":
            return { ...state, dNorth: state.dNorth - value };
        case "W":
            return { ...state, dEast: state.dEast - value };

        case "F":
            return {
                ...state,
                north: state.north + (state.dNorth * value),
                east: state.east + (state.dEast * value)
            };
    }

    throw Error("unhandled action");
};

const finalState = instructions.reduce(reducer, initialState);

const answer = Math.abs(finalState.east) + Math.abs(finalState.north);

console.log(answer);
