import requester from "./requester";

export const meter = {
    create : (meter) => requester.post(`/meter/create`,meter),
    getAll : () => requester.get(`/meter`),
    getById : (idRoom) => requester.get(`/meter/${idRoom}`),
    getOne : (idRoom) => requester.get(`/meter/getOne`,idRoom),
    getPreAndMonthNow : (meter) => requester.get(`/meter/getPreAndMonthNow`,meter),
    createOrUpdate : (meter) => requester.post(`/meter/createOrUpdate`,meter),
}