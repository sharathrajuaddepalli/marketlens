import Request from "./Request";

const timed_wait = (milliS) => new Promise((res) => {
    setTimeout(milliS, () => {res()});
});

const getGrowthDetails = async (data) => {
    const response =  await Request.get('growth?' + new URLSearchParams(data).toString());

    return response.data.data;
}

export default getGrowthDetails;