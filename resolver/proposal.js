import { Project } from "../models.js";
import { User } from "../models.js";
import { Proposal } from "../models.js";
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
      const { coverLetter, proposedRate, projectId, projectTitle, currency } =
        args;
      const { userId } = context;
      if (!userId) {
        throw new Server.AuthenticationError("You must be logged in");
      }
      const newId = new ObjectId();
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
      console.log(isProposalOwner);
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
