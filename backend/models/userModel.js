// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new mongoose.Schema({
//     name: String,
//     number: String,
//     email: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     password: String,
//     role : String
// },{
//     timestamps: true
// })

// const userModel = mongoose.model("user",userSchema);

// module.exports = userModel;


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new mongoose.Schema({
//     name: String,
//     number: String,
//     email: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     password: String, 
//     role: {
//         type: String,
//         default: "GENERAL" 
//     },
//     roleId: {
//         type: String,
//         default: null      
//     },
//     rolePassword: {
//         type: String,
//         default: null
//     }
// }, {
//     timestamps: true
// });

// const userModel = mongoose.model("user", userSchema);

// module.exports = userModel;


// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    number: { type: String, default: "" },
    role: {
        type: String,
        default: "GENERAL" 
    },
    roleId: {
        type: String,
        default: null      
    },
    rolePassword: {
        type: String,
        default: null
    },
    office: { type: String, default: "" },
    emergency: { type: String, default: "" },
    languages: { type: String, default: "" },
    country: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    // Array to store uploaded document info
    documents: [
        {
            name: String,
            file: String,
            url: String // Base64 or Cloudinary URL
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);