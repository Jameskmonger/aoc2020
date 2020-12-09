export const maxLengthArray = <T>(limit: number) => {
    const arr: T[] = [];
    const getValue = () => arr;
    const atLimit = () => arr.length >= limit;

    const push = (item: T) => {
        if (arr.length >= limit) {
            arr.shift();
        }

        arr.push(item);
    };

    return {
        push,
        atLimit,
        getValue
    };
};

export const sumArray = (arr: number[]) => arr.reduce((acc, cur) => acc + cur, 0);
export const multiplyArray = (arr: number[]) => arr.reduce((acc, cur) => acc * cur, 1);
