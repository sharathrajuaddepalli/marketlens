import classes from "../pagestyles.module.scss";
import {useState} from "react";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../../service/GraphDataService";
import {CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis} from "recharts";
import _ from "lodash";
import {COLORS, SINGLE_GRAPH_DISPLAY_PROPERTIES, XLABEL_PROPERTIES, YLABEL_PROPERTIES} from "../../constant/constants";
import {getSectorVarianceData} from "../../service/variance/VarianceGrowthSevice";
import SectorVarianceForm from "../../form/SectorVarianceForm";
import {value} from "lodash/seq";

const SectorVariancePage = () => {
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [growthData, setGrowthData] = useState([]);
    const [stdDevData, setStdDevData] = useState([]);
    const [sectorSymbols, setSectorSymbols] = useState([]);

    const handleFormSubmit = async (formData) => {
        setLoading(true);
        console.log(`Passing request with ${JSON.stringify(formData)}`);
        const sectorVarianceData = await getSectorVarianceData(formData);

        console.log(sectorVarianceData);


        const sectorSymbols = Object.keys(_.groupBy(sectorVarianceData, ({sector}) => sector));

        setSectorSymbols(sectorSymbols);

        const perfectedGrowthData = rePivotGraphData(sectorVarianceData, 'sector', 'value', (datum) => `${datum.year} - ${datum.subyear}`);
        const perfectedStdDevData = rePivotGraphData(sectorVarianceData, "sector", "stdDev", (datum) => `${datum.year} - ${datum.subyear}`);

        setGrowthData(perfectedGrowthData);
        setStdDevData(perfectedStdDevData);
        setLoading(false);
        setInitiated(true);
    }

    const colors = COLORS;

    const toolTipFormatter = (value) => `${value.toFixed(2)} %`;
    const tickFormatter = (value) => `${value} %`;
    const stdTickFormatter = (value) => `${value}`;
    const stdToolTipFormatter = (value) => `${value.toFixed(2)}`;

    return (
        <div>
            <SectorVarianceForm onFormSubmit={handleFormSubmit}/>
            {loading && <Skeleton duration={0.1} height={500}/>}
            {!loading && initiated && (
                <div className={classes.graphContainer}>
                    <ComposedChart {...SINGLE_GRAPH_DISPLAY_PROPERTIES} data={growthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"}/>
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={XLABEL_PROPERTIES} dataKey={'xAxis'} />
                        <YAxis strokeWidth={2} fontWeight={'bold'} tickFormatter={tickFormatter} label={{...YLABEL_PROPERTIES, value: 'Growth as percentage'}} />
                        <Tooltip formatter={toolTipFormatter}/>
                        <Legend wrapperStyle={{paddingLeft: "10px"}} verticalAlign={"top"}  align={"right"} layout={"vertical"}/>
                        {
                            sectorSymbols.map(
                                (symbol, _idx) => <Line
                                    dataKey={symbol}
                                    stroke={colors[_idx % colors.length]}
                                    strokeWidth={2}
                                    type={'monotone'}
                                />
                            )
                        }
                    </ComposedChart>
                    <ComposedChart {...SINGLE_GRAPH_DISPLAY_PROPERTIES} data={stdDevData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"}/>
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={XLABEL_PROPERTIES} dataKey={'xAxis'} />
                        <YAxis strokeWidth={2} fontWeight={'bold'} tickFormatter={stdTickFormatter} label={{...YLABEL_PROPERTIES, value: 'Standard Deviation', dx: -48}} />
                        <Tooltip formatter={stdToolTipFormatter}/>
                        <Legend wrapperStyle={{paddingLeft: "10px"}} verticalAlign={"top"}  align={"right"} layout={"vertical"}/>
                        {
                            sectorSymbols.map(
                                (symbol, _idx) => <Line
                                    dataKey={symbol}
                                    stroke={colors[_idx % colors.length]}
                                    strokeWidth={2}
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

export default SectorVariancePage;