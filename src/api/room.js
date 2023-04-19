import requester from "./requester";

export const room = {
    create : (room) => requester.post(`/room/create`,room),
    getAll : () => requester.get(`/room`),
    getById : (id) => requester.get(`/room/${id}`),
    update : (room) => requester.put(`/room/${room._id}`,room),
    getListStudent : () => requester.get(`/room/getListStudent`),
}