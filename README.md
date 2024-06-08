# appolica-task
# CurrencyConversion

CurrencyConversion is a command-line application written in Node.js that allows users to convert monetary values between different currencies. The application follows the requirements and functionality outlined below:

## Features:
1. **Input Format:** Accepts a command-line argument for the date in the format 'YYYY-MM-DD'.
2. **Multiple Conversions:** Capable of processing multiple currency conversions in a single session.
3. **Continuous Validation:** Continuously validates all inputs until correct ones are provided. Monetary values are constrained to two decimal places, and currencies must be in ISO 4217 three-letter currency code format.
4. **Case Insensitivity:** The application is case-insensitive.
5. **Caching:** Caches exchange rates for each requested base currency. Subsequent conversions with the same base currency utilize cached data instead of calling the API.
6. **Output Saving:** Saves each successful conversion in a JSON file.
7. **Termination:** Terminates the application upon typing `END` on any input.
8. **API Key Configuration:** Loads the API key for Fast Forex from `config.json`.

## Usage:
1. **Installation:** Ensure Node.js is installed on your system.
2. **Configuration:** Add your Fast Forex API key to the `config.json` file.
3. **Execution:** Run `node CurrencyConversion.js` followed by the desired date.