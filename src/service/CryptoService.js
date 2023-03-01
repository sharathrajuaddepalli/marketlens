import Request from "./Request";

const getAllCryptoCurrencies = async () => {
    try {
        var response = await Request.get('cryptos/all');
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

export {getAllCryptoCurrencies}