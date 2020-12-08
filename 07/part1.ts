import { input } from "./input";

type Bag = { name: string; children: string[] };
const bagHasChild = (child: string) => (bag: Bag) => bag.children && bag.children.includes(child);

const BAG_LINE_REGEX = /(\w+ \w+) bags contain (no other bags|.+)\./;
const BAG_CHILD_REGEX = /(\d+) ([a-zA-Z ]+) bags*/g;

const parseChildren = (line: string) => {
    if (line === "no other bags") {
        return [];
    }

    const matches = [...line.matchAll(BAG_CHILD_REGEX)];
    
    // index 2 in each match is the bag colour
    return matches.map(match => match[2]);
};
const parseBag = (line: string): Bag => {
    const result = BAG_LINE_REGEX.exec(line);

    const [ _, bagName, children ] = result;

    return {
        name: bagName,
        children: parseChildren(children)
    };
};

const bags = input.split("\n").map(parseBag);

const bagHasChildRecursive = (targetName: string) => (bag: Bag) => {
    const hasChild = bagHasChild(targetName);

    if (hasChild(bag)) {
        return true;
    }

    for (const bagChild of bag.children) {
        const child = bags.find(b => b.name === bagChild);

        const childHasBag = bagHasChildRecursive(targetName)(child);

        if (childHasBag) {
            return true;
        }
    }

    return false;
};

console.log(
    bags.filter(bagHasChildRecursive("shiny gold")).length
);
