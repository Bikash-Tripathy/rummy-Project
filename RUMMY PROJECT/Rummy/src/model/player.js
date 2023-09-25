const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const playerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  chips: {
    type: Number,
    default: 0,
  },
});


 module.exports = mongoose.model('Player', playerSchema);

 // Hash the password before saving it to the database
// playerSchema.pre('save', async function (next) {
//   try {
//     if (!this.isModified('password')) {
//       return next();
//     }
//     const hashedPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashedPassword;
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

// // Method to compare a password with the hashed password in the database
// playerSchema.methods.comparePassword = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

