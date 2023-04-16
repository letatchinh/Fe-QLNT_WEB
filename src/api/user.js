import requester from "./requester";

export const user = {
    create : (user) => requester.post(`/user/create`,user),
    getAll : () => requester.get(`/user`),
    update : (record) => requester.put(`/user/${record._id}`,record),
    delete : (id) => requester.delete(`/user/${id}`),
}