const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['sprint', 'monthly', 'project', 'incident'],
    required: true,
    lowercase: true
  },
  content: {
    type: String, 
    required: [true, 'Report content cannot be empty']
  },
  sprint_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sprints',
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Report = mongoose.model('reports', reportSchema);

module.exports = Report;