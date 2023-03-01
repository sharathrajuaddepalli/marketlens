import Request from "../Request";

export const getAllStockIndices = async () => {
    const response = await Request.get("/indices/all");
    return response.data.data;
}

export const getEconInfluenceData = async ({minYear, maxYear, indicators, sectors}) => {
    const response = await Request.get("/econinfluence/result?"+ new URLSearchParams({minYear, maxYear, indicators, sectors}).toString());
    return response.data.data;
}