import {Label} from "recharts";

export const XLabel = ({children}) => {

    return (
        <Label style={{
            textAnchor: "middle",
            fontSize: "130%",
            fill: "black",
            color: "black",
            fontStyle: "bold"
        }}
                angle={0}
                value={children}/>
    )

}

export const YLabel = ({children, offset = 35}) => {

    return (
        <Label  style={{
            textAnchor: "middle",
            fontSize: "130%",
            fill: "black",
            color: "black",
            fontStyle: "bold"
        }}
                angle={270}
                position={"left"}
                offset={offset}
                value={children}/>
    )
}