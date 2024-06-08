const prompt = require("prompt-sync")();
const fs = require("fs");

const currenciesJSON = JSON.parse(fs.readFileSync("./data/currencies.json"));
const currencies = Array.from(currenciesJSON.currencies);

function validateDate(dateString) {
    if (dateString) {
        let dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (!dateRegex.test(dateString)) {
            return false;
        }
        let date = Date.parse(dateString);
        let today = new Date();
        return date < today;
    }
    return false;
}

function validateCurrency(currency) {
    currency = currency.toUpperCase();
    return currencies.find((c) => c === currency) != undefined;
}

function validateAmount(amount) {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(amount);
}

function validateInput(type) {
    let validator;
    let message;
    switch (type) {
        case "currency":
            validator = validateCurrency;
            message = "Please enter a valid currency code";
            break;
        case "amount":
            validator = validateAmount;
            message = "Please enter a valid amount";
            break;
    }

    while (true) {
        let input = prompt();
        if (input.toLowerCase() === "end") process.exit(0);
        if (validator(input)) return input;
        console.log(message);
    }
}

module.exports = {
    validateDate,
    validateInput,
};
