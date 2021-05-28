const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const connection = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
try {
    connection.connect();
    console.log("MongoDB Connected");
} catch (e) {
    console.error(e);
}
module.exports = connection;
