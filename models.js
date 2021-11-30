import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  picture: {
    type: String,
  },
  bio: {
    type: String,
  },
  contact: {
    type: Object,
  },
  professionalExperience: {
    type: Array,
  },
  skills: {
    type: Array,
  },
  education: {
    type: Array,
  },
  developerCommunityInvolement: {
    type: Array,
  },
  languages: {
    type: Array,
  },
  hobbies: {
    type: Object,
  },
  sports: {
    type: Object,
  },
  countriesICanWork: {
    type: Array,
  },
  proposals: [
    {
      coverLetter: {
        type: String,
      },
      propossedRate: {
        type: String,
      },
      projectId: {
        type: ObjectId,
      },
    },
  ],
});

const ProjectSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  owner: {
    type: ObjectId,
  },
  scope: {
    type: Object,
  },
  budget: {
    type: Object,
  },
  skills: {
    type: Array,
  },
  isPublished: {
    type: Boolean,
  },
});

const User = mongoose.model("User", UserSchema);
const Project = mongoose.model("Project", ProjectSchema);

export { User, Project };
