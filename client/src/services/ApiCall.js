import axios from "axios";

export const commonrequest = async (method, url, data, headers) => {
    try {
        const config = {
            method: method,
            url: url,
            headers: headers || { "Content-Type": "application/json" },
            data: data
        };

        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};
