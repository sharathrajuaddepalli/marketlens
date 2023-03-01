import classes from "../pagestyles.module.scss";
import {useState} from "react";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../../service/GraphDataService";
import {Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {getContributionDetails} from "../../service/contribution/ContributionService";
import ContributionForm from "../../form/ContributionForm";
import _ from "lodash";
import {XLabel, YLabel} from "../../component/graph/Labels";
import {COLORS, SINGLE_GRAPH_DISPLAY_PROPERTIES, XLABEL_PROPERTIES, YLABEL_PROPERTIES} from "../../constant/constants";
import {GraphXAxis, GraphYAxis} from "../../component/graph/Axis";

const ContributionPage = () => {
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [data, setData] = useState([]);
    const [symbols, setSymbols] = useState([]);

    const handleFormSubmit = async ({minYear, maxYear, sector, n}) => {
        setLoading(true);
        console.log(`Passing request with ${{minYear, maxYear, sector, n}}`);
        const contributionsData = await getContributionDetails(minYear, maxYear, sector, n);

        const symbols = Object.keys(_.groupBy(contributionsData, ({symbol}) => symbol));
        console.log(symbols)
        setSymbols(symbols);

        const contributionDataPivoted = rePivotGraphData(contributionsData, 'symbol', 'marketCap', (datum) => `${datum.year} - ${datum.subYear}`)
        console.log(`Received response as [ ${contributionDataPivoted} ]`);

        setData(contributionDataPivoted);
        setLoading(false);
        setInitiated(true);
    }

    // const colors = ['blue', 'green', 'red', 'orange', 'violet']
    const colors = COLORS;

    const formatBillions = (value) => {

        return `${(value / 1_000_000_000).toFixed(3)} B`
    }

    const tickFormatter = (value) => {
        return `${value / 1_000_000_000}`;
    }

    return (
        <div>
            <ContributionForm onFormSubmit={handleFormSubmit}/>
            {loading && <Skeleton duration={0.1} height={500}/>}
            {!loading && initiated && (
                <div className={classes.graphContainer}>
                    <AreaChart data={data} {...SINGLE_GRAPH_DISPLAY_PROPERTIES}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"} />
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={XLABEL_PROPERTIES} dataKey={'xAxis'} />
                        <YAxis strokeWidth={2} fontWeight={'bold'} tickFormatter={tickFormatter} label={{...YLABEL_PROPERTIES, value: "Cumulative M. Cap in Billions"}} />
                        <Tooltip formatter={formatBillions} />
                        <Legend align={"right"} verticalAlign={"top"} layout={"vertical"}/>
                        {symbols.map((symbol, _idx) => <Area
                            dataKey={symbol}
                            fillOpacity={0.25}
                            strokeWidth={2}
                            fill={colors[_idx % colors.length]}
                            stackId={1}
                            stroke={colors[_idx % colors.length]}
                            type={'monotone'}/>)}
                    </AreaChart>
                </div>
            )}
        </div>
    )
}

export default ContributionPage;