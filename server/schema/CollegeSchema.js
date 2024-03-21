import mongoose from "mongoose";

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    cname: {
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
    },
    branches: {
      type: [String], // Array of branches
      required: true,
    },
    skills: {
      type: [String], // Array of skills
      required: true,
    },
    userIds: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        jobRole: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

companySchema.index({ description: 'text' });

const Company = mongoose.model("Company", companySchema);

export default Company;
