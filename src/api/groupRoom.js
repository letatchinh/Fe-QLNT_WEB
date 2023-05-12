import requester from "./requester";

export const groupRoom = {
    create : (groupRoom) => requester.post(`/groupRoom/create`,groupRoom),
    getAll : () => requester.get(`/groupRoom`),
    getUserByGroupRoom : (id) => requester.get(`/groupRoom/getUserByGroupRoom/${id}`),
    update : (record) => requester.put(`/groupRoom/${record._id}`,record),
}