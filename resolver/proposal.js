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
      return await Proposal.findOne(
        {
          _id,
        },
        {
          project,
        }
      );
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
      const { coverLetter, propossedRate, projectId } = args;
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
        propossedRate,
        coverLetter,
        projectId,
      });
      try {
        const result = await userObj.save();
        return { ...result._doc };
      } catch (err) {
        console.error(err);
      }
    },
  },
};

export default proposalResolver;
