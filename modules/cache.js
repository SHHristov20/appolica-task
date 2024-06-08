const fs = require("fs");

function cacheExchangeRates(date, baseCurrency, exchangeRates) {
    let fileData = fs.readFileSync("./data/exchangeRates.json");
    fileData = JSON.parse(fileData);

    let data = {
        date: date,
        base: baseCurrency,
        rates: exchangeRates,
    };

    fileData.cachedRates.push(data);

    fs.writeFileSync(
        "./data/exchangeRates.json",
        JSON.stringify(fileData, null, 2)
    );
}

function searchCachedExchangeRates(date, baseCurrency) {
    let fileData = fs.readFileSync("./data/exchangeRates.json");
    fileData = JSON.parse(fileData);
    let cachedRates = fileData.cachedRates;
    let exchangeRates = cachedRates.find(
        (r) => r.date === date && r.base === baseCurrency
    );
    if (exchangeRates) {
        return exchangeRates.rates;
    }
    return null;
}

function cacheConversion(date, amount, baseCurrency, toCurrency, result) {
    let fileData = fs.readFileSync("./data/conversions.json");
    fileData = JSON.parse(fileData);

    let data = {
        date: date,
        amount: Number(amount),
        base_currency: baseCurrency,
        target_currency: toCurrency,
        converted_amount: Number(result),
    };

    fileData.push(data);

    fs.writeFileSync(
        "./data/conversions.json",
        JSON.stringify(fileData, null, 2)
    );
}

module.exports = {
    cacheExchangeRates,
    searchCachedExchangeRates,
    cacheConversion,
};
