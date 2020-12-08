import { input } from "./input";

type Bag = { name: string; children: { name: string, amount: number }[] };

const BAG_LINE_REGEX = /(\w+ \w+) bags contain (no other bags|.+)\./;
const BAG_CHILD_REGEX = /(\d+) ([a-zA-Z ]+) bags*/g;

const parseChildren = (line: string) => {
    if (line === "no other bags") {
        return [];
    }

    const matches = [...line.matchAll(BAG_CHILD_REGEX)];
    
    // index 2 in each match is the bag colour
    return matches.map(match => ({
        amount: parseInt(match[1], 10),
        name: match[2]
    }));
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

const countBagChildrenRecursive = (bag: Bag) => {
    let count = 0;

    for (const child of bag.children) {
        count += child.amount;

        const childBag = bags.find(b => b.name === child.name);
        count += (countBagChildrenRecursive(childBag) * child.amount);
    }

    return count;
};

const shinyGold = bags.find(b => b.name === "shiny gold");

console.log(countBagChildrenRecursive(shinyGold));
