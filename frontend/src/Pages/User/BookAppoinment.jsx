import React, { useEffect } from 'react';
import useAppointment from '../../hooks/User/useAppoinment'; // Corrected import path

const BookAppointment = () => {
  const {
    doctors,
    selectedDoctor,
    setSelectedDoctor,
    appointmentDate,
    setAppointmentDate,
    appointmentTime,
    setAppointmentTime,
    bookAppointment,
    message,
    loading, // Loading state from hook
  } = useAppointment();

  useEffect(() => {
    // This effect will run whenever the doctors list or loading state changes
  }, [doctors, loading]);

  if (loading) {
    return <p>Loading doctors...</p>; // Display loading message while doctors are fetched
  }

  return (
    <div>
      <h1>Book an Appointment</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Doctor Selection */}
        <div>
          <label>Select Doctor</label>
          <select
            value={selectedDoctor || ""}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            required
          >
            <option value="">Select a doctor</option>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))
            ) : (
              <option value="">No doctors available</option>
            )}
          </select>
        </div>

        {/* Appointment Date */}
        <div>
          <label>Appointment Date</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>

        {/* Appointment Time */}
        <div>
          <label>Appointment Time</label>
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button onClick={bookAppointment}>Book Appointment</button>
      </form>

      {/* Display any message (error/success) */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookAppointment;




