import requester from "./requester";

export const brem = {
    create : (brem) => requester.post(`/brem/create`,brem),
    getAll : () => requester.get(`/brem`),
    delete : (id) => requester.delete(`/brem/${id}`),
    getLastNumber : () => requester.get(`/brem/lastNumber`),
    update : (newBrem) => requester.put(`/brem/${newBrem._id}`,newBrem),
}