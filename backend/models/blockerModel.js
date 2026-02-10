const mongoose = require('mongoose');

const blockerSchema = new mongoose.Schema({
  subtask_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subtasks',
    required: true
  },
  reason: {
    type: String,
    required: [true, 'A reason for the blocker must be provided'],
  },
  reportedby_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', 
    required: true
  },
  resolved: {
    type: Boolean,
    default: false
  },
  resolved_at: {
    type: Date,
    default: null
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Blocker = mongoose.model('blockers', blockerSchema);

module.exports = Blocker;