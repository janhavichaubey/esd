import React from 'react';

const AppointmentCard = ({ appointment, doctors, patients, onEdit, onDelete }) => {
    const doctorName = doctors.find(doctor => doctor._id === appointment.doctorName)?.name;
    const patientName = patients.find(patient => patient._id === appointment.patientName)?.name;

    return (
        <div className="appointment-card">
            <p>
                <span>Patient: </span>{patientName}
            </p>
            <p>
                <span>Doctor: </span>{doctorName}
            </p>
            <p>
                <span>Date: </span>{new Date(appointment.date).toLocaleDateString()}
            </p>
            <div className='btn-container'>
                <button onClick={() => onEdit(appointment)}>
                    Edit
                </button>
                <button onClick={() => onDelete(appointment._id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default AppointmentCard;
