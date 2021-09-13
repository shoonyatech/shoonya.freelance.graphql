import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("User", UserSchema);

export { User };
