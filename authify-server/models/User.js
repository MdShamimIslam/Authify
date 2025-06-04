import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shopNames: {
    type: [String],
    validate: {
      validator: function(arr) {
        return arr.every(name => typeof name === "string" && name.trim().length > 0);
      },
      message: "Shop names must be non-empty strings"
    },
    required: true
  }
});

export default mongoose.model('User', userSchema);