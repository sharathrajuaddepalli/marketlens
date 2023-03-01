import {createContext} from "react";
import {useQueries} from "react-query";
import {getAllStocks} from "../service/StockService";
import {getAllSectors} from "../service/SectorService";
import {getAllCommodities} from "../service/CommoditiyService";
import {getAllCryptoCurrencies} from "../service/CryptoService";
import {getAllBondTenures} from "../service/TreasuryBondService";
import {getAllIndicators} from "../service/IndicatorDataService";
import {getAllStockIndices} from "../service/EconInfluence/EconInfluece";


const StaticDataContext = createContext();

const StaticDataProvider = ({children}) => {
    const queryResults = useQueries(
        [
            {queryKey: 'stock-data', queryFn : getAllStocks},
            {queryKey: 'sector-data', queryFn : getAllSectors},
            {queryKey: 'commodity-data', queryFn : getAllCommodities},
            {queryKey: 'crypto-data', queryFn : getAllCryptoCurrencies},
            {queryKey: 'bond-data', queryFn: getAllBondTenures},
            {queryKey: 'indicator-data', queryFn: getAllIndicators},
            {queryKey: 'indices-data', queryFn: getAllStockIndices}
        ]
    )

    if(queryResults[0].isLoading || queryResults[1].isLoading || queryResults[2].isLoading || queryResults[3].isLoading
        || queryResults[4].isLoading || queryResults[5].isLoading || queryResults[6].isLoading) {
        return <h1>Loading....</h1>
    }

    const value = {
        stocks: queryResults[0].data,
        sectors: queryResults[1].data,
        commodities: queryResults[2].data,
        cryptos: queryResults[3].data,
        bonds: queryResults[4].data,
        indicators: queryResults[5].data,
        stockIndices: queryResults[6].data
    }

    return (
        <StaticDataContext.Provider value={value}>
            {children}
        </StaticDataContext.Provider>
    )
}

export {StaticDataContext, StaticDataProvider}