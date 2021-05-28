require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});
const express = require("express");
const transaksiRoutes = require("./routes/transaksiRoutes");
const pemasokRoutes = require("./routes/pemasokRoutes");
const barangRoutes = require("./routes/barangRoutes");
const pelangganRoutes = require("./routes/pelangganRoutes");
const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use("/transaksi", transaksiRoutes);
app.use("/pemasok", pemasokRoutes);
app.use("/barang", barangRoutes);
app.use("/pelanggan", pelangganRoutes);

app.listen(3000, () => console.log("Server running on 3000"));