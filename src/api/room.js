import requester from "./requester";

export const room = {
    create : (room) => requester.post(`/room/create`,room),
    getAll : () => requester.get(`/room`),
    getAllById : (query) => requester.get(`/room/getRoomById/${query.id}`,query),
    getById : (id) => requester.get(`/room/${id}`),
    update : (room) => requester.put(`/room/${room._id}`,room),
    getListStudent : () => requester.get(`/room/getListStudent`),
    findRoomForStudent : (data) => requester.post(`/room/findRoomForStudent`,data),
    addOneUserToRoom : (data) => requester.put(`/room/addOneUserToRoom/${data.idRoom}`,data),
    getRoomForUser : (id) => requester.get(`/room/getRoomForUser/${id}`),
}