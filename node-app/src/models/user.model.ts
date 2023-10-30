import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Email ID is a required field.'],
    min: 3,
    max: 100
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email ID is a required field.'],
    min: 3,
    max: 100
  },
  password: {
    type: String,
    required: [true, 'Password is a required field.'],
    min: [5, 'Password should be of minimum 5 characters.']
  },
  email_verified: Boolean,
  picture: String,
})

export default mongoose.model('User', userSchema);