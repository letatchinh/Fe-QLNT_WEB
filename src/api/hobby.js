import requester from "./requester";

export const hobby = {
    create : (hobby) => requester.post(`/hobby/create`,hobby),
    getAll : () => requester.get(`/hobby`),
    update : (record) => requester.put(`/hobby/${record._id}`,record),
}