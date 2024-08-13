import React from "react";
import { render, screen } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import SingleTableItem from "../components/table/singleTableItem";

jest.mock("@tanstack/react-query");
jest.mock("../components/table/sparkLineChart", () => () => <div>Mocked SparkLineChart</div>);
jest.mock("axios");
jest.mock("cryptocurrency-icons/svg/color/btc.svg", () => "btc-icon.svg");
jest.mock("cryptocurrency-icons/svg/color/generic.svg", () => "generic-icon.svg");

describe("SingleTableItem", () => {
	const mockData = {
		baseAsset: "BTC",
		symbol: "BTCUSDT",
		priceChange: "500.00",
		priceChangePercent: "2.5",
		weightedAvgPrice: "49500.00",
		prevClosePrice: "49000.00",
		lastPrice: "50000.00",
		lastQty: "0.1",
		bidPrice: "49900.00",
		bidQty: "1.5",
		askPrice: "50100.00",
		askQty: "1.0",
		openPrice: "48000.00",
		highPrice: "50500.00",
		lowPrice: "47500.00",
		volume: "1000",
		quoteVolume: "50000000",
		openTime: BigInt(1622476800000),
		closeTime: BigInt(1622563200000),
		firstId: BigInt(10000000),
		lastId: BigInt(10001000),
		count: BigInt(1000),
		e: "24hrTicker",
		E: BigInt(1622563200000),
		s: "BTCUSDT",
		p: "500.00",
		P: "2.5",
		w: "49500.00",
		x: "49000.00",
		c: "50000.00",
		Q: "0.1",
		b: "49900.00",
		B: "1.5",
		a: "50100.00",
		A: "1.0",
		o: "48000.00",
		h: "50500.00",
		l: "47500.00",
		v: "1000",
		q: "50000000",
		O: 1622476800000,
		C: 1622563200000,
		F: 10000000,
		L: 10001000,
		n: 1000,
	};

	beforeEach(() => {
		(useQuery as jest.Mock).mockReturnValue({
			data: [100, 200, 300],
			isLoading: false,
			isError: false,
		});
	});

	test("renders baseAsset and symbol correctly", () => {
		render(<SingleTableItem data={mockData} />);

		expect(screen.getByText("BTC")).toBeInTheDocument();
		expect(screen.getByText("/USDT")).toBeInTheDocument();
	});

	test("renders price and volume correctly", () => {
		render(<SingleTableItem data={mockData} />);

		expect(screen.getByText("50000.00 USDT")).toBeInTheDocument();
		expect(screen.getByText("1.0K USDT")).toBeInTheDocument();
	});

	test("renders increasing SVG for positive price change", () => {
		render(<SingleTableItem data={mockData} />);

		expect(screen.getByText("2.5%")).toBeInTheDocument();
		expect(screen.getByRole("img", { hidden: true }).getAttribute("src")).toEqual("path/to/fallback/icon.svg");
	});

	test("renders sparkline chart when data is available", () => {
		render(<SingleTableItem data={mockData} />);

		expect(screen.getByText("Mocked SparkLineChart")).toBeInTheDocument();
	});

	test("shows loading when sparkline data is loading", () => {
		(useQuery as jest.Mock).mockReturnValueOnce({
			data: null,
			isLoading: true,
			isError: false,
		});

		render(<SingleTableItem data={mockData} />);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	test("renders generic icon if SVG icon is not found", async () => {
		const mockDataWithoutIcon = {
			...mockData,
			baseAsset: "UNKNOWN",
		};

		render(<SingleTableItem data={mockDataWithoutIcon} />);

		// Expect the fallback icon to be rendered
		expect(screen.getByRole("img", { hidden: true }).getAttribute("src")).toEqual("path/to/fallback/icon.svg");
	});
	test("handles error in sparkline data fetch", () => {
		(useQuery as jest.Mock).mockReturnValueOnce({
			data: null,
			isLoading: false,
			isError: true,
		});

		render(<SingleTableItem data={mockData} />);

		expect(screen.getByText("Loading...")).toBeInTheDocument(); // Assuming you have a specific error handling mechanism
	});
});
