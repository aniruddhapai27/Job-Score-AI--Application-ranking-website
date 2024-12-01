const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Employee ID
  resumeFile: {
    type: String,
    required: true,
  }, // Path to uploaded resume file
  skills: {
    type: [String],
    required: true,
  }, // Extracted skills
  experience: {
    type: String,
    required: false,
  }, // Extracted experience
  education: {
    type: String,
    required: false,
  }, // Extracted education details
  certifications: {
    type: [String],
    required: false,
  }, // Extracted certifications
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Resume = mongoose.model("Resume", ResumeSchema);

module.exports = Resume;
