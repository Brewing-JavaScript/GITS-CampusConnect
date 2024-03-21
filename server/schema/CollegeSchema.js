import mongoose from 'mongoose';

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    jobRole: {
      type: [String],
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    eligibility: {
      type: String,
      required: true,
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
    companyVisitDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true, // Assuming description is required for text search
    },
    branches: {
      type: [String],
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    userIds: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        jobRole: {
          type: String,
          required: true,
        },
        name: String, // If not required, can be simplified
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add text index for searching in the 'description' field
companySchema.index({ description: 'text' }); 
const Company = mongoose.model('Company', companySchema);

export default Company;
