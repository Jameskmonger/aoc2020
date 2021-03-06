import { addVectors, Vector2D } from "../_lib/vector";
import { input } from "./input";

enum GridEntity {
    EMPTY,
    TREE
}

const parseLine = (line: string): GridEntity[] => line.split("").map(c => c === "#" ? GridEntity.TREE : GridEntity.EMPTY);
const map = input.split("\n").map(parseLine);

const getMapTile = (location: Vector2D): GridEntity => {
    // past bottom of map
    if (location.y >= map.length) {
        return null;
    }

    const row = map[location.y];

    // use mod for wraparound
    return row[location.x % row.length];
};

const traverse = (from: Vector2D, direction: Vector2D, treeCount: number = 0) => {
    const target = addVectors(from, direction);

    const tile = getMapTile(target);

    if (tile === null) {
        return treeCount;
    }

    const newTreeCount = (tile === GridEntity.TREE) ? treeCount + 1 : treeCount;

    return traverse(target, direction, newTreeCount);
};

const answer = traverse({ x: 0, y: 0 }, { x: 3, y: 1 });

console.log(answer);
