import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import SingleTableItem from "./singleTableItem";
import "../../assets/css/table.layout.css";
import { fetchAvailablePairs } from "../../api/symbols";
import Loading from "../common/loading";
import Logo from "../../assets/img/BiLira.svg";
import { binanceTickerSocket } from "../../api/socket";

export default function MainTable(): JSX.Element {
	const [page, setPage] = useState(0);
	const [symbols, setSymbols] = useState<any[]>([]);
	const [tickerData, setTickerData] = useState<{ [key: string]: any }>({});
	const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
	const [searchQuery, setSearchQuery] = useState(""); // State for search query

	const handleSocket = (data: any) => {
		const tickerArray = Array.isArray(data) ? data : [data];
		const newTickerData = tickerArray.reduce((acc, ticker) => {
			acc[ticker.s] = ticker;
			return acc;
		}, {} as { [key: string]: any });

		setTickerData((prev) => ({
			...prev,
			...newTickerData,
		}));
	};

	useEffect(() => {
		binanceTickerSocket.onMessage(handleSocket);

		return () => {
			binanceTickerSocket.offMessage(handleSocket);
		};
	}, []);

	const { data, isLoading, error } = useQuery({
		queryKey: ["symbols", page],
		queryFn: () => fetchAvailablePairs(page, 10),
	});

	useEffect(() => {
		if (data) {
			setSymbols((prev) => [...prev, ...data]);
		}
	}, [data]);

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

	const handleButtonClick = (query: string) => {
		setSearchQuery(query);
	};

	const filteredSymbols = React.useMemo(() => {
		return symbols.filter((symbol) => symbol.symbol.toLowerCase().includes(searchQuery.toLowerCase()));
	}, [symbols, searchQuery]);

	const sortedSymbols = React.useMemo(() => {
		let sortableSymbols = [...filteredSymbols];
		if (sortConfig !== null) {
			sortableSymbols.sort((a, b) => {
				const key = sortConfig.key;
				const aValue = a[key] || tickerData[a.symbol]?.[key];
				const bValue = b[key] || tickerData[b.symbol]?.[key];

				// Adjust the sorting logic based on the data type
				if (typeof aValue === "string" && typeof bValue === "string") {
					if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
					if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
				} else if (typeof aValue === "number" && typeof bValue === "number") {
					return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue;
				}

				return 0;
			});
		}
		return sortableSymbols;
	}, [filteredSymbols, sortConfig, tickerData]);

	const requestSort = (key: string) => {
		let direction = "ascending";
		if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const getSortIcon = (key: string) => {
		if (sortConfig && sortConfig.key === key) {
			return sortConfig.direction === "ascending" ? "▲" : "▼";
		}
		return "▲▼";
	};

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
			<div className="search-bar">
				<input
					type="text"
					className="search-input"
					placeholder="Search for a crypto"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
			<table className="crypto-table">
				<thead className="table-header">
					<tr>
						<th onClick={() => requestSort("symbol")}>Crypto {getSortIcon("symbol")}</th>
						<th onClick={() => requestSort("price")}>Price {getSortIcon("price")}</th>
						<th onClick={() => requestSort("marketValue")}>Market Value {getSortIcon("marketValue")}</th>
						<th onClick={() => requestSort("change24h")}>24h Change {getSortIcon("change24h")}</th>
						<th>Sparkline</th>
					</tr>
				</thead>
				<tbody>
					{sortedSymbols && sortedSymbols.length > 0 ? (
						sortedSymbols.map((item, index) => {
							const ticker = tickerData[item.symbol] || {};
							return <SingleTableItem data={{ ...item, ...ticker }} key={index} />;
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
