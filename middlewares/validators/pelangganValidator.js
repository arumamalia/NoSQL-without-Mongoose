const validator = require("validator");
const { ObjectId } = require("mongodb");
const connection = require("../../models");

module.exports.create = async (req, res, next) => {
    // const penjualan = connection.db("database_afternoon");
    // const pelanggan = penjualan.collection("pelanggan");
    try {
        let errors = [];
    
        if (!validator.isAlpha(req.body.nama)) {
            errors.push("nama must be a string");
        }
        if (errors.length > 0) {
            return res.status(400).json({
                message: errors.join(", "),
            });
        }
        req.body.pelanggan = req.body.nama;
        console.log(req.body.pelanggan);
        next();
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error validator",
            error: e,
        });
    }
};
module.exports.update = async (req, res, next) => {
         const penjualan = connection.db("database_afternoon");
         const pelanggan = penjualan.collection("pelanggan");
    try {
        let findData = await Promise.all([
            penjualan.collection("pelanggan").findOne({
                _id: ObjectId (req.params.id),
            }),
        ]);
        console.log(findData[0]);
        let errors = [];
        if (!findData[0]) {
            errors.push("pelanggan Not Found");
        }
        if (!validator.isAlpha(req.body.nama)) {
            errors.push("nama must be a string");
        }
        if (errors.length > 0) {
            return res.status(400).json({
                message: errors.join(", "),
            });
        }
        req.body.pelanggan = req.body.nama;
        console.log(req.body.pelanggan);
        next();
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: e,
        });
    }
};
