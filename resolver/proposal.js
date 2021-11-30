import { Project } from "../models.js";
import { User } from "../models.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import Server from "apollo-server-express";

const proposalResolver = {
  Query: {
    async getProposalsByUser(_, args) {
      const { proposser } = args;
      return await Proposal.find({
        proposser,
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
      const { coverLetter, propossedRate, projectId } = args;
      const { userId } = context;
      if (!userId) {
        throw new Server.AuthenticationError(
          "You must be logged in to request information from this API"
        );
      }

      return User.updateOne(
        {
          _id: userId,
        },
        {
          $push: {
            proposals: {
              coverLetter,
              propossedRate,
              projectId,
              _id: new ObjectId(),
            },
          },
        }
      );
    },
  },
};

export default proposalResolver;
