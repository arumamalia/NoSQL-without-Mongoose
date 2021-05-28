const validator = require("validator");
const { ObjectId } = require("mongodb");
const connection = require("../../models");

module.exports.create = async (req, res, next) => {

        const penjualan = connection.db("database_afternoon");
        const transaksi = penjualan.collection("transaksi");
    try{
        console.log(ObjectId(req.body.id_barang));
        console.log(ObjectId(req.body.id_pelanggan));
        let findData = await Promise.all([
            penjualan.collection("barang").findOne({
                _id: ObjectId(req.body.id_barang),
            }),
            penjualan.collection("pelanggan").findOne({
                _id: ObjectId(req.body.id_pelanggan),
            }),
        ]);
        console.log(findData[0]);
        console.log(findData[1]);
        let errors = [];
        if(!findData[0]){
            errors.push("Barang Not Found");
        }
        if(!findData[1]){
            errors.push("Pelanggan Not Found");
        }
        if(!validator.isNumeric(req.body.jumlah)){
            errors.push("Jumlah must be a number");
    }
    if(errors.length > 0){
        return res.status(400).json({
            message: errors.join(", "),
        });
    }
    req.body.barang = findData[0];
    req.body.pelanggan = findData[1];
    req.body.total = eval(findData[0].harga.toString()) * req.body.jumlah;
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
    const transaksi = penjualan.collection("transaksi");
    console.log(ObjectId(req.body.id_barang));
    console.log(ObjectId(req.body.id_pelanggan));
    try{
        let findData = await Promise.all([
            penjualan.collection("barang").findOne({
                _id: ObjectId(req.body.id_barang),
            }),
            penjualan.collection("pelanggan").findOne({
                _id: ObjectId(req.body.id_pelanggan),
            }),
            transaksi.findOne({
                _id: ObjectId(req.params.id),
            }),
        ]);
        console.log("eror valid");
        let errors = [];
        if(!findData[0]){
            errors.push("Barang Not Found");
        }
        if(!findData[1]){
            errors.push("Pelanggan Not Found");
        }
        if (!findData[2]) {
            errors.push("Transaksi Not Found");
          }      
        if(!validator.isNumeric(req.body.jumlah)){
            errors.push("Jumlah must be a number");
    }
    if(errors.length > 0){
        return res.status(400).json({
            message: errors.join(", "),
        });
    }
    req.body.barang = findData[0];
    req.body.pelanggan = findData[1];
    req.body.total = eval(findData[0].harga.toString()) * req.body.jumlah;
    next();
} catch (e){
    return res.status(500).json({
        message: `Internal Server Error validator `,
        error : e,
    });
   }
};
