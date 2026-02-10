const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Sprint name is required'],
  },
  goal: {
    type: String,
    required: [true, 'Sprint goal is required']
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'project',
    required: false
  },
  team_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'teams',
    required: false
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Planned', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Planned'
  }
}, {
  // This automatically handles the 'created_at' and 'updated_at' fields
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Sprint = mongoose.model('sprints', sprintSchema);

module.exports = Sprint;