import { input } from "./input";

type BusInfo = { id: number, index: number };

const parseBusIds = (line: string): BusInfo[] => line.split(',').map((id, index) => ({ id: parseInt(id, 10), index }))

const [ initialBus, ...remainingBuses ]: BusInfo[] = parseBusIds(input.split('\n')[1]).filter(({ id }) => !Number.isNaN(id));    

let currentTime = 0;
let offset = initialBus.id;

for (const { id, index } of remainingBuses) {
    while (true) {
        const shouldStop = (currentTime + index) % id === 0;

        if (shouldStop) {
            offset *= id;
            break;
        }

        currentTime += offset;
    }
}

console.log(currentTime);
