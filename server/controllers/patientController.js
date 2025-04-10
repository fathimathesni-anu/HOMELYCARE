 import {Patient} from'../models/patientmodel.js';

// Create a new patient
export const createPatient = async (req, res, next) => {
  const { name, age, gender, contactInfo, medicalHistory, assignedDoctor, appointments } = req.body;
  try {
    const patient = new Patient({ name, age, gender, contactInfo, medicalHistory, assignedDoctor, appointments });
    await patient.save();
    res.status(201).json({ message: 'Patient created successfully', patient });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating patient', error });
  }
};

// Get all patients
export const getAllPatients = async (req, res,next) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error('GET /patients error:', error);
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

// Get a patient by ID
export const getPatientById = async (req, res,next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error });
  }
};

// Update a patient
export const updatePatient = async (req, res,next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient updated', patient });
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient', error });
  }
};

// Delete a patient
export const deletePatient = async (req, res,next) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error });
  }
}; 


