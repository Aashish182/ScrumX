const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
  },
  description: {
    type: String,
    required: [true, 'Task description is required']
  },
  story_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_stories', 
    required: true
  },
  sprint_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sprints',
    required: true
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'In Review', 'Done'],
    default: 'To Do'
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;