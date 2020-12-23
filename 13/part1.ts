import { input } from "./input";

const [earliest, ...busIds] = input
    .replace(/,/g, '\n')
    .split('\n')
    .filter(line => line !== 'x')
    .map(n => parseInt(n, 10));

const findBus = (time: number) => busIds.find(busId => time % busId === 0);

let currentTime = earliest;
let validBus = findBus(currentTime);

while (!validBus) {
    currentTime++;
    validBus = findBus(currentTime);
}

console.log(validBus * (currentTime - earliest));
