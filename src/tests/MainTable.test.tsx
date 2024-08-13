import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import MainTable from "../components/table/mainTable";
import { binanceTickerSocket } from "../api/socket";
import Loading from "../components/common/loading";

// Mocking the entire @tanstack/react-query module
jest.mock("@tanstack/react-query", () => ({
	useQuery: jest.fn(),
}));

jest.mock("../api/socket", () => ({
	binanceTickerSocket: {
		onMessage: jest.fn(),
		offMessage: jest.fn(),
	},
}));

jest.mock("../components/common/loading", () => () => <div>Loading...</div>);
jest.mock("../components/table/SingleTableItem", () => () => (
	<tr>
		<td>Mocked SingleTableItem</td>
	</tr>
));

describe("MainTable", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("renders loading spinner initially", () => {
		// Mocking useQuery to return loading state
		(useQuery as jest.Mock).mockReturnValue({
			data: null,
			isLoading: true,
			error: null,
		});

		render(<MainTable />);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	test("renders error message on data fetch failure", () => {
		// Mocking useQuery to return an error state
		(useQuery as jest.Mock).mockReturnValue({
			data: null,
			isLoading: false,
			error: new Error("Failed to fetch data"),
		});

		render(<MainTable />);

		expect(screen.getByText("Error fetching data...")).toBeInTheDocument();
	});

	test("renders table with data", () => {
		// Mocking useQuery to return data
		(useQuery as jest.Mock).mockReturnValue({
			data: [{ symbol: "BTCUSDT" }],
			isLoading: false,
			error: null,
		});

		render(<MainTable />);

		expect(screen.getByText("Mocked SingleTableItem")).toBeInTheDocument();
	});

	test("handles scrolling and loading more data", () => {
		(useQuery as jest.Mock).mockReturnValue({
			data: [{ symbol: "BTCUSDT" }],
			isLoading: false,
			error: null,
		});

		render(<MainTable />);

		fireEvent.scroll(window, { target: { scrollY: 1000 } });

		expect(screen.getByText("Mocked SingleTableItem")).toBeInTheDocument();
	});

	test("subscribes and unsubscribes to WebSocket on mount and unmount", () => {
		(useQuery as jest.Mock).mockReturnValue({
			data: [{ symbol: "BTCUSDT" }],
			isLoading: false,
			error: null,
		});

		const { unmount } = render(<MainTable />);

		expect(binanceTickerSocket.onMessage).toHaveBeenCalledTimes(1);

		unmount();

		expect(binanceTickerSocket.offMessage).toHaveBeenCalledTimes(1);
	});
});
