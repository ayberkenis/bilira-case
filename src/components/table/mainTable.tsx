import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import SingleTableItem from "./singleTableItem";
import "../../assets/css/table.layout.css";
import { fetchAvailablePairs } from "../../api/symbols";
import Loading from "../common/loading";
import Logo from "../../assets/img/BiLira.svg";
import { binanceTickerSocket } from "../../api/socket";

/**
 * MainTable component displays a table of cryptocurrency data, updating in real-time via WebSocket.
 * It supports infinite scrolling to load more symbols.
 *
 * @component
 * @returns {JSX.Element} The rendered table with cryptocurrency data.
 */
export default function MainTable(): JSX.Element {
	const [page, setPage] = useState(0); // Tracks the current page
	const [symbols, setSymbols] = useState<any[]>([]); // Stores the loaded symbols
	const [tickerData, setTickerData] = useState<{ [key: string]: any }>({}); // Stores the latest ticker data as an object with symbol as key

	/**
	 * WebSocket message handler to update ticker data.
	 *
	 * @param {Object|Object[]} data - The ticker data received from the WebSocket.
	 */
	const handleSocket = (data: any) => {
		const tickerArray = Array.isArray(data) ? data : [data];

		// Convert array of ticker data to an object keyed by symbol
		const newTickerData = tickerArray.reduce((acc, ticker) => {
			acc[ticker.s] = ticker;
			return acc;
		}, {} as { [key: string]: any });

		// Update state with the new ticker data, merging it with the old data
		setTickerData((prev) => ({
			...prev,
			...newTickerData,
		}));
	};

	// Bind the WebSocket handler when the component mounts
	useEffect(() => {
		binanceTickerSocket.onMessage(handleSocket); // Subscribe to the WebSocket ticker updates

		// Clean up the WebSocket subscription when the component unmounts
		return () => {
			binanceTickerSocket.offMessage(handleSocket); // Unsubscribe the handler
		};
	}, []);

	const { data, isLoading, error } = useQuery({
		queryKey: ["symbols", page],
		queryFn: () => fetchAvailablePairs(page, 10),
	});

	// When data is fetched, append it to the symbols state
	useEffect(() => {
		if (data) {
			setSymbols((prev) => [...prev, ...data]);
		}
	}, [data]);

	// Scroll event handler to load more items when reaching bottom
	const handleScroll = useCallback(() => {
		if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
		setPage((prevPage) => prevPage + 1);
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	if (isLoading && page === 0) {
		return <Loading />;
	}

	if (error) {
		return <div>Error fetching data...</div>;
	}

	return (
		<>
			<span className="brand-case">
				<img src={Logo} alt="Logo" />
			</span>
			<table className="crypto-table">
				<thead className="table-header">
					<tr>
						<th>Crypto</th>
						<th>Price</th>
						<th>Market Value</th>
						<th>24h Change</th>
						<th>Sparkline</th>
					</tr>
				</thead>
				<tbody>
					{symbols && symbols.length > 0 ? (
						symbols.map((item, index) => {
							// Find the corresponding ticker data by symbol (item.symbol)
							const ticker = tickerData[item.symbol] || {};

							return (
								<SingleTableItem
									data={{ ...item, ...ticker }} // Merge static data with real-time data
									key={index}
								/>
							);
						})
					) : (
						<tr>
							<td colSpan={5} style={{ textAlign: "center" }}>
								No data available
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<div className="py-20">
				{isLoading ? (
					<Loading />
				) : (
					<button onClick={() => setPage((prevPage) => prevPage + 1)} className="load-more-button">
						Load More
					</button>
				)}
			</div>
		</>
	);
}
