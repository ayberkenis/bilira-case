import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import SingleTableItem from "./singleTableItem";
import "../../assets/css/table.layout.css";
import fetchAvailablePairs from "../../api/symbols";
import Loading from "../common/loading";
import { REST_API } from "../../lib/constants";
import Symbol from "@/types/crypto";

export default function MainTable() {
	const [isFetchingMore, setIsFetchingMore] = useState(false);

	const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
		initialPageParam: 0,
		queryKey: ["ticker"],
		queryFn: async ({ pageParam = 0 }) => {
			const symbolsToFetch: Symbol[] = await fetchAvailablePairs();

			const symbolsArray = symbolsToFetch.map((item) => item.symbol);
			const symbolsString = JSON.stringify(symbolsArray.slice(pageParam * 10, (pageParam + 1) * 10));
			const encodedSymbols = encodeURIComponent(symbolsString);

			const response = await axios.get<Symbol[]>(`${REST_API}ticker/24hr?symbols=${encodedSymbols}`);
			const list = response.data;

			const sortedData = list.sort((a: any, b: any) => b.price - a.price);

			sortedData.forEach((item) => {
				if (item.symbol.endsWith("USDT")) {
					const symbol = symbolsToFetch.find((symbol) => item.symbol.startsWith(symbol.symbol));
					if (symbol) {
						item.baseAsset = symbol.baseAsset;
					}
				}
			});

			return {
				data: sortedData,
				nextCursor: pageParam + 1 < Math.ceil(symbolsArray.length / 10) ? pageParam + 1 : undefined,
			};
		},
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const handleScroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 && !isFetchingMore && hasNextPage) {
			setIsFetchingMore(true);
			fetchNextPage().finally(() => {
				setIsFetchingMore(false);
			});
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [isFetchingMore, hasNextPage]);

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<>
			<table className="crypto-table">
				<thead className="table-header">
					<tr>
						<th>Crypto</th>
						<th>Price</th>
						<th>Market Value</th>
						<th>24h Change</th>
					</tr>
				</thead>
				<tbody>
					{data?.pages.map((page, i) => (
						<React.Fragment key={i}>
							{page.data.map((item: Symbol, index: number) => (
								<SingleTableItem data={item} key={`${i}-${index}`} />
							))}
						</React.Fragment>
					))}
				</tbody>
			</table>
			<div style={{ height: "20px", marginTop: "10px", textAlign: "center" }}>
				{isFetchingNextPage || isFetchingMore ? (
					<Loading />
				) : hasNextPage ? (
					<button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className="load-more-button">
						Load more
					</button>
				) : status === "pending" || isFetching ? (
					<Loading />
				) : (
					"No more data"
				)}
			</div>
		</>
	);
}
