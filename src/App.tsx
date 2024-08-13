import React from "react";

import "./assets/css/base.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
