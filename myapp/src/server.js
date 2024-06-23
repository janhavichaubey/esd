// server.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const patientsRouter = require("./routes/patients");
const doctorsRouter = require("./routes/doctors");
const appointmentsRouter = require("./routes/appointments")
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://username:password@cluster0.xopqd2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
	serverApi: {
	  version: ServerApiVersion.v1,
	  strict: true,
	  deprecationErrors: true,
	}
  });

  async function run() {
	try {
	  // Connect the client to the server	(optional starting in v4.7)
	  await client.connect();
	  // Send a ping to confirm a successful connection
	  await client.db("admin").command({ ping: 1 });
	  console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} finally {
	  // Ensures that the client will close when you finish/error
	  await client.close();
	}
  }

run().catch(console.dir);

app.use("/patients", patientsRouter);
app.use("/doctors", doctorsRouter);
app.use("/appointments", appointmentsRouter)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
