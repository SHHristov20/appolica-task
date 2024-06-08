const date = process.argv[2];

const { validateDate, validateInput } = require("./modules/validation");
const { convertCurrency } = require("./modules/currencyConvertor");

if (!validateDate(date)) {
    console.log(
        "Please enter a date in the format YYYY-MM-DD. Date should be in the past."
    );
    process.exit();
}

async function currencyConvertor() {
	while (true) {
		let amount = validateInput("amount");
        let baseCurrency = validateInput("currency").toUpperCase();
        let toCurrency = validateInput("currency").toUpperCase();
        let result = await convertCurrency(
			date,
            amount,
            baseCurrency,
            toCurrency
        );
        console.log(`${amount} ${baseCurrency} is ${result} ${toCurrency}`);
    }
}

currencyConvertor();
