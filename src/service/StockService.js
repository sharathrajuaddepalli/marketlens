import Request from "./Request";

const getAllStocks = async () => {
    try {
        var response = await Request.get('stocks/all');
        if(response.status === 200 && !response.data.error) {
            return response.data.data;
        } else {
            throw new Error(`Response status not success ${response.status} with text ${response.statusText}`);
        }
    } catch (err) {
        console.error(err);
        return undefined;
    }
}

export {getAllStocks}