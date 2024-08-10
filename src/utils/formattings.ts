export const PRICE_FORMATTING = (number: string) => {
	// crypto formatting
	const formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	// add $ sign and 2 decimal places
	return `${parseFloat(formattedNumber).toFixed(2)}`;
};

export const VOLUME_FORMATTING = (number: string) => {
	// Convert the input to a number in case it's passed as a string
	const num = parseFloat(number);

	if (isNaN(num)) {
		return "Invalid number";
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
