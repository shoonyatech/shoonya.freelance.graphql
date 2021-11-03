import { Project } from "../models.js";

const projectResolver = {
  Query: {
    project(_, args) {
      const { _id } = args;
      return Project.findById({
        _id,
      });
    },

    projects() {
      return Project.find({});
    },
  },

  Mutation: {
    async updateProjectTitle(_, args, context) {
      const { _id, title } = args;
      const { userId } = context;
      const isProjectOwner = await Project.findOne({
        _id,
        owner: userId,
      }).exec();
      if (isProjectOwner) {
        return Project.findOneAndUpdate(
          { _id },
          {
            $set: {
              title,
            },
          },
          { new: true }
        );
      }
    },

    async updateProjectDescription(_, args, context) {
      const { _id, description } = args;
      const { userId } = context;
      const isProjectOwner = await Project.findOne({
        _id,
        owner: userId,
      }).exec();
      if (isProjectOwner) {
        return Project.findOneAndUpdate(
          { _id },
          {
            $set: {
              description,
            },
          },
          { new: true }
        );
      }
    },

    async updateProjectScope(_, args, context) {
      const { _id, scope } = args;
      const { userId } = context;
      const isProjectOwner = await Project.findOne({
        _id,
        owner: userId,
      }).exec();
      if (isProjectOwner) {
        return Project.findOneAndUpdate(
          { _id },
          {
            $set: {
              scope,
            },
          },
          { new: true }
        );
      }
    },

    async updateProjectBudget(_, args, context) {
      const { _id, budget } = args;
      const { userId } = context;
      const isProjectOwner = await Project.findOne({
        _id,
        owner: userId,
      }).exec();
      if (isProjectOwner) {
        return Project.findOneAndUpdate(
          { _id },
          {
            $set: {
              budget,
            },
          },
          { new: true }
        );
      }
    },

    async updateProjectSkills(_, args, context) {
      const { _id, skills } = args;
      const { userId } = context;
      const isProjectOwner = await Project.findOne({
        _id,
        owner: userId,
      }).exec();
      if (isProjectOwner) {
        return Project.findOneAndUpdate(
          { _id },
          {
            $set: {
              skills,
            },
          },
          { new: true }
        );
      }
    },
  },
};

export default projectResolver;
