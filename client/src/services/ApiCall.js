import axios from 'axios';

export const commonrequest = async (method, url, data) => {
    try {
        const response = await axios({
            method,
            url,
            data
            // You can add headers if needed
        });
        return response.data;
    } catch (error) {
        // Handle errors here
        console.error('Request failed:', error);
        throw error; // Rethrow the error to be caught by the caller
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