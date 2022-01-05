import { Project, User } from "../models.js";
import mongoose from "mongoose";
import Server from "apollo-server-express";

const { ObjectId } = mongoose.Types;

const projectResolver = {
  Query: {
    async getUserProjects(_, args) {
      const { _id } = args;
      const projectArray = await User.findOne(
        {
          _id,
        },
        {
          projects: 1,
          _id: 0,
        }
      );

      return await Project.find({
        _id: {
          $in: projectArray.projects,
        },
      });
    },

    project(_, args) {
      const { _id } = args;
      return Project.findById({
        _id,
      });
    },

    projects(_, args) {
      const { input } = args;
      const { owner, skills, fixed, hourly, title } = input
      let arr = []
      if (title)
        arr.push({
          '$search': {
            'index': 'projects',
            'text': {
              'query': title,
              'path': 'title',
              'fuzzy': {
                'maxEdits': 1
              }
            }
          }
        })

      if (owner)
        arr.push({
          '$match': {
            'owner': {
              '$not': {
                '$eq': ObjectId(owner)
              }
            }
          }
        })

      if (fixed.checked && fixed.currency)
        arr.push({
          $match: {
            $and: [
              {
                "budget.amount": {
                  ...(fixed.min && { $gt: fixed.min }),
                  ...(fixed.max && { $lt: fixed.max }),
                }
              },
              {
                "budget.currency": {
                  $eq: fixed.currency
                }
              }

            ]

          }
        })


      if (hourly.checked && hourly.currency)
        arr.push({
          $match: {
            $and: [
              {
                "budget.amount": {
                  ...(hourly.min && { $gt: hourly.min }),
                  ...(hourly.max && { $lt: hourly.max }),
                }
              },
              {
                "budget.currency": {
                  $eq: hourly.currency
                }
              }

            ]

          }
        })

      return Project.aggregate(arr)
    },
  },

  Mutation: {
    async addProject(_, args, context) {
      const { userId } = context;
      // console.log({ userId })
      // if (!userId) {
      //   throw new Server.AuthenticationError("You must be logged in");
      // }
      console.log(userId)
      const newId = new ObjectId();
      const { title, scope, budget, skills } = args;
      await User.updateOne(
        {
          _id: userId,
        },
        {
          $push: {
            projects: newId,
          },
        }
      );

      const userObj = new Project({
        _id: newId,
        owner: userId,
        title,
        scope,
        budget,
        skills,
        isPublished: false,
      });

      if (userId) {
        try {
          const result = await userObj.save();
          return { ...result._doc };
        } catch (err) {
          console.error(err);
        }
      }
    },

    async deleteProject(_, args, context) {
      const { userId } = context;
      if (!userId) {
        throw new Server.AuthenticationError("You must be logged in");
      }
      const { _id } = args;
      const isProjectOwner = await User.findOne({
        _id: userId,
        projects: {
          $in: ObjectId(_id),
        },
      }).exec();

      if (!isProjectOwner) {
        throw new Server.ForbiddenError(
          "You are not allowed to do this action"
        );
      }
      await User.updateOne(
        {
          _id: userId,
        },
        {
          $pull: {
            projects: ObjectId(_id),
          },
        }
      );

      await Project.deleteOne({
        _id,
      });
    },

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
