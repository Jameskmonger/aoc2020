import { input } from "./input";

enum Tile { FLOOR, EMPTY_SEAT, OCCUPIED_SEAT }
const TILE_FOR_CHAR = {
    '.': Tile.FLOOR,
    'L': Tile.EMPTY_SEAT,
    '#': Tile.OCCUPIED_SEAT
};
const CHAR_FOR_TILE = {
    [Tile.FLOOR]: '.',
    [Tile.EMPTY_SEAT]: 'L',
    [Tile.OCCUPIED_SEAT]: '#'
};
const printGrid = (grid: Tile[][]) => grid.map(row => row.map(tile => CHAR_FOR_TILE[tile]).join("")).join("\n");

const parseLine = (line: string): Tile[] => line.split("").map(char => TILE_FOR_CHAR[char]);
const inputState = input.split("\n").map(parseLine);

// get the (up to) 8 adjacent tiles
const getAdjacentTiles = (grid: Tile[][], x: number, y: number) => {
    const tiles: Tile[] = [];

    for (let _y = y - 1; _y <= y + 1; _y++) {
        // exclude out-of-bounds rows
        if (!grid[_y]) {
            continue;
        }

        for (let _x = x - 1; _x <= x + 1; _x++) {
            // exclude ourself and out-of-bound rows
            if (
                (_y === y && _x === x)
                || !grid[_y][_x]
            ) {
                continue;
            }

            tiles.push(grid[_y][_x]);
        }
    }

    return tiles;
};

const mutate = (state: Tile[][]) => {
    const newState: Tile[][] = [];

    let changed = false;

    for (let y = 0; y < state.length; y++) {
        const newRow = [ ...state[y] ];

        for (let x = 0; x < newRow.length; x++) {
            const tile = state[y][x];

            if (tile === Tile.FLOOR) {
                continue;
            }

            const adjacent = getAdjacentTiles(state, x, y);

            if (tile === Tile.EMPTY_SEAT) {
                const shouldChange = adjacent.every(t => t !== Tile.OCCUPIED_SEAT);

                if (shouldChange) {
                    newRow[x] = Tile.OCCUPIED_SEAT;
                    changed = true;
                }

                continue;
            }

            if (tile === Tile.OCCUPIED_SEAT) {
                const shouldChange = adjacent.filter(t => t === Tile.OCCUPIED_SEAT).length >= 4;

                if (shouldChange) {
                    newRow[x] = Tile.EMPTY_SEAT;
                    changed = true;
                }

                continue;
            }
        }

        newState.push(newRow);
    }

    return {
        state: newState,
        changed
    };
};

let state = { changed: true, state: inputState };
while (state.changed) {
    state = mutate(state.state);
}

const answer = state.state.map(row => row.filter(tile => tile === Tile.OCCUPIED_SEAT).length).reduce((acc, cur) => acc + cur, 0);

console.log(answer);
