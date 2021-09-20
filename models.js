import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type : String,
    required : true,
  },
  title: {
    type : String,
    required : true,
  },
  picture: {
    type : String,
    required : true,
  },
  bio: {
    type : String,
    required : true,
  },
  contact: {
    type : Object,
    required : true
  },
  professionalExperience : {
    type: Array,
    required: true
  },
  skills : {
    type: Array,
    required: true
  },
  education : {
    type: Array,
    required: true
  },
  developerCommunityInvolement : {
    type: Array,
    required: true
  },
  language : {
    type: Object,
    required: true
  },
  hobbies : {
    type: Object,
    required: true
  },
  sports : {
    type : Object,
    required: true
  },
  countriesICanWork : {
    type : Object,
    required: true
  }
});

const User = mongoose.model("User", UserSchema);

export { User };
