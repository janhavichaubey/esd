import React from 'react';
// import './PatientCard.css';

const PatientCard = ({ patient, onEdit, onDelete }) => {
    return (
        <div className='patient-card'>
            <h3>{patient.name}</h3>
            <p>Age: {patient.age}</p>
            <p>Gender: {patient.gender}</p>
            <p>Phone: {patient.phone}</p>
            <p>Email: {patient.email}</p>
            <p>Address: {patient.address}</p>
            <p>Medical History: {patient.medicalHistory}</p>
            <p>Current Medications: {patient.currentMedications}</p>
            <p>Allergies: {patient.allergies}</p>
            <p>Doctor Assigned: {patient.doctorAssigned}</p>
            <p>Appointment Date: {new Date(patient.appointmentDate).toLocaleDateString()}</p>
            <button onClick={onEdit}>Edit</button>
            <button className="delete-button" onClick={onDelete}>Delete</button>
        </div>
    );
};

export default PatientCard;
