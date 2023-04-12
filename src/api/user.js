import requester from "./requester";

export const user = {
    create : (user) => requester.post(`/user/create`,user),
    getAll : () => requester.get(`/user`),
}