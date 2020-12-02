import { input } from "./input";

type PasswordDetails = { min: number, max: number, char: string, pass: string };

const regex = /(\d+)\-(\d+) (\w)\: (\w+)/;
const parseLine = (line: string): PasswordDetails => {
    const [_, min, max, char, pass] = regex.exec(line);

    return { min: parseInt(min, 10), max: parseInt(max, 10), char, pass };
};
const passwords = input.split("\n").map(parseLine);

const passwordIsValid = (line: PasswordDetails) => {
    const count = line.pass.split("").filter(c => c === line.char).length;

    return line.min <= count && count <= line.max;
}

const getAnswer = () => {
    return passwords.filter(passwordIsValid).length;
};

const answer = getAnswer();

console.log(answer);