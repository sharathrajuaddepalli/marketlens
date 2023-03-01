import Request from "../Request";

export const getContributionDetails = async (minYear, maxYear, sector, n) => {
    const response = await Request.get('contribution/result?' + new URLSearchParams({minYear, maxYear, n, sector}).toString());
    return response.data.data;
}

