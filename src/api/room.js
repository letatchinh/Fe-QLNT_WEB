import requester from "./requester";

export const room = {
    create : (room) => requester.post(`/room/create`,room),
    getAll : () => requester.get(`/room`),
}