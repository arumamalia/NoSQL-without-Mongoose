const { ObjectId } = require("mongodb");
const connection = require("../models");

class TransaksiController {
    async getAll(req, res) {
        const dbConnection = connection.db("database_afternoon");
        const transaksi = dbConnection.collection("transaksi");

        try {

            let data = await transaksi.find({}).toArray();
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
        const transaksi = dbConnection.collection("transaksi");

        try {

            let data = await transaksi.findOne({
                _id: new ObjectId(req.params.id),
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
        const transaksi = dbConnection.collection("transaksi");

        try {

            let data = await transaksi.insertOne({
                barang: req.body.barang,
                pelanggan: req.body.pelanggan,
                jumlah: parseInt(req.body.jumlah),
                total: req.body.total,
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
        const transaksi = dbConnection.collection("transaksi");

        try {

            await transaksi.updateOne(
                {
                    _id: new ObjectId(req.params.id),
                },
                {
                    $set: {
                        barang: req.body.barang,
                        pelanggan: req.body.pelanggan,
                        jumlah: parseInt(req.body.jumlah),
                        total: req.body.total,
                    },
                }
            );
            let data = await transaksi.findOne({
                _id: new ObjectId(req.params.id),
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
    async deletebarang(req, res) {
        const dbConnection = connection.db("database_afternoon");
        const transaksi = dbConnection.collection("transaksi");

        try {

            let data = await transaksi.deleteOne({
                _id: new ObjectId(req.params.id),
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
module.exports = new TransaksiController();