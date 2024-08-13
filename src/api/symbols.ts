import axios from "axios";
import { ExchangeInfoItem } from "@/types/exchangeInfo";

/**
 * Fetches available trading pairs from the Binance API that end with "USDT".
 * The results are filtered and paginated based on the provided page and limit.
 *
 * @async
 * @function
 * @param {number} [page=0] - The page number to fetch (default is 0).
 * @param {number} [limit=10] - The number of results to return per page (default is 10).
 * @returns {Promise<ExchangeInfoItem[]>} The filtered and paginated list of trading pairs.
 */
export async function fetchAvailablePairs(
	page: number = 0,
	limit: number = 10,
	symbols: String[] | null = null
): Promise<ExchangeInfoItem[]> {
	let url = "https://api.binance.com/api/v3/exchangeInfo";
	if (symbols) {
		url = `https://api.binance.com/api/v3/exchangeInfo?symbols=${symbols.join(",")}`;
	}
	const response = await axios.get(url);
	const data = response.data;

	// Filter and paginate the results
	const filteredSymbols = data.symbols
		.filter((sym: ExchangeInfoItem) => sym.quoteAsset === "USDT")
		.slice(page * limit, (page + 1) * limit);

	return filteredSymbols;
}

/**
 * Fetches historical Kline (candlestick) data for a specific trading pair from the Binance API.
 * The data is limited to 10 intervals of 1 day each and extracts the closing price.
 *
 * @async
 * @function
 * @param {string} symbol - The trading pair symbol (e.g., "BTCUSDT").
 * @returns {Promise<number[]>} An array of the closing prices from the fetched Klines.
 */
export const fetchKlines = async (symbol: string): Promise<number[]> => {
	const response = await axios.get(`https://api.binance.com/api/v3/uiKlines?symbol=${symbol}&interval=1d&limit=10`);
	const data = await response.data;
	const responseArray: number[] = [];
	data.forEach((kline: any) => responseArray.push(parseInt(kline[4])));
	return responseArray;
};
