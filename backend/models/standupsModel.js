const mongoose = require('mongoose');

const subtaskUpdateSchema = new mongoose.Schema({
  subtask_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subtasks',
    required: true
  },
  subtask_title: String,
  task_title: String,
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done', 'Blocked'],
    required: true
  },
  percent_complete: {
    type: Number,
    min: 0,
    max: 100,
    default: null 
  },
  raw_sentence: String,
  confidence: {
    type: Number,
    min: 0,
    max: 1
  }
});

const updateSchema = new mongoose.Schema({
  developer_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  updates: [subtaskUpdateSchema], // Array of sub-schema objects
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Update = mongoose.model('standups', updateSchema);

module.exports = Update;