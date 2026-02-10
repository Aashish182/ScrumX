// const mongoose = require('mongoose');

// const subTaskSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Sub-task title is required'],
//   },
//   description: {
//     type: String,
//   },
//   task_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'tasks', 
//     required: true
//   },
//   assignee_id: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'user', 
//     required: true 
//   },
//   status: {
//     type: String,
//     enum: ['To Do', 'In Progress', 'Done'],
//     default: 'To Do'
//   },
//   estimated_hours: {
//     type: Number,
//     default: 0
//   },
//   actual_hours: {
//     type: Number,
//     default: 0
//   },
//   percent_complete: {
//     type: Number,
//     min: 0,
//     max: 100,
//     default: 0
//   }
// }, {
//   timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
// });

// const SubTask = mongoose.model('subtasks', subTaskSchema);

// module.exports = SubTask;


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
    required: false, 
    default: "00"
  },
  role_tag: { // New Field: To store if this was assigned for Dev/Tester/Analyst
    type: String,
    enum: ['Developer', 'Tester', 'Analyst'],
    default: 'Developer'
  },
  status: {
    type: String,
    enum: ['Draft','Pending', 'To Do', 'In Progress', 'Done', 'Rejected'],
    default: 'Pending' // Start as "Pending" to trigger the handshake process
  },
  estimated_hours: { type: Number, default: 0 },
  actual_hours: { type: Number, default: 0 },
  percent_complete: { type: Number, min: 0, max: 100, default: 0 }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const SubTask = mongoose.model('subtasks', subTaskSchema);
module.exports = SubTask;