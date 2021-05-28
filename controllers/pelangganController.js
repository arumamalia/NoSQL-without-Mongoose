const { ObjectId } = require("mongodb");
const connection = require("../models");

class PelangganController {
    async getAll(req, res) {
        try {
            const dbConnection = connection.db("database_afternoon");
            const pelanggan = dbConnection.collection("pelanggan");
            console.log(pelanggan);
            let data = await pelanggan.find({}).toArray();
            if (data.length === 0) {
                return res.status(404).json({
                    message: "pelanggan Not Found",
                })
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
        try {
            const dbConnection = connection.db("database_afternoon");
            const pelanggan = dbConnection.collection("pelanggan");
            let data = await pelanggan.findOne({
                _id: ObjectId(req.pelanggan.id),
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
        try {
        const dbConnection = connection.db("database_afternoon");
        const pelanggan = dbConnection.collection("pelanggan");
            
            let data = await pelanggan.insertOne({
                nama: req.body.nama,
            });
            console.log(data);
            return res.status(200).json({
                message: "Success",
                data: data.ops[0],
                
            });
            
        } catch (e) {
            return res.status(500).json({
                message: "Internal Server Error ra mlebu",
                error: e,
            });
        }
    }
    async update(req, res) {
        try {
            const dbConnection = connection.db("database_afternoon");
            const pelanggan = dbConnection.collection("pelanggan");

            await pelanggan.updateOne(
                {
                    _id: ObjectId(req.params.id),
                },
                {
                    $set: {
                        nama: req.body.nama,
                    },
                }
            );
            let data = await pelanggan.findOne({
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
    async deleteBarang(req, res) {
        const dbConnection = connection.db("database_afternoon");
        const pelanggan = dbConnection.collection("pelanggan");
        try {
            let data = await pelanggan.deleteOne({
                _id: ObjectId(req.params.id),
            });
            return res.status(200).json({
                message: "Success to delete pelanggan",
            });
        } catch (e) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: e,
            });
        }
    }
}
module.exports = new PelangganController();