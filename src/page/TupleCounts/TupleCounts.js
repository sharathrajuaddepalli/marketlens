import {useQuery} from "react-query";
import classes from "./tc.module.scss";
import {getAllTupleRows} from "../../service/tuplerows/TupleCounts";

const TupleCountsPage = () => {
    const {data, isLoading, isError} = useQuery("tuple_counts", getAllTupleRows);

    if(isLoading) {
        return null;
    }

    return (
        <div className={classes.tupleCountsContaint}>
            <table>
                <tr>
                    <th>S. No</th>
                    <th>Table Name</th>
                    <th>Tuple Counts</th>
                </tr>
            {
                Object.keys(data).map((tableName, _idx) =>
                    <tr key={_idx}>
                        <td>{_idx + 1}</td>
                        <td>{tableName}</td>
                        <td>{data[tableName]}</td>
                    </tr>
                )
            }
            </table>
        </div>
    )

}

export default TupleCountsPage;