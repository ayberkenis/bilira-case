import axios from "axios";

interface ExchangeInfoItem {
	symbol: string;
	status: string;
	baseAsset: string;
	baseAssetPrecision: number;
	quoteAsset: string;
	quotePrecision: number;
	quoteAssetPrecision: number;
	baseCommissionPrecision: number;
	quoteCommissionPrecision: number;
	orderTypes: string[];
	icebergAllowed: boolean;
	ocoAllowed: boolean;
	otoAllowed: boolean;
	quoteOrderQtyMarketAllowed: boolean;
	allowTrailingStop: boolean;
	cancelReplaceAllowed: boolean;
	isSpotTradingAllowed: boolean;
	isMarginTradingAllowed: boolean;
	filters: Filter[];
	permissions: string[];
	permissionSets: string[][];
	defaultSelfTradePreventionMode: string;
	allowedSelfTradePreventionModes: string[];
}

interface Filter {
	filterType: string;
	minPrice?: string;
	maxPrice?: string;
	tickSize?: string;
	minQty?: string;
	maxQty?: string;
	stepSize?: string;
	limit?: number;
	minTrailingAboveDelta?: number;
	maxTrailingAboveDelta?: number;
	minTrailingBelowDelta?: number;
	maxTrailingBelowDelta?: number;
	bidMultiplierUp?: string;
	bidMultiplierDown?: string;
	askMultiplierUp?: string;
	askMultiplierDown?: string;
	avgPriceMins?: number;
	minNotional?: string;
	applyMinToMarket?: boolean;
	maxNotional?: string;
	applyMaxToMarket?: boolean;
	maxNumOrders?: number;
	maxNumAlgoOrders?: number;
}

export default async function fetchAvailablePairs() {
	const response = await axios.get("https://api.binance.com/api/v3/exchangeInfo");
	const data = await response.data;

	// Return symbols that ends with USDT
	const filteredSymbols = data.symbols.filter((item: ExchangeInfoItem) => item.symbol.endsWith("USDT"));

	// return filteredSymbols .baseAsset and .symbol as array
	return filteredSymbols.map((item: ExchangeInfoItem) => ({ baseAsset: item.baseAsset, symbol: item.symbol }));
}
