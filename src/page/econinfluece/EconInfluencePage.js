import classes from "../pagestyles.module.scss";
import {useState} from "react";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../../service/GraphDataService";
import {Area, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis} from "recharts";
import _ from "lodash";
import EconInfluenceForm from "../../form/EconInfluenceForm";
import {getEconInfluenceData} from "../../service/EconInfluence/EconInfluece";
import {XLabel, YLabel} from "../../component/graph/Labels";
import {COLORS, XLABEL_PROPERTIES, YLABEL_PROPERTIES} from "../../constant/constants";

const EconInfluencePage = () => {
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [data, setData] = useState([]);
    const [sectorSymbols, setSectorSymbols] = useState([]);
    const [indicatorSymbols, setIndicatorSymbols] = useState([]);

    const handleFormSubmit = async (formData) => {
        setLoading(true);
        console.log(`Passing request with ${JSON.stringify(formData)}`);
        const econInfluenceData = await getEconInfluenceData(formData);

        const data = _.groupBy(econInfluenceData, ({type}) => type);

        console.log("data", data);

        const indicatorSymbols = Object.keys(_.groupBy(data['ECON_IND'], ({symbol}) => symbol));
        const sectorSymbols = Object.keys(_.groupBy(data['SECTOR'], ({symbol}) => symbol));

        setSectorSymbols(sectorSymbols);
        setIndicatorSymbols(indicatorSymbols);

        const perfectedData = rePivotGraphData(econInfluenceData, 'symbol', 'value', (datum) => `${datum.year} - ${datum.subYear}`);
        // const sectorPerfectedData = rePivotGraphData(data['SECTOR'], 'sector', 'value', (datum) => `${datum.year} - ${datum.subYear}`);

        setData(perfectedData);
        setLoading(false);
        setInitiated(true);
    }

    const colors = COLORS;
    const colorIndex = 0;

    const toolTipFormatter = (value) => `${value.toFixed(2)} %`;
    const tickFormatter = (value) => `${value} %`;

    return (
        <div>
            <EconInfluenceForm onFormSubmit={handleFormSubmit}/>
            {loading && <Skeleton duration={0.1} height={500}/>}
            {!loading && initiated && (
                <div className={classes.graphContainer}>
                    <ComposedChart width={1200} height={500} data={data}
                               margin={{top: 20, right: 20, left: 80, bottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"}/>
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={XLABEL_PROPERTIES} dataKey={'xAxis'} />
                        <YAxis strokeWidth={2} fontWeight={'bold'} tickFormatter={tickFormatter} label={{...YLABEL_PROPERTIES, value: 'Growth as percentage'}} />
                        <Tooltip formatter={toolTipFormatter}/>
                        <Legend wrapperStyle={{paddingLeft: "10px"}} verticalAlign={"top"}  align={"right"} layout={"vertical"}/>
                        {
                            sectorSymbols.map(
                                (symbol, _idx) => <Line
                                    dataKey={symbol}
                                    strokeWidth={2}
                                    stroke={colors[_idx % colors.length]}
                                    type={'monotone'}
                                />
                            )
                        }
                        {
                            indicatorSymbols.map(
                                (symbol, _idx) => <Area
                                    dataKey={symbol}
                                    strokeWidth={2}
                                    fillOpacity={0.25}
                                    fill={colors[(sectorSymbols.length + _idx) % colors.length]}
                                    stroke={colors[(sectorSymbols.length + _idx) % colors.length]}
                                    type={'monotone'}
                                    />
                            )
                        }
                    </ComposedChart>
                </div>
            )}
        </div>
    )
}

export default EconInfluencePage;