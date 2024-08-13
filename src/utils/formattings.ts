/**
 * Formats a cryptocurrency price as a string in USD currency format.
 *
 * @function
 * @param {string} number - The string representation of the number to be formatted.
 * @returns {string | number} The formatted number as a string without the "$" symbol or `0` if the input is invalid.
 */
export const PRICE_FORMATTING = (number: string): string | number => {
	// crypto formatting by using Intl

	const formattedNumber = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	})
		.format(parseFloat(number))
		.replace("$", "");

	if (isNaN(parseFloat(formattedNumber))) {
		return 0;
	}
	return formattedNumber;
};

/**
 * Formats a volume number to a more readable string format, converting large numbers into abbreviated forms.
 *
 * Examples:
 * - 1,000 -> "1K"
 * - 1,000,000 -> "1M"
 * - 1,000,000,000 -> "1B"
 *
 * @function
 * @param {string} number - The string representation of the volume to be formatted.
 * @returns {string | number} The formatted volume as a string with appropriate units (K, M, B) or `0` if the input is invalid.
 */
export const VOLUME_FORMATTING = (number: string): string | number => {
	// Convert the input to a number in case it's passed as a string
	const num = parseFloat(number);

	if (isNaN(num)) {
		return 0;
	}

	if (num >= 1e9) {
		return (num / 1e9).toFixed(1) + "B";
	} else if (num >= 1e6) {
		return (num / 1e6).toFixed(1) + "M";
	} else if (num >= 1e3) {
		return (num / 1e3).toFixed(1) + "K";
	} else {
		return num.toString();
	}
};
