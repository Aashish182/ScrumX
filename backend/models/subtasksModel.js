const mongoose = require('mongoose');

const subTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Sub-task title is required'],
  },
  description: {
    type: String,
  },
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tasks', 
    required: true
  },
  assignee_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do'
  },
  estimated_hours: {
    type: Number,
    default: 0
  },
  actual_hours: {
    type: Number,
    default: 0
  },
  percent_complete: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const SubTask = mongoose.model('subtasks', subTaskSchema);

module.exports = SubTask;