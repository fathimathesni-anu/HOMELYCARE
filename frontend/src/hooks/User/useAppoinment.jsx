import { useState, useEffect } from 'react';
import axiosinstance from '../../api/axiosInstance';

const useAppointment = () => {
  const [doctors, setDoctors] = useState([]);  // Array to store fetched doctors
  const [selectedDoctor, setSelectedDoctor] = useState(null);  // Selected doctor
  const [appointmentDate, setAppointmentDate] = useState('');  // Date of the appointment
  const [appointmentTime, setAppointmentTime] = useState('');  // Time of the appointment
  const [message, setMessage] = useState('');  // Error or success messages
  const [loading, setLoading] = useState(true);  // To track loading state

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosinstance.get('/doctor');
        setDoctors(response.data.data);  // Set fetched doctors data
        setLoading(false);  // Set loading to false after fetch
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([]);  // Empty the doctors list on error
        setMessage('Error fetching doctors.');
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Book an appointment
  const bookAppointment = async () => {
    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      setMessage('All fields are required!');
      return;
    }

    try {
      const response = await axiosinstance.post('/appoinmentschedule/book', {
        doctorId: selectedDoctor,
        date: appointmentDate,
        time: appointmentTime,
      });
      setMessage('Appointment booked successfully!');
    } catch (error) {
      setMessage('Error booking appointment.');
    }
  };

  // Fetch the patient's appointments (my-appointments)
  const fetchPatientAppointments = async () => {
    try {
      const response = await axiosinstance.get('/appoinmentschedule/my-appointments', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data.data;  // Return the appointments data
    } catch (error) {
      console.error('Error fetching patient appointments:', error);
      setMessage('Error fetching your appointments.');
    }
  };

  return {
    doctors,
    selectedDoctor,
    setSelectedDoctor,
    appointmentDate,
    setAppointmentDate,
    appointmentTime,
    setAppointmentTime,
    bookAppointment,
    message,
    loading,
    fetchPatientAppointments,  // Added function to fetch patient appointments
  };
};

export default useAppointment;




