const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    medicalHistory: { type: String, required: true },
    currentMedications: { type: String, required: true },
    allergies: { type: String, required: true },
    doctorAssigned: { type: String, required: true },
    appointmentDate: { type: Date, required: true }
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
