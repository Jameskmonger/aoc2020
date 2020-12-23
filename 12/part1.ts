import { input } from "./input";

type State = { heading: number; north: number; east: number; };

const DIRECTION_FOR_HEADING = {
    0: "N",
    90: "E",
    180: "S",
    270: "W"
};

type Instruction = { action: string; value: number }
const parseInstruction = (x: string) => {
    const [_, action, value] = /(\w)(\d+)/.exec(x);

    return { action, value: parseInt(value, 10) };
};
const instructions: Instruction[] = input.split("\n").map(parseInstruction);

const initialState: State = {
    heading: 90,
    north: 0,
    east: 0
};
const reducer = (state: State, { action, value }: Instruction) => {
    switch (action) {
        case "L":
            return { ...state, heading: (state.heading - value + 360) % 360 };
        case "R":
            return { ...state, heading: (state.heading + value) % 360 };

        case "N":
            return { ...state, north: state.north + value };
        case "E":
            return { ...state, east: state.east + value };
        case "S":
            return { ...state, north: state.north - value };
        case "W":
            return { ...state, east: state.east - value };

        // figure out the cardinal direction and then just use the logic above again
        case "F": {
            const direction = DIRECTION_FOR_HEADING[state.heading];

            if (!direction) {
                console.log(state.heading)
                throw Error("unhandled direction")
            }
            
            return reducer(state, { action: direction, value });
        }
    }

    throw Error("unhandled action")
};

const finalState = instructions.reduce(reducer, initialState);

const answer = Math.abs(finalState.east) + Math.abs(finalState.north);

console.log(answer);
