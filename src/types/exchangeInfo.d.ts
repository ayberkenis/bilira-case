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
export { ExchangeInfoItem, Filter };
