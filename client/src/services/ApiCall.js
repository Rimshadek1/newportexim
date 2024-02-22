import axios from "axios";

export const commonrequest = async (methods, body, header) => {
    let config = {
        method: methods,
        headers: header ? header
            : {
                "Content-Type": "application/json"
            },
        data: body
    }

    // axios instance
    return axios(config).then((data) => {
        return data
    }).catch((error) => {
        return error
    })
}