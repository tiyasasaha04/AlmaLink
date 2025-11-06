const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  jobType: { 
    type: String, 
    enum: ['Full-time', 'Part-time', 'Internship', 'Contract'], 
    required: true 
  },
  location: { type: String },
  description: { type: String, required: true },
  applyLink: { type: String }, // Optional direct link or email
  postedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
}, {
  timestamps: true // Creates createdAt
});

module.exports = mongoose.model('Job', JobSchema);