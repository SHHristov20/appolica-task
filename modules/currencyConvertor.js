const axios = require("axios");
const fs = require("fs");

const url = "https://api.fastforex.io/historical";
const apiKey = JSON.parse(fs.readFileSync("./config.json")).api_key;
const {
    searchCachedExchangeRates,
    cacheExchangeRates,
    cacheConversion,
} = require("./cache");

async function fetchExchangeRates(date, baseCurrency) {
    result = await axios
        .get(`${url}?date=${date}&from=${baseCurrency}&api_key=${apiKey}`)
        .then((response) => {
            if (response.data.error) {
                throw new Error();
            }
            cacheExchangeRates(date, baseCurrency, response.data.results);
            return response.data.results;
        })
        .catch(() => {
            console.log("Something went wrong. Please try again later.");
            process.exit(1);
        });
    return result;
}

async function convertCurrency(date, amount, baseCurrency, toCurrency) {
    let exchangeRates = searchCachedExchangeRates(date, baseCurrency);
    if (!exchangeRates) {
        exchangeRates = await fetchExchangeRates(date, baseCurrency);
    }
    let rate = exchangeRates[toCurrency];
	let result = (amount * rate).toFixed(2);
	cacheConversion(date, amount, baseCurrency, toCurrency, result);
    return result;
}

module.exports = {
    fetchExchangeRates,
    convertCurrency,
};
