const mongoose = require('mongoose');

const userStorySchema = new mongoose.Schema({
  story_code: {
    type: String,
    required: true,
    unique: true, // Assuming US1, US2 etc. should be unique
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Story title is required'],
    trim: true
  },
  sprint_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sprints', 
    required: true
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Testing', 'Done'],
    default: 'To Do'
  }
}, {
  // Matches the 'created_at' structure in your JSON
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const UserStory = mongoose.model('user_stories', userStorySchema);

module.exports = UserStory;