const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    degree: { type: String },
    daysOfAvailability: { type: String },
    consultationFees: { type: Number },
    // Additional fields as needed
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
