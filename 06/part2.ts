import { input } from "./input";

const parsePerson = (personInput: string) => personInput.split("");
const parseGroup = (groupInput: string) => groupInput.split("\n").map(parsePerson);

const groups = input.split("\n\n").map(parseGroup);

const getAnswerCounts = (group: string[][]) => {
    return group.reduce<{ [key: string]: number }>((acc, personAnswers) => {
        for (const answer of personAnswers) {
            acc[answer] = acc[answer] ? acc[answer] + 1 : 1;
        }

        // messy to mutate this but ehhh it's AoC and I'm 2 days behind :)
        return acc;
    }, {})
};

const getPersonCount = (group: string[][]) => group.length;

const getUnanimousQuestionCount = (group: string[][]) => {
    const personCount = getPersonCount(group);
    const answerCounts = getAnswerCounts(group);

    return Object.values(answerCounts).filter(count => count === personCount).length;
};

console.log(
    groups
        .map(getUnanimousQuestionCount)
        .reduce((acc, cur) => acc + cur)
);
