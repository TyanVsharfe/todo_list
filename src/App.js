import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Task from "./components/Task";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Task/>
            </div>
        </QueryClientProvider>
    );
}

export default App;
