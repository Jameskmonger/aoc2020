import { input } from "./input";

const newlinesToWhitespace = (input: string) => input.replace(/(?:\r\n|\r|\n)/g, " ");

const parseKeyValue = (input: string) => {
    const [key, value] = input.split(":");

    return { key, value };
};

const parsePassport = (passport: string) => newlinesToWhitespace(passport).split(" ").map(parseKeyValue);
const getPassportEntries = () => input.split("\n\n").map(parsePassport);

// === passport validation
type PassportFieldValidator = (value: string) => boolean;
type PassportField = { key: string, valid: PassportFieldValidator };

const validYear = (min: number, max: number): PassportFieldValidator =>
    x => x.length === 4 && parseInt(x, 10) >= min && parseInt(x, 10) <= max;
const validRegex = (pattern: RegExp): PassportFieldValidator => x => x.match(pattern) !== null;
const validInArray = (array: string[]): PassportFieldValidator => x => array.includes(x);

const validHeight: PassportFieldValidator = height => {
    const parsed = /^(\d+)(in|cm)$/g.exec(height);

    if (parsed === null) {
        return false;
    }

    const [ _, valueString, unit ] = parsed;
    const value = parseInt(valueString, 10);

    if (isNaN(value) || (unit !== "in" && unit !== "cm")) {
        return false;
    }

    if (unit === "in") {
        return 59 <= value && value <= 76;
    }

    if (unit === "cm") {
        return 150 <= value && value <= 193;
    }

    return false;
};

const PASSPORT_FIELDS: PassportField[] = [
    { key: "byr", valid: validYear(1920, 2002) },
    { key: "iyr", valid: validYear(2010, 2020) },
    { key: "eyr", valid: validYear(2020, 2030) },
    { key: "hgt", valid: validHeight },
    { key: "hcl", valid: validRegex(/#[0-9A-Fa-f]{6}/g) },
    { key: "ecl", valid: validInArray(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]) },
    { key: "pid", valid: validRegex(/^\d{9}$/g) }
];
// === end passport validation

const isPassportValid = (passport: { key: string, value: string }[]) => {
    for (const field of PASSPORT_FIELDS) {
        const kvp = passport.find(p => p.key === field.key);

        if (!kvp) {
            return false;
        }

        const valid = field.valid(kvp.value);

        if (!valid) {
            return false;
        }
    }

    return true;
};

const answer = getPassportEntries().filter(isPassportValid).length;

console.log(answer);
