import { Project, User, Proposal } from "../models.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import Server from "apollo-server-express";

const proposalResolver = {
  Query: {
    async getUserProposals(_, args) {
      const { _id } = args;
      const proposalIdArray = await User.findOne(
        {
          _id,
        },
        {
          "proposals._id": 1,
          _id: 0,
        }
      );
      const proposalIdArray2 = proposalIdArray.proposals.map(
        (proposal) => proposal._id
      );
      return await Proposal.find({
        _id: {
          $in: proposalIdArray2,
        },
      });
    },

    async getProposalsByProject(_, args) {
      const { _id } = args;
      const temp = await Project.findOne(
        {
          _id,
        },
        {
          proposers: 1,
          _id: 0,
        }
      );
      return await User.find({
        _id: {
          $in: temp.proposers,
        },
      });
    },

    async getProjectOwner(_, args) {
      const { _id } = args;
      return Project.findOne(
        {
          _id,
        },
        {
          owner: 1,
          _id: 0,
        }
      );
    },

    async getProposalsById(_, args) {
      const { _id } = args;
      return await Proposal.findOne({
        _id,
      });
    },

    async getProposals(_, args) {
      const { projectId } = args;
      const isProjectExist = await Project.findOne({
        _id: projectId,
      }).exec();
      if (isProjectExist) {
        return await Proposal.find({
          projectId,
        });
      }
      // handle error here
    },
  },

  Mutation: {
    async addNewProposal(_, args, context) {
      const { userId } = context;
      if (!userId) {
        throw new Server.AuthenticationError("You must be logged in");
      }
      const { coverLetter, proposedRate, projectId, projectTitle, currency } =
        args;
      const newId = new ObjectId();
      const check = await Project.findOne({
        _id: projectId,
      }).exec();
      await Project.updateOne(
        {
          _id: projectId,
        },
        {
          $push: {
            proposers: userId,
          },
        }
      );
      await User.updateOne(
        {
          _id: userId,
        },
        {
          $push: {
            proposals: {
              _id: newId,
            },
          },
        }
      );
      const userObj = new Proposal({
        _id: newId,
        proposedRate,
        coverLetter,
        projectId,
        projectTitle,
        currency,
      });
      try {
        const result = await userObj.save();
        return { ...result._doc };
      } catch (err) {
        console.error(err);
      }
    },

    async deleteProposal(_, args, context) {
      const { userId } = context;
      if (!userId) {
        throw new Server.AuthenticationError("You must be logged in");
      }
      const { _id } = args;
      const isProposalOwner = await User.findOne({
        _id: userId,
        proposals: {
          $elemMatch: { _id: ObjectId(_id) },
        },
      }).exec();
      if (!isProposalOwner) {
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
            proposals: {
              _id: ObjectId(_id),
            },
          },
        }
      );

      await Proposal.deleteOne({
        _id,
      });
    },
  },
};

export default proposalResolver;
