const validator = require("validator");
const { ObjectId } = require("mongodb");
const connection = require("../../models");

module.exports.create = async (req, res, next) => {

        const penjualan = connection.db("database_afternoon");
        const barang = penjualan.collection("barang");
    try{
        // console.log(ObjectId(req.body.id_barang));
        // console.log(ObjectId(req.body.id_pelanggan));
        let findData = await Promise.all([
            penjualan.collection("pemasok").findOne({
                _id: ObjectId(req.body.id_pemasok),
            }),
        ]);
        console.log(findData[0]);
        // console.log(findData[1]);
        let errors = [];
        if(!findData[0]){
            errors.push("Pemasok Not Found");
        }
        // if(!findData[1]){
        //     errors.push("Pelanggan Not Found");
        // }
        if (!validator.isAlpha(req.body.nama)) {
            errors.push("nama must be a string");
        }
        if (!validator.isNumeric(req.body.harga)) {
            errors.push("nama must be a string");
        }
    if(errors.length > 0){
        return res.status(400).json({
            message: errors.join(", "),
        });
    }
    req.body.pemasok = findData[0];
    next();
} catch (e){
    return res.status(500).json({
        message: "Internal Server Error",
        error : e,
    });
    }
};
module.exports.update = async (req, res, next) => {
    const penjualan = connection.db("database_afternoon");
    const barang = penjualan.collection("barang");
    try{
        let findData = await Promise.all([
            penjualan.collection("pemasok").findOne({
                _id: ObjectId(req.body.id_pemasok),
            }),
            barang.findOne({
                _id: ObjectId(req.params.id),
            }),
        ]);
        console.log(ObjectId(req.body.id_pemasok));
        console.log(ObjectId(req.body.id_pemasok));
        let errors = [];
        if(!findData[0]){
            errors.push("Pemasok Not Found");
        }
        if(!findData[1]){
            errors.push("Barang Not Found");
        }    
        if (!validator.isAlpha(req.body.nama)) {
            errors.push("nama must be a string");
        }
        if (!validator.isNumeric(req.body.harga)) {
            errors.push("nama must be a string");
        }
    if(errors.length > 0){
        return res.status(400).json({
            message: errors.join(", "),
        });
    }
    req.body.pemasok = findData[0];
    next();
} catch (e){
    return res.status(500).json({
        message: `Internal Server Error validator `,
        error : e,
    });
   }
};
