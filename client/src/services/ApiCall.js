import axios from "axios";

export const commonrequest = async (methods, body, header) => {
    try {
        let config = {
            method: methods,
            headers: header ? header : { "Content-Type": "application/json" },
            data: body
        };

        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};
// import axios from "axios";

// export const commonrequest = async (methods, body, header) => {
//     let config = {
//         method: methods,
//         headers: header ? header
//             : {
//                 "Content-Type": "application/json"
//             },
//         data: body
//     }

//     // axios instance
//     return axios(config).then((data) => {
//         return data
//     }).catch((error) => {
//         return error
//     })
// }