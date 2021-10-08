import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type : String,
    required : true,
  },
  title: {
    type : String,
  },
  picture: {
    type : String,
  },
  bio: {
    type : String,
  },
  contact: {
    type : Object,
  },
  professionalExperience : {
    type: Array,
  },
  skills : {
    type: Array,
  },
  education : {
    type: Array,
  },
  developerCommunityInvolement : {
    type: Array,
  },
  languages : {
    type: Array,
  },
  hobbies : {
    type: Object,
  },
  sports : {
    type : Object,
  },
  countriesICanWork : {
    type : Array,
  }
});

const User = mongoose.model("User", UserSchema);

export { User };
