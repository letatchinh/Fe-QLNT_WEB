import requester from "./requester";

export const bill = {
    create : (bill) => requester.post(`/bill/create`,bill),
    getAll : () => requester.get(`/bill`),
    getOne : (query) => requester.get(`/bill/getOne`,query),
    getStastics : (query) => requester.get(`/bill/getStastics`,query),
}