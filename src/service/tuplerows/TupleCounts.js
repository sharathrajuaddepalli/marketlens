import Request from "../Request";

export const getAllTupleRows = async () => {
    const response = await Request.get("/tuplecount/all");
    return response.data.data;
}