import axios from "axios";
import { REST_API } from "../lib/constants";

/**
 * Fetches ticker data for a list of symbols in a paginated (infinite scrolling) manner.
 *
 * @async
 * @function
 * @param {Object} params - The parameters object.
 * @param {any} params.fetchedSymbols - The previously fetched symbols data. It contains the list of all symbols.
 * @param {number} params.pageParam - The current page number, used to determine which symbols to fetch next.
 * @returns {Promise<Object>} The response object containing the fetched ticker data and the next cursor for pagination.
 * @returns {Symbol[]} response.data - The array of ticker data for the current page of symbols.
 * @returns {number | undefined} response.nextCursor - The cursor for the next page or `undefined` if there are no more pages.
 */
const fetchTickerInfinite = async ({
	fetchedSymbols = [],
	pageParam = 0,
}: {
	fetchedSymbols: any;
	pageParam: number;
}) => {
	const symbolsArray = fetchedSymbols.data.map((item: any) => item.symbol);
	const symbolsString = JSON.stringify(symbolsArray?.slice(pageParam * 10, (pageParam + 1) * 10));
	const encodedSymbols = encodeURIComponent(symbolsString);

	const response = await axios.get<Symbol[]>(`${REST_API}ticker/24hr?symbols=${encodedSymbols}`);
	return {
		data: response.data,
		nextCursor: pageParam + 1 < Math.ceil(symbolsArray.length / 10) ? pageParam + 1 : undefined,
	};
};

export { fetchTickerInfinite };
