import Request from "../Request";

export const getAllNewsEvents = async () => {
    const response = await Request.get("/news/all");
    return response.data.data;
}

export const getNewsInfluenceDetails = async (event) => {
    const response = await Request.get('news/influence?' + new URLSearchParams({event}).toString());
    return response.data.data;
}

export const getNewsEventLinks = async (event) => {
    const response = await Request.get('news/links?' + new URLSearchParams({event}).toString());
    return response.data.data;
}