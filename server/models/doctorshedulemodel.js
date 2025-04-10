import mongoose, { Schema } from 'mongoose';

// Doctor Schema
const doctorSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    specialization: { type: String },
    schedule: [{ type: String }],
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
  },
  {
    timestamps: true, // Includes createdAt and updatedAt
  }
);

export const Doctor = mongoose.model('Doctor', doctorSchema);
