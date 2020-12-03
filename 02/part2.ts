import { input } from "./input";

type PasswordDetails = { min: number, max: number, char: string, pass: string };

const regex = /(\d+)\-(\d+) (\w)\: (\w+)/;
const parseLine = (line: string): PasswordDetails => {
    const [_, min, max, char, pass] = regex.exec(line);

    return { min: parseInt(min, 10), max: parseInt(max, 10), char, pass };
};
const passwords = input.split("\n").map(parseLine);

const passwordIsValid = (line: PasswordDetails) => {
    const chars = line.pass.split("");

    const firstMatches = chars[line.min - 1] === line.char;
    const secondMatches = chars[line.max - 1] === line.char;

    return (
        (firstMatches || secondMatches)
        && firstMatches !== secondMatches
    );
}

const getAnswer = () => {
    return passwords.filter(passwordIsValid).length;
};

const answer = getAnswer();

console.log(answer);
