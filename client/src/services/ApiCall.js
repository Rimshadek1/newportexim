import axios from "axios";

export const commonrequest = async (method, url, data) => {
    try {
        const config = {
            method: method,
            url: url,
            data: data,
            // headers: headers || { "Content-Type": "application/json" },
        };

        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};
