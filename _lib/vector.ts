export type Vector2D = { x: number, y: number };

export const addVectors = (a: Vector2D, b: Vector2D): Vector2D => {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    };
};
