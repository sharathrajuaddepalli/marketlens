import {XAxis, YAxis} from "recharts";

export const GraphXAxis = ({dataKey, label}) => {
    return (
        <XAxis label={{value: "Time", angle:0, position: "outsideCenter", dy: 20}} dataKey={'xAxis'}></XAxis>
        // <XAxis dataKey={dataKey} label={{value: label, angle:0, position: "outsideCenter", dy: 20}} />
    )
}

export const GraphYAxis = ({dataKey, label, tickFormatter}) => {
    return (
        <YAxis tickFormatter={tickFormatter} label={{value: label, angle: -90, dx: 20}} />
    )
}