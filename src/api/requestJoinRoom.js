import requester from "./requester";

export const requestJoinRoom = {
    create : (requestJoinRoom) => requester.post(`/requestJoinRoom/create`,requestJoinRoom),
    getAll : () => requester.get(`/requestJoinRoom`),
    getById : (id) => requester.get(`/requestJoinRoom/${id}`),
    update : (record) => requester.put(`/requestJoinRoom/${record._id}`,record),
}