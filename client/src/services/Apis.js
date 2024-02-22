import { commonrequest } from "./ApiCall";

export const registerfunction = async (data) => {
    return await commonrequest("POST", `/user/register`, data)
}

export const sentOtpFunction = async (data) => {
    return await commonrequest("POST", `/logincheck`, data)
}
export const sentVerification = async (data) => {
    return await commonrequest("POST", `/user/sendverification`, data)
}

export const userVerify = async (data) => {
    return await commonrequest("POST", `/user/login`, data)
}
export const addToCart = async (data) => {
    return await commonrequest("POST", `/addtocart`, data)
}
export const viewOnlyOneTrade = async (id) => {
    return await commonrequest("GET", `/gettradedetail/${id}`)
}

export const deleteCartOneItem = async (data) => {
    return await commonrequest("POST", `/deletecartoneitem`, data)
}
export const viewCartTrades = async () => {
    return await commonrequest("GET", `/getcartproducts`)
}
export const updateCartItemQuantity = async (data) => {
    return await commonrequest("POST", `/change-product-quantity`, data);
}
export const postRequestAddMoney = async (data) => {
    return await commonrequest("POST", `/postRequestAddMoney`, data);
}
export const verifyPayment = async (data) => {
    return await commonrequest("POST", `/verifyPayment`, data);
}
export const withdrawRequest = async (data) => {
    return await commonrequest("POST", `/withdrawRequest`, data);
}
export const userTransaction = async () => {
    return await commonrequest("GET", `/usertransaction`);
}
export const purchase = async (data) => {
    return await commonrequest("POST", `/purchase`, data);
}
export const portfolioValue = async (data) => {
    return await commonrequest("GET", `/portfolioValue`, data);
}
export const getTradeDetailsProfit = async (data) => {
    return await commonrequest("GET", `/getTradeDetailsProfit`, data);
}




// adminphace
export const postTradeDetails = async (data) => {
    return await commonrequest("POST", `/addtradedetails`, data)
}
// in apis.js
export const viewTrades = async (data) => {
    return await commonrequest("GET", `/gettradedetails`, data);
}
export const viewTradesFunded = async (data) => {
    return await commonrequest("GET", `/viewTradesFunded`, data);
}


export const viewTradesEdit = async (id) => {
    return await commonrequest("GET", `/gettradedetailsedit/${id}`);
};
export const updateTradeDetails = async (id, updatedData) => {
    return await commonrequest("POST", `/updatetradedetails/${id}`, updatedData);
};
export const getWithdrwalRequest = async () => {
    return await commonrequest("POST", `/getWithdrwalRequests`);
};
export const acceptWithdrawal = async (data) => {
    return await commonrequest("POST", `/acceptWithdrawals`, data);
};
export const deleteWithdrawal = async (data) => {
    return await commonrequest("POST", `/deleteWithdrawal`, data);
};
export const deleteTrade = async (id) => {
    return await commonrequest("DELETE", `/deletetradedetails/${id}`);
};
export const tradeProfit = async (data) => {
    return await commonrequest("POST", `/tradeProfit`, data);
};
export const viewTradeProfit = async (id) => {
    return await commonrequest("GET", `/viewTradeProfit/${id}`);
};


export const Logout = async () => {
    return await commonrequest("POST", `/user/logout`)
}