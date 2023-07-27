import axiosInstance from "./axiosInstance";

export default function makePatchReq(url, args) {
    return axiosInstance.patch(url, args, {
        withCredentials: true
    })
}