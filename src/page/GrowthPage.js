import classes from "./pagestyles.module.scss";
import GrowthForm from "../form/GrowthForm";
import {useState} from "react";
import getGrowthDetails from "../service/GrowthService";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../service/GraphDataService";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {SINGLE_GRAPH_DISPLAY_PROPERTIES, XLABEL_PROPERTIES, YLABEL_PROPERTIES} from "../constant/constants";

const GrowthPage = () => {
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [data, setData] = useState([]);
    const [symbols, setSymbols] = useState([]);

    const handleFormSubmit = async (submitValues) => {
        setLoading(true);
        console.log(`Passing request with ${submitValues}`);
        const growthData = await getGrowthDetails(submitValues);

        setSymbols(submitValues.symbol.map(symbol => symbol.split(':')[1]));

        const growthDataModified = rePivotGraphData(growthData, 'symbol', 'percent', (datum) => `${datum.year} - ${datum.subYear}`)
        console.log(`Received response as [ ${growthDataModified} ]`);

        setData(growthDataModified);
        setLoading(false);
        setInitiated(true);
    }

    const colors = ['blue', 'green', 'red', 'orange', 'violet']

    const tooltipFormatter = (value) => `${value.toFixed(2)} %`;
    const tickFormatter = (value) => `${value} %`;

    return (
        <div>
            <GrowthForm onFormSubmit={handleFormSubmit}/>
            {loading && <Skeleton duration={0.1} height={500}/>}
            {!loading && initiated && (
                <div className={classes.graphContainer}>
                    <LineChart data={data} {...SINGLE_GRAPH_DISPLAY_PROPERTIES}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"}/>
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={XLABEL_PROPERTIES} dataKey={'xAxis'}/>
                        <YAxis strokeWidth={2} fontWeight={'bold'} label={{...YLABEL_PROPERTIES, value: 'Deviation'}}
                               tickFormatter={tickFormatter}/>
                        <Tooltip formatter={tooltipFormatter}/>
                        <Legend layout={"vertical"} align={"right"} verticalAlign={"top"}/>
                        {symbols.map((symbol, _idx) => <Line dataKey={symbol} stroke={colors[_idx]}
                                                             strokeWidth={2}
                                                             type={'monotone'}/>)}
                    </LineChart>
                </div>
            )}
        </div>
    )
}

export default GrowthPage;