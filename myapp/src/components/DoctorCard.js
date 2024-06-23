import React from 'react';

const DoctorCard = ({ doctor, onEdit, onDelete }) => {
    return (
        <div className="doctor-card">
            <p>{doctor.name} - {doctor.specialty}</p>
            <p>Degree: {doctor.degree}</p>
            <p>Days of Availability: {doctor.daysOfAvailability}</p>
            <p>Consultation Fees: {doctor.consultationFees}</p>
            <div className='btn-container'>
                <button onClick={() => onEdit(doctor)}>Edit</button>
                <button onClick={() => onDelete(doctor._id)}>Delete</button>
            </div>
        </div>
    );
};

export default DoctorCard;
