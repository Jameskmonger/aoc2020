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

// get visible tiles following the 8 cardinal directions
const getVisibleTiles = (grid: Tile[][], x: number, y: number) => {
    const tiles: Tile[] = [];

    // [x, y]
    const DIRECTIONS = [
        [-1, -1], // NW,
        [ 0, -1], // N,
        [ 1, -1], // NE
        [-1,  0], // W,
        [ 1,  0], // E
        [-1,  1], // SW,
        [ 0,  1], // S,
        [ 1,  1], // SE
    ];

    for (const [ dX, dY ] of DIRECTIONS) {        
        let visibleTile = null;
        let _x = x, _y = y;

        while (visibleTile === null) {
            _x += dX;
            _y += dY;

            // exclude out-of-bounds tiles
            if (grid[_y] === undefined || grid[_y][_x] === undefined) {
                break;
            }

            if (grid[_y][_x] !== Tile.FLOOR) {
                visibleTile = grid[_y][_x];
            } 
        }

        if (visibleTile) {
            tiles.push(visibleTile);
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

            const visible = getVisibleTiles(state, x, y);

            if (tile === Tile.EMPTY_SEAT) {
                const shouldChange = visible.every(t => t !== Tile.OCCUPIED_SEAT);

                if (shouldChange) {
                    newRow[x] = Tile.OCCUPIED_SEAT;
                    changed = true;
                }

                continue;
            }

            if (tile === Tile.OCCUPIED_SEAT) {
                const shouldChange = visible.filter(t => t === Tile.OCCUPIED_SEAT).length >= 5;

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
