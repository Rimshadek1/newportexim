const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/userControllers");
const adminController = require("../controllers/adminController");
const jwt = require('jsonwebtoken');
const jwtsecret = process.env.JWTSECRET


// Routes
router.post("/user/register", controllers.userregister);
router.post("/logincheck", controllers.userOtpSend);
router.post("/user/login", controllers.userLogin);
router.post("/user/logout", controllers.userLogout);
router.post("/user/sendverification", controllers.sendverification);
router.get("/gettradedetail/:id", controllers.getTradeDetail);
router.post("/addtocart", controllers.addToCart);
router.get("/getcartproducts/:id", controllers.getCartProducts);
router.post("/change-product-quantity", controllers.changeProductQuantity);
router.post("/deletecartoneitem", controllers.deletecartoneitem);
router.post("/postRequestAddMoney", controllers.postRequestAddMoney);
router.post("/verifyPayment", controllers.verifyPayment);
router.post("/withdrawRequest", controllers.withdrawRequest);
router.get("/usertransaction/:id", controllers.userTransactions);
router.post("/purchase", controllers.purchase);
router.get("/portfolioValue/:id", controllers.portfolioValue);
router.get('/isVerified', controllers.isVeification)
router.get('/', (req, res) => {
    res.json('backend setup done')
})

//adminroutes

router.get("/getTradeDetailsProfit", adminController.getTradeDetailsProfit);
router.get("/viewTradesFunded", adminController.viewTradesFunded);
router.post("/addtradedetails", adminController.addTradeDetails);
router.get("/gettradedetails", adminController.getTradeDetails);
router.get("/gettradedetailsedit/:id", adminController.getTradeDetailsEdit);
router.post('/updatetradedetails/:id', adminController.updateTradeDetails);
router.post('/getWithdrwalRequests', adminController.getWithdrwalRequestss);
router.post('/acceptWithdrawals', adminController.acceptWithdrawalss);
router.post('/deleteWithdrawal', adminController.deleteWithdrawal);
router.delete('/deletetradedetails/:id', adminController.deleteTradeDetails);
router.post('/tradeProfit', adminController.tradeProfit);
router.get('/viewTradeProfit/:id', adminController.viewTradeProfit);
router.get('/verfiyEmployee', adminController.verifyEmployee);
router.post('/VerifiedEmployee', adminController.VerifiedEmployee);
router.post('/unVerifiedEmployee', adminController.unVerifiedEmployee);











module.exports = router;