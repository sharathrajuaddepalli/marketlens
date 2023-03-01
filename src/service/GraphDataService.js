import _ from "lodash";

export const rePivotGraphData = (data, pivot_field_name, value_field_name, xAxisFunction) => {

    const dataXAxised = data.map((datum) => ({...datum, xAxis: xAxisFunction(datum)}));

    // console.log(_.groupBy(dataXAxised, (datum) => datum.xAxis));

    const dataGrouped = _.groupBy(dataXAxised, (datum) => datum.xAxis);

    let graphData = []

    Object.entries(dataGrouped)
        .forEach(([key, values]) => {
            let newData = {}

            newData = {...newData, xAxis: key}

            values.forEach((value) => {
                newData = {...newData, [value[pivot_field_name]]: value[value_field_name]}
            })

            graphData = [...graphData, newData]
        })

    console.log(graphData);

    return graphData;
}