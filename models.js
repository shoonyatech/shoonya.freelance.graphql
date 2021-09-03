import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  profilePicUrl: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

export { User };
