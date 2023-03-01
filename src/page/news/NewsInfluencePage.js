import classes from "../pagestyles.module.scss";
import {useState} from "react";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../../service/GraphDataService";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import _ from "lodash";
import {getNewsEventLinks, getNewsInfluenceDetails} from "../../service/newsInflluence/NewsInfluenceService";
import NewsInfluenceForm from "../../form/NewsInfluenceForm";
import {COLORS, SINGLE_GRAPH_DISPLAY_PROPERTIES, XLABEL_PROPERTIES, YLABEL_PROPERTIES} from "../../constant/constants";

const NewsInfluencePage = () => {
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [data, setData] = useState([]);
    const [symbols, setSymbols] = useState([]);
    const [links, setLinks] = useState([]);

    const handleFormSubmit = async ({event}) => {
        setLoading(true);
        console.log(`Passing request with ${{event}}`);
        const newsInfluenceSectorData = await getNewsInfluenceDetails(event);
        const newsLinks = await getNewsEventLinks(event);

        const symbols = Object.keys(_.groupBy(newsInfluenceSectorData, ({sector}) => sector));

        setSymbols(symbols);
        setLinks(newsLinks);

        const newsInfluencePivotedData = rePivotGraphData(newsInfluenceSectorData, 'sector', 'value', (datum) => `${datum.year} - ${datum.subYear}`)
        console.log(`Received response as [ ${newsInfluencePivotedData} ]`);

        setData(newsInfluencePivotedData);
        setLoading(false);
        setInitiated(true);
    }

    const colors = COLORS;

    const tooltipFormatter = (value) => {
        return `${value.toFixed(2)} %`;
    }

    const yTickFormatter = (value) => {
        return `${parseInt(value)} %`;
    }

    return (
        <div>
            <NewsInfluenceForm onFormSubmit={handleFormSubmit}/>
            {loading && <Skeleton duration={0.1} height={500}/>}
            {!loading && initiated && (
                <div>
                <div className={classes.graphContainer}>
                    <LineChart data={data}
                               {...SINGLE_GRAPH_DISPLAY_PROPERTIES}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"}/>
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={XLABEL_PROPERTIES} dataKey={'xAxis'}/>
                        <YAxis strokeWidth={2} fontWeight={'bold'} tickFormatter={yTickFormatter} label={{...YLABEL_PROPERTIES, value: 'Growth %'}}/>
                        <Tooltip formatter={tooltipFormatter}/>
                        <Legend layout={"vertical"} verticalAlign={"top"} align={"right"}/>
                        {symbols.map((symbol, _idx) => <Line
                            dataKey={symbol}
                            strokeWidth={2}
                            stroke={colors[_idx % colors.length]}
                            type={'monotone'}
                        />)}
                    </LineChart>
                </div>
                    <ul>
                        {
                            links.map((link, _idx) => <li key={_idx}>
                                <a href={link}>{link}</a>
                            </li>)
                        }
                    </ul>
                </div>
            )}
        </div>
    )
}

export default NewsInfluencePage;