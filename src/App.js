import './App.css';
import "@fontsource/inter";
import "@fontsource/dm-sans";
import Navbar from "./component/Navbar";
import MainLayout from "./layout/MainLayout";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import useDocumentTitle from "./hooks/useDocumentTitle";

const queryClient = new QueryClient(
    {
        defaultOptions: {
            queries: {
                refetchInterval: -1,
                cacheTime: -1,
                refetchOnMount: false,
                refetchIntervalInBackground: -1,
                refetchOnReconnect: true,
                refetchOnWindowFocus: false
            }
        }
    }
);

function App() {
    useDocumentTitle("MarketLens");

    return (
        <div className="App">
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <header>
                        <Navbar/>
                        <MainLayout/>
                    </header>
                </QueryClientProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
