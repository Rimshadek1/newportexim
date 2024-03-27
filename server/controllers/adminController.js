const db = require('../Config/connection');
var collection = require('../Config/collection');
const { ObjectId } = require('mongodb');
const nodemailer = require("nodemailer");


const tarnsporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465, // Standard SMTP port
    secure: true, // Set to true if you're using a secure connection (SSL/TLS)
    auth: {
        user: 'info@portexim.in', // Your email address hosted on Hostinger
        pass: 'Risasi@1234', // Your email password
    },
    connectionTimeout: 10000,
});
exports.addTradeDetails = async (req, res) => {
    try {
        const tradeDetails = req.body;
        const image1Base64 = req.body.image1;
        const image2Base64 = req.body.image2;
        const image3Base64 = req.body.image3;
        const image4Base64 = req.body.image4;
        const image5Base64 = req.body.image5;
        const image1Buffer = Buffer.from(image1Base64.split(',')[1], 'base64');
        const image2Buffer = Buffer.from(image2Base64.split(',')[1], 'base64');
        const image3Buffer = Buffer.from(image3Base64.split(',')[1], 'base64');
        const image4Buffer = Buffer.from(image4Base64.split(',')[1], 'base64');
        const image5Buffer = Buffer.from(image5Base64.split(',')[1], 'base64');

        const veri = {

            locationfrom: tradeDetails.locationfrom,
            locationto: tradeDetails.locationto,
            date: tradeDetails.date,
            trade: tradeDetails.trade,
            price: tradeDetails.price,
            returnPercentage: tradeDetails.returnPercentage,
            shippingDate: tradeDetails.shippingDate,
            reaching: tradeDetails.reaching,
            returnsDate: tradeDetails.returnsDate,
            fundClosing: tradeDetails.fundClosing,
            overview: tradeDetails.overview,
            shares: tradeDetails.shares,
            sharesavailable: parseInt(tradeDetails.sharesavailable),
            image1: image1Buffer,
            image2: image2Buffer,
            image3: image3Buffer,
            image4: image4Buffer,
            image5: image5Buffer,

        }
        const data = await db.get().collection(collection.tradeCollection).insertOne(veri);

        res.status(200).json({ storeData: data.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getTradeDetails = async (req, res) => {
    try {
        const data = await db.get().collection(collection.tradeCollection).find().toArray();
        res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.viewTradesFunded = async (req, res) => {
    try {
        const trades = await db.get().collection(collection.tradeCollection).find().toArray();
        const profits = await db.get().collection(collection.profitCollection).find().toArray();

        // Filter out trades without corresponding profits
        const data = trades.filter(trade => !profits.some(profit => profit.productId === String(trade._id)));

        res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getTradeDetailsProfit = async (req, res) => {
    try {
        const trades = await db.get().collection(collection.tradeCollection).find().toArray();
        const profits = await db.get().collection(collection.profitCollection).find().toArray();

        // Filter out trades without corresponding profits
        const combinedData = trades
            .filter(trade => profits.some(profit => profit.productId === String(trade._id)))
            .map(trade => {
                const profit = profits.find(profit => profit.productId === String(trade._id));
                return { trade, profit };
            });

        res.status(200).json({ combinedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.getTradeDetailsEdit = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ObjectId' });
        }

        const data = await db
            .get()
            .collection(collection.tradeCollection)
            .findOne({ _id: new ObjectId(id) });

        if (!data) {
            return res.status(404).json({ error: 'Trade not found' });
        }

        res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.updateTradeDetails = async (req, res) => {
    try {

        const id = req.params.id;
        const tradeDetails = req.body;
        const image1Base64 = req.body.image1;
        const image2Base64 = req.body.image2;
        const image3Base64 = req.body.image3;
        const image4Base64 = req.body.image4;
        const image5Base64 = req.body.image5;
        const image1Buffer = Buffer.from(image1Base64.split(',')[1], 'base64');
        const image2Buffer = Buffer.from(image2Base64.split(',')[1], 'base64');
        const image3Buffer = Buffer.from(image3Base64.split(',')[1], 'base64');
        const image4Buffer = Buffer.from(image4Base64.split(',')[1], 'base64');
        const image5Buffer = Buffer.from(image5Base64.split(',')[1], 'base64');

        const veri = {

            locationfrom: tradeDetails.locationfrom,
            locationto: tradeDetails.locationto,
            date: tradeDetails.date,
            trade: tradeDetails.trade,
            price: tradeDetails.price,
            returnPercentage: tradeDetails.returnPercentage,
            shippingDate: tradeDetails.shippingDate,
            reaching: tradeDetails.reaching,
            returnsDate: tradeDetails.returnsDate,
            fundClosing: tradeDetails.fundClosing,
            overview: tradeDetails.overview,
            shares: tradeDetails.shares,
            sharesavailable: parseInt(tradeDetails.sharesavailable),
            image1: image1Buffer,
            image2: image2Buffer,
            image3: image3Buffer,
            image4: image4Buffer,
            image5: image5Buffer,

        }
        await db.get().collection(collection.tradeCollection).updateOne({ _id: new ObjectId(id) }, { $set: veri });
        res.status(200).json({ message: 'Trade details updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getWithdrwalRequestss = async (req, res) => {
    try {
        const datas = await db.get().collection(collection.withdrawRequestCollection).find().toArray();

        const userIds = datas.map((withdrawalRequest) => new ObjectId(withdrawalRequest.userId));

        const acData = await db.get().collection(collection.verifyPhotoCollection)
            .find({ userId: { $in: userIds } })
            .toArray();

        console.log(acData);

        const data = datas.map((withdrawalRequest) => {
            const correspondingAcData = acData.find(ac => ac.userId.toString() === withdrawalRequest.userId.toString());
            console.log(new ObjectId(withdrawalRequest.userId));
            return {
                username: withdrawalRequest.username,
                amount: withdrawalRequest.amount,
                userId: withdrawalRequest.userId,
                request: withdrawalRequest.request,
                bankAccountNumber: correspondingAcData ? correspondingAcData.bankAccountNumber : null,
                ifscCode: correspondingAcData ? correspondingAcData.ifscCode : null,
            };
        });

        console.log(data);
        res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.acceptWithdrawalss = async (req, res) => {
    const trade = req.body.trade;
    try {
        const deleted = await db.get().collection(collection.withdrawRequestCollection).deleteOne({ userId: trade.userId });
        if (deleted.deletedCount === 1) {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString();
            const trades = {
                username: trade.username,
                userId: trade.userId,
                amount: trade.amount,
                request: 'accepted',
                bankAccountNumber: trade.bankAccountNumber,
                ifscCode: trade.ifscCode,
                type: 'Withdrawn',
                date: formattedDate,
            }
            await db.get().collection(collection.transactionCollection).insertOne(trades);
            res.status(200).json({ message: 'Withdrawal request processed successfully' });
        }
    } catch (error) {
        console.error('Error accepting withdrawal request:', error);
        res.status(500).json({ error: 'An error occurred while processing the withdrawal request' });
    }
};
exports.deleteWithdrawal = async (req, res) => {
    const trade = req.body.trade;
    try {
        const deleted = await db.get().collection(collection.withdrawRequestCollection).deleteOne({ userId: trade.userId });
        if (deleted.deletedCount === 1) {
            res.status(200).json({ message: 'Withdrawal deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting withdrawal request:', error);
        res.status(500).json({ error: 'An error occurred while processing the delete request' });
    }
};

exports.deleteTradeDetails = async (req, res) => {
    try {
        const id = req.params.id;
        await db.get().collection(collection.tradeCollection).deleteOne({ _id: new ObjectId(id) });
        res.status(200).json({ message: 'Trade details updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.tradeProfit = async (req, res) => {
    try {
        const id = req.body.productId;
        const updatedTradeProfit = req.body.tradeProfit;
        const currentDate = new Date(); // Current date

        // Check if the product already exists in the profitCollection
        const existingTradeProfit = await db.get().collection(collection.profitCollection).findOne({ productId: id });

        if (existingTradeProfit) {
            // If the product exists, update its tradeProfit and date
            await db.get().collection(collection.profitCollection).updateOne(
                { productId: id },
                { $set: { tradeProfit: updatedTradeProfit, updatedAt: currentDate } }
            );
            res.status(200).json({ message: 'Trade profit updated successfully' });
        } else {
            // If the product doesn't exist, insert a new document with the tradeProfit and date
            const data = {
                productId: id,
                tradeProfit: updatedTradeProfit,
                createdAt: currentDate // Adding current date
            };
            await db.get().collection(collection.profitCollection).insertOne(data);
            res.status(200).json({ message: 'Trade details added successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.viewTradeProfit = async (req, res) => {
    try {
        const id = req.params.id;
        const existingTradeProfit = await db.get().collection(collection.profitCollection).findOne({ productId: id });
        res.status(200).json({ existingTradeProfit });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.verifyEmployee = async (req, res) => {
    try {
        // Step 1: Query the user collection to find users with the role "verifying"
        const verifyingUsers = await db.get().collection(collection.userCollection).find({ role: "verifying" }).toArray();

        const matchedData = [];

        // Step 2: Loop through each verifying user
        for (const user of verifyingUsers) {
            const photoItems = await db.get().collection(collection.verifyPhotoCollection).find({ userId: user._id }).toArray();

            // Step 3: If there are matching photoItems for the user, add them to matchedData
            if (photoItems.length > 0) {
                const userData = {
                    Name: user.fname,
                    Email: user.email,
                    Photos: photoItems
                };
                matchedData.push(userData);
            }
        }

        // Step 4: Send the matched data to the frontend
        res.status(200).json({ matchedData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.VerifiedEmployee = async (req, res) => {
    try {
        const email = req.body.email;
        const verify = await db.get().collection(collection.userCollection).findOneAndUpdate(
            { email: email },
            { $set: { role: 'verified' } }
        );

        if (verify) {
            const mailOptions = {
                from: 'info@portexim.in',
                to: email,
                subject: 'Verification Confirmation',
                html: `
                    <p>Dear User,</p>
                    <p>Your account has been successfully verified.</p>
                    <p>Thank you for choosing Portexim Ventures Pvt Ltd.</p>
                    <p>Best Regards,<br>Portexim Ventures Pvt Ltd Team</p>
                `,
            };

            tarnsporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    res.status(400).json({ error: "Email not sent" });
                } else {
                    console.log("Email sent", info.response);
                    res.status(200).json({ message: "Email sent successfully" });
                }
            });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.unVerifiedEmployee = async (req, res) => {
    try {
        const email = req.body.email;
        const unverify = await db.get().collection(collection.userCollection).findOneAndUpdate(
            { email: email },
            { $set: { role: 'unVerifiedUser' } });

        if (unverify) {
            const remove = await db.get().collection(collection.verifyPhotoCollection).deleteOne({ userId: unverify._id });

            if (remove.deletedCount > 0) {
                res.status(200).json({ message: "success" });
            } else {
                res.status(500).json({ error: 'Failed to delete verify data' });
            }
        } else {
            res.status(500).json({ error: 'Failed to update role' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



