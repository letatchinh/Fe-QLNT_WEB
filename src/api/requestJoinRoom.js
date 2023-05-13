import { get } from "lodash";
import requester from "./requester";

export const requestJoinRoom = {
    create : (requestJoinRoom) => requester.post(`/requestJoinRoom/create`,requestJoinRoom),
    getAll : (profile) => requester.get(`/requestJoinRoom?role=${get(profile,'role')}&id=${get(profile,'id')}`),
    getById : (id) => requester.get(`/requestJoinRoom/${id}`),
    update : (record) => requester.put(`/requestJoinRoom/${record._id}`,record),
}