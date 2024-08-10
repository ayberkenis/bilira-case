import React from "react";

import "./assets/css/base.css";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MainTable from "./components/table/mainTable";
import HomeLayout from "./layouts/home";
const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<HomeLayout>
				<MainTable />
			</HomeLayout>
		</QueryClientProvider>
	);
}

export default App;
