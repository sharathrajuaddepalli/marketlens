import Request from "./Request";

const getAllCommodities = async () => {
    try {
        var response = await Request.get('commodities/all');
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

export {getAllCommodities}