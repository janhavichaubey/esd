import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentCard from './AppCard';
import './AppCard.css';

const Appointments = () => {
    const initialNewAppointmentState = {
        patientName: '',
        doctorName: '',
        date: ''
    };

    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState(initialNewAppointmentState);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true); // To manage initial loading state

    useEffect(() => {
        // Fetch appointments, doctors, and patients data
        const fetchData = async () => {
            try {
                const [appointmentsResponse, doctorsResponse, patientsResponse] = await Promise.all([
                    axios.get('http://localhost:5000/appointments'),
                    axios.get('http://localhost:5000/doctors'),
                    axios.get('http://localhost:5000/patients')
                ]);

                setAppointments(appointmentsResponse.data);
                setDoctors(doctorsResponse.data);
                setPatients(patientsResponse.data);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddAppointment = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/appointments/add', newAppointment)
            .then(response => {
                setAppointments([...appointments, response.data]);
                setNewAppointment(initialNewAppointmentState); // Reset newAppointment state
            })
            .catch(error => console.error('Error adding appointment:', error));
    };

    const handleUpdateAppointment = (id, e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/appointments/update/${id}`, selectedAppointment)
            .then(response => {
                const updatedAppointments = appointments.map(appointment =>
                    appointment._id === id ? response.data : appointment
                );
                setAppointments(updatedAppointments);
                setSelectedAppointment(null);
                setIsEditMode(false);
            })
            .catch(error => console.error('Error updating appointment:', error));
    };

    const handleDeleteAppointment = (id) => {
        axios.delete(`http://localhost:5000/appointments/delete/${id}`)
            .then(() => {
                setAppointments(appointments.filter(appointment => appointment._id !== id));
            })
            .catch(error => console.error('Error deleting appointment:', error));
    };

    const handleEditAppointment = (appointment) => {
        // Format date as YYYY-MM-DD for input type="date"
        const formattedDate = appointment.date ? appointment.date.slice(0, 10) : '';

        setSelectedAppointment({
            ...appointment,
            date: formattedDate
        });
        setIsEditMode(true);
    };

    const handleCancelEdit = () => {
        setSelectedAppointment(null);
        setIsEditMode(false);
        setNewAppointment(initialNewAppointmentState); // Reset newAppointment state
    };

    return (
        <div className='flex-row' style={{ width: "100%" }}>
            <div className='flex-column'>
                <div className='add-form'>
                    <h4>{isEditMode ? 'Edit Appointment' : 'Add New Appointment'}</h4>
                    <form className="appointment-form" onSubmit={isEditMode ? (e) => handleUpdateAppointment(selectedAppointment._id, e) : handleAddAppointment}>
                        <label>Patient:</label>
                        <select value={isEditMode && selectedAppointment ? selectedAppointment.patientName : newAppointment.patientName}
                            onChange={(e) => isEditMode ? setSelectedAppointment({
                                ...selectedAppointment,
                                patientName: e.target.value
                            }) : setNewAppointment({
                                ...newAppointment,
                                patientName: e.target.value
                            })}>
                            <option value="">Select Patient</option>
                            {patients.map(patient => (
                                <option key={patient._id} value={patient._id}>{patient.name}</option>
                            ))}
                        </select>
                        <label>Doctor:</label>
                        <select value={isEditMode && selectedAppointment ? selectedAppointment.doctorName : newAppointment.doctorName}
                            onChange={(e) => isEditMode ? setSelectedAppointment({
                                ...selectedAppointment,
                                doctorName: e.target.value
                            }) : setNewAppointment({
                                ...newAppointment,
                                doctorName: e.target.value
                            })}>
                            <option value="">Select Doctor</option>
                            {doctors.map(doctor => (
                                <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
                            ))}
                        </select>
                        <label>Date:</label>
                        <input type="date" value={isEditMode && selectedAppointment ? selectedAppointment.date : newAppointment.date}
                            onChange={(e) => isEditMode ? setSelectedAppointment({
                                ...selectedAppointment,
                                date: e.target.value
                            }) : setNewAppointment({
                                ...newAppointment,
                                date: e.target.value
                            })} />
                        <div className="button-container">
                            <button type="submit">{isEditMode ? 'Update Appointment' : 'Add Appointment'}</button>
                            {isEditMode && <button type="button" className="back-button" onClick={handleCancelEdit}>Back</button>}
                        </div>
                    </form>
                </div>
            </div>
            <div className='appointments'>
                <h3>Appointments ({appointments.length})</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="appointment-list">
                        {appointments.map(appointment => (
                            <AppointmentCard key={appointment._id}
                                appointment={appointment}
                                doctors={doctors}
                                patients={patients}
                                onEdit={handleEditAppointment}
                                onDelete={handleDeleteAppointment}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointments;
