const { ObjectId } = require("mongodb");
const connection = require("../models");

class PemasokController {
    async getAll(req, res) {
        try {
            const dbConnection = connection.db("database_afternoon");
            const pemasok = dbConnection.collection("pemasok");
            console.log(pemasok);
            let data = await pemasok.find({}).toArray();
            if (data.length === 0) {
                return res.status(404).json({
                    message: "pemasok Not Found",
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
            const pemasok = dbConnection.collection("pemasok");
            let data = await pemasok.findOne({
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
        const pemasok = dbConnection.collection("pemasok");

        try {
            
            let data = await pemasok.insertOne({
                nama: req.body.nama,
            });
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
            const pemasok = dbConnection.collection("pemasok");

            await pemasok.updateOne(
                {
                    _id: ObjectId(req.params.id),
                },
                {
                    $set: {
                        nama: req.body.nama,
                    },
                }
            );
            let data = await pemasok.findOne({
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
        const pemasok = dbConnection.collection("pemasok");
        try {
            let data = await pemasok.deleteOne({
                _id: ObjectId(req.params.id),
            });
            return res.status(200).json({
                message: "Success to delete pemasok",
            });
        } catch (e) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: e,
            });
        }
    }
}
module.exports = new PemasokController();