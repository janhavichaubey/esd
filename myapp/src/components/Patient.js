import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Patients.css';
import PatientCard from './PatientCard';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({
        name: '', age: '', gender: '', phone: '', email: '', address: '',
        medicalHistory: '', currentMedications: '', allergies: '',
        doctorAssigned: '', appointmentDate: ''
    });
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/patients')
            .then(response => setPatients(response.data))
            .catch(error => console.error('Error fetching patients:', error));
    }, []);

    const handleAddPatient = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/patients/add', newPatient)
            .then(response => {
                console.log(response.data);
                setPatients([...patients, response.data]);
                setNewPatient({
                    name: '', age: '', gender: '', phone: '', email: '', address: '',
                    medicalHistory: '', currentMedications: '', allergies: '',
                    doctorAssigned: '', appointmentDate: ''
                });
            })
            .catch(error => console.error('Error adding patient:', error));
    };

    const handleUpdatePatient = (id, e) => {
        e.preventDefault();

        axios.post(`http://localhost:5000/patients/update/${id}`, selectedPatient)
            .then(response => {
                const updatedPatient = { ...selectedPatient, _id: id };

                setPatients(patients.map(patient => (patient._id === id ? updatedPatient : patient)));
                setSelectedPatient(null);
                setIsEditMode(false); // Switch back to Add mode
            })
            .catch(error => console.error('Error updating patient:', error));
    };

    const handleDeletePatient = (id) => {
        axios.delete(`http://localhost:5000/patients/delete/${id}`)
            .then(response => {
                console.log(response.data);
                setSelectedPatient(null);
                setPatients(patients.filter(patient => patient._id !== id));
            })
            .catch(error => console.error('Error deleting patient:', error));
    };

    const handleEditPatient = (patient) => {
        setSelectedPatient(patient);
        setIsEditMode(true); // Switch to Edit mode
    };

    return (
        <div className='patient-main'>
            <div className='form-sections'>
                <h4>{isEditMode ? 'Edit Patient' : 'Add New Patient'}</h4>
                <form onSubmit={isEditMode ? (e) => handleUpdatePatient(selectedPatient._id, e) : handleAddPatient}>
                    <label>Name: </label>
                    <input type="text"
                        value={isEditMode ? selectedPatient.name : newPatient.name}
                        onChange={(e) => isEditMode ? setSelectedPatient({ ...selectedPatient, name: e.target.value }) : setNewPatient({ ...newPatient, name: e.target.value })} />
                    <br />
                    <label>Age: </label>
                    <input type="text"
                        value={isEditMode ? selectedPatient.age : newPatient.age}
                        onChange={(e) => isEditMode ? setSelectedPatient({ ...selectedPatient, age: e.target.value }) : setNewPatient({ ...newPatient, age: e.target.value })} />
                    <br />
                    <label>Gender: </label>
                    <input type="text"
                        value={isEditMode ? selectedPatient.gender : newPatient.gender}
                        onChange={(e) => isEditMode ? setSelectedPatient({ ...selectedPatient, gender: e.target.value }) : setNewPatient({ ...newPatient, gender: e.target.value })} />
                    <br />
                    <label>Phone: </label>
                    <input type="text"
                        value={isEditMode ? selectedPatient.phone : newPatient.phone}
                        onChange={(e) => isEditMode ? setSelectedPatient({ ...selectedPatient, phone: e.target.value }) : setNewPatient({ ...newPatient, phone: e.target.value })} />
                    <br />
                    <label>Email: </label>
                    <input type="email"
                        value={isEditMode ? selectedPatient.email : newPatient.email}
                        onChange={(e) => isEditMode ? setSelectedPatient({ ...selectedPatient, email: e.target.value }) : setNewPatient({ ...newPatient, email: e.target.value })} />
                    <br />
                    <label>Address: </label>
                    <input type="text"
                        value={isEditMode ? selectedPatient.address : newPatient.address}
                        onChange={(e) => isEditMode ? setSelectedPatient({ ...selectedPatient, address: e.target.value }) : setNewPatient({ ...newPatient, address: e.target.value })} />
                    <br />
                    <label>Medical History: </label>
                    <input type="text"
                        value={isEditMode ? selectedPatient.medicalHistory : newPatient.medicalHistory}
                        onChange={(e) => isEditMode ? setSelectedPatient({ ...selectedPatient, medicalHistory: e.target.value }) : setNewPatient({ ...newPatient, medicalHistory: e.target.value })} />
                    <br />
                    <label>Current Medications: </label>
                    <input type="text"
                        value={isEditMode ? selectedPatient.currentMedications : newPatient.currentMedications}
                        onChange={(e) => isEditMode ? setSelectedPatient({ ...selectedPatient, currentMedications: e.target.value }) : setNewPatient({ ...newPatient, currentMedications: e.target.value })} />
                    <br />
                    <label>Allergies: </label>
                    <input type="text"
                        value={isEditMode ? selectedPatient.allergies : newPatient.allergies}
                        onChange={(e) => isEditMode ? setSelectedPatient({ ...selectedPatient, allergies: e.target.value }) : setNewPatient({ ...newPatient, allergies: e.target.value })} />
                    <br />
                    <label>Doctor Assigned: </label>
                    <input type="text"
                        value={isEditMode ? selectedPatient.doctorAssigned : newPatient.doctorAssigned}
                        onChange={(e) => isEditMode ? setSelectedPatient({ ...selectedPatient, doctorAssigned: e.target.value }) : setNewPatient({ ...newPatient, doctorAssigned: e.target.value })} />
                    <br />
                    <label>Appointment Date: </label>
                    <input type="date"
                        value={isEditMode ? selectedPatient.appointmentDate : newPatient.appointmentDate}
                        onChange={(e) => isEditMode ? setSelectedPatient({ ...selectedPatient, appointmentDate: e.target.value }) : setNewPatient({ ...newPatient, appointmentDate: e.target.value })} />
                    <br />
                    <button type="submit">{isEditMode ? 'Update Patient' : 'Add Patient'}</button>
                    {isEditMode && <button onClick={() => setIsEditMode(false)}>Cancel Edit</button>}
                </form>
            </div>
            <div className='patients-list'>
                {patients.map(patient => (
                    <PatientCard
                        key={patient._id}
                        patient={patient}
                        onEdit={() => handleEditPatient(patient)}
                        onDelete={() => handleDeletePatient(patient._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Patients;
