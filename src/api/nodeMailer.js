import requester from "./requester";

export const nodeMailer = {
    send : (mail) => requester.post(`/nodeMailer/sendMail`,mail),
}