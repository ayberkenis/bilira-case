import React, { useState, useEffect, useMemo } from "react";
import Symbol from "@/types/crypto";
import { PRICE_FORMATTING, VOLUME_FORMATTING } from "../../utils/formattings";
import { DecreasingSvg, IncreasingSvg, StableSvg } from "../common/icons";
import SparkLineChart from "./sparkLineChart";
import { useQuery } from "@tanstack/react-query";
import { fetchKlines } from "../../api/symbols";
/**
 * `SingleTableItem` is a memoized React component that renders a row in the cryptocurrency table.
 * It displays the symbol, price, volume, daily percentage change, and a sparkline chart.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Symbol} props.data - The symbol data containing details of the cryptocurrency.
 * @returns {JSX.Element} The rendered table row for a single cryptocurrency.
 */
const SingleTableItem = React.memo(({ data }: { data: Symbol }) => {
	/**
	 * State to store the SVG icon for the cryptocurrency.
	 * @type {[string | null, Function]} icon
	 */
	const [icon, setIcon] = useState<string | null>(null);
	/**
	 * Loads the appropriate SVG icon for the cryptocurrency based on its base asset.
	 * Falls back to a generic icon if not found.
	 *
	 * @function
	 */
	useEffect(() => {
		const loadIcon = async () => {
			try {
				const iconModule = await import(
					`../../../node_modules/cryptocurrency-icons/svg/color/${data?.baseAsset?.toLowerCase()}.svg`
				);
				setIcon(iconModule.default);
			} catch (error) {
				const generic = await import(`../../../node_modules/cryptocurrency-icons/svg/color/generic.svg`);
				setIcon(generic.default);
			}
		};
		loadIcon();
	}, [data.baseAsset]);
	/**
	 * Query to fetch the sparkline data (historical price data) for the cryptocurrency symbol.
	 * Uses `react-query` to handle the fetching.
	 *
	 * @returns {Object} Query object containing `data`, `isLoading`, and `isError` properties.
	 */
	const {
		data: sparklineData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["klines", data.symbol],
		queryFn: () => fetchKlines(data.symbol),
	});
	/**
	 * Memoized calculation of the color for the sparkline chart based on the daily percentage change.
	 * Returns "red" for negative, "green" for positive, and a neutral color for zero.
	 *
	 * @returns {string} The color to use for the sparkline.
	 */
	const sparkLineColor = useMemo(() => {
		const parsedP = parseFloat(data?.P ?? "0");

		if (isNaN(parsedP) || parsedP === 0) return "#a1a1aa";
		return parsedP < 0 ? "red" : "green";
	}, [data?.P]);
	/**
	 * Memoized selection of the SVG icon to display based on the daily percentage change.
	 * Returns the appropriate SVG component.
	 *
	 * @returns {JSX.Element | null} The SVG component or null if percentage change is invalid.
	 */
	const SVG_ICON = useMemo(() => {
		const parsedP = parseFloat(data?.P ?? "0");

		if (isNaN(parsedP)) return null;
		return parsedP < 0 ? <DecreasingSvg /> : parsedP !== 0 ? <IncreasingSvg /> : <StableSvg />;
	}, [data?.P]);
	/**
	 * Memoized calculation of the CSS class for the text color based on the daily percentage change.
	 * Returns a class name string representing the color.
	 *
	 * @returns {string} The CSS class name for the text color.
	 */
	const priceChangeColor = useMemo(() => {
		const parsedP = parseFloat(data?.P ?? "0");

		if (isNaN(parsedP)) return "text-zinc-400";
		return parsedP < 0 ? "text-red-600" : parsedP === 0 ? "text-zinc-400" : "text-green-600";
	}, [data?.P]);

	return (
		<tr className="crypto-item">
			<td className="symbol">
				<span className="symbol-img">
					{icon ? (
						<img className="crypto-icon" src={icon} alt={`${data?.baseAsset} icon`} loading="lazy" />
					) : (
						<img className="crypto-icon" src="path/to/fallback/icon.svg" alt="fallback icon" loading="lazy" />
					)}
				</span>
				<span className="symbol-info">
					{data.baseAsset}
					<span className="text-xs text-zinc-400 tracking-wider">/USDT</span>
				</span>
			</td>
			<td>
				{PRICE_FORMATTING(data.c) ?? 0} <span className="text-sm text-zinc-400 tracking-wider">USDT</span>
			</td>
			<td>
				{VOLUME_FORMATTING(data.v) ?? 0} <span className="text-sm text-zinc-400 tracking-wider">USDT</span>
			</td>

			<td className={priceChangeColor + " daily-change"}>
				{SVG_ICON}
				{data.P ?? 0}%
			</td>
			<td className={"sparkline"}>
				{isLoading || isError ? (
					<div className="text-center">Loading...</div>
				) : (
					<SparkLineChart data={sparklineData} color={sparkLineColor} />
				)}
			</td>
		</tr>
	);
});

export default SingleTableItem;
