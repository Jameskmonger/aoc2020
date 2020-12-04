import { input } from "./input";

const newlinesToWhitespace = (input: string) => input.replace(/(?:\r\n|\r|\n)/g, " ");

const parseKeyValue = (input: string) => {
    const [ key, value ] = input.split(":");

    return { key, value };
};

const parsePassport = (passport: string) => newlinesToWhitespace(passport).split(" ").map(parseKeyValue);
const getPassportEntries = () => input.split("\n\n").map(parsePassport);

const REQUIRED_FIELDS = [ "byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid" ]

const isPassportValid = (passport: { key: string }[]) => {
    for (const field of REQUIRED_FIELDS) {
        const containsKey = passport.some(p => p.key === field);

        if (!containsKey) {
            return false;
        }
    }

    return true;
};

const answer = getPassportEntries().filter(isPassportValid).length;

console.log(answer);
