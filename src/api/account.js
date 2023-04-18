import requester from "./requester";

export const account = {
    create : (account) => requester.post(`/account/create`,account),
    login : (account) => requester.post(`/account/login`,account),
    getAll : () => requester.get(`/account`),
    update : (record) => requester.put(`/account/${record._id}`,record),
}