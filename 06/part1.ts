import { input } from "./input";

const parsePerson = (personInput: string) => personInput.split("");
const parseGroup = (groupInput: string) => groupInput.split("\n").map(parsePerson);

const groups = input.split("\n\n").map(parseGroup);

const getAnsweredQuestionCount = (group: string[][]) => {
    return group.reduce<{ tracked: { [key: string]: boolean }, total: number }>((acc, personAnswers) => {
        for (const answer of personAnswers) {
            // skip if we've already tracked this question for the group
            if (acc.tracked[answer]) {
                continue;
            }

            acc.tracked[answer] = true;
            acc.total++;
        }

        // messy to mutate this but ehhh it's AoC and I'm 2 days behind :)
        return acc;
    }, { tracked: { }, total: 0 }).total;
};

console.log(
    groups
        .map(getAnsweredQuestionCount)
        .reduce((acc, cur) => acc + cur)
);
