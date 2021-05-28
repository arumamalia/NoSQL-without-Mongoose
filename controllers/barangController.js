const { ObjectId } = require("mongodb");
const connection = require("../models");

class BarangController {
    async getAll(req, res) {
        const dbConnection = connection.db("database_afternoon");
        const barang = dbConnection.collection("barang");

        try {

            let data = await barang.find({}).toArray();
            if (data.length === 0) {
                return res.status(404).json({
                    message: "Transaksi Not Found",
                });
            }
            return res.status(200).json({
                message: "Success",
                data,
            });
        } catch (e) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: e,
            });
        }
    }
    async getOne(req, res) {
        const dbConnection = connection.db("database_afternoon");
        const barang = dbConnection.collection("barang");

        try {

            let data = await barang.findOne({
                _id: ObjectId(req.params.id),
            });
            return res.status(200).json({
                message: "Success",
                data,
            });
        } catch (e) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: e,
            });
        }
    }
    async create(req, res) {
        const dbConnection = connection.db("database_afternoon");
        const barang = dbConnection.collection("barang");

        try {

            let data = await barang.insertOne({
                nama: req.body.nama,
                harga: req.body.harga,
                pemasok: req.body.pemasok,
            });
            return res.status(200).json({
                message: "Success",
                data: data.ops[0],
            });
        } catch (e) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: e,
            });
        }
    }
    async update(req, res) {
        const dbConnection = connection.db("database_afternoon");
        const barang = dbConnection.collection("barang");

        try {

            await barang.updateOne(
                {
                    _id: ObjectId(req.params.id),
                },
                {
                    $set: {
                        nama: req.body.nama,
                        harga: req.body.harga,
                        pemasok: req.body.pemasok,
                    },
                }
            );
            let data = await barang.findOne({
                _id: ObjectId(req.params.id),
            });
            return res.status(200).json({
                message: "Success",
                data,
            });
        } catch (e) {
            return res.status(500).json({
                message: "Internal Server Error controller",
                error: e,
            });
        }
    }
    async deletebarang(req, res) {
        const dbConnection = connection.db("database_afternoon");
        const barang = dbConnection.collection("barang");

        try {

            let data = await barang.deleteOne({
                _id: ObjectId(req.params.id),
            });
            return res.status(200).json({
                message: "Success to delete transaksi",
            });
        } catch (e) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: e,
            });
        }
    }
}
module.exports = new BarangController();