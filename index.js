const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;

const app = express();

// middleware
const cors = require("cors");

app.use(cors());
app.use(express.json());

require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xloj4nu.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        const updateDataCollections = client
            .db("saas-business")
            .collection("update-data");

        // update header
        app.put("/update2", async (req, res) => {
            const updateData = req.body;
            console.log(updateData);
            const id = "63c6f178aac2ec9a08633bb9";

            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const newData = {
                $set: {
                    header: updateData.header,
                },
            };
            const result = await updateDataCollections.updateOne(
                filter,
                newData,
                options
            );
            res.send(result);
        });

        // get header
        app.get("/update", async (req, res) => {
            const result = await updateDataCollections.findOne();
            res.send(result);
        });

        // update log
        app.put("/updateLogo", async (req, res) => {
            const updateLogo = req.body;

            const id = "63c6f178aac2ec9a08633bb9";

            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const newData = {
                $set: {
                    logo: updateLogo.logo,
                },
            };
            const result = await updateDataCollections.updateOne(
                filter,
                newData,
                options
            );
            res.send(result);
        });
    } finally {
    }
}

run().catch((e) => console.log(e));

app.get("/", (req, res) => {
    res.send("SaaS business server is running...");
});

app.listen(port, (req, res) => {
    console.log(`task tracker is running on ${port}`);
});
