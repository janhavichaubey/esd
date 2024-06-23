// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const patientsRouter = require('./routes/patient');
const doctorsRouter = require('./routes/doctors');
const appointmentsRouter = require('./routes/appointments');


const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://username:password@cluster0.xopqd2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);
const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');
const User = require('./models/Usermodel');

app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// const client = new MongoClient(uri, {
// 	ssl: true,	
//     tlsAllowInvalidCertificates: true, // For development purposes only
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db('admin').command({ ping: 1 });
//         console.log('Pinged your deployment. You successfully connected to MongoDB!');
        
//         // Use the client in your routes
//         app.use((req, res, next) => {
//             req.dbClient = client;
//             req.Patient = Patient;
//             req.Doctor = Doctor;
//             req.Appointment = Appointment;
//             next();
//         });
		


        

//     } catch (err) {
//         console.error(err);
//         process.exit(1); // Exit the process with failure
//     }
// }

// run().catch(console.dir);


