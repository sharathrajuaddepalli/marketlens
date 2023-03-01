import Request from "../Request";

export const getSectorVarianceData = async ({sectors, minYear, maxYear, aggBy}) => {
    const response = await Request.get('variance/result?' + new URLSearchParams({sectors, minYear, maxYear, aggBy}).toString());
    return response.data.data;
}