import requester from "./requester";

export const brem = {
    create : (brem) => requester.post(`/brem/create`,brem),
    getAll : () => requester.get(`/brem`),
    getLastNumber : () => requester.get(`/brem/lastNumber`),
}