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
      // todo : check if only owner is tryign to access this query
      const { _id } = args;
      const temp = await Project.findOne(
        {
          _id,
        },
        {
          proposals: 1,
          _id: 0,
        }
      );
      console.log(temp.proposals)
      const propossers = temp.proposals
      return await User.find({
        _id: {
          $in: propossers,
        },
      });
    },

    async getProposalsByProject2(_, args) {
      // todo : check if only owner is tryign to access this query
      const { _id } = args;
      const temp = await Project.findOne(
        {
          _id,
        },
        {
          proposals: 1,
          _id: 0,
        }
      );
      const proposals = temp.proposals
      console.log(proposals)
      return await Proposal.find({
        _id: {
          $in: proposals,
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

    async getProposalsById(_, args, context) {
      const { _id } = args;
      const { userId } = context
      const res = await Proposal.findOne({
        _id,
      }).exec()
      // todo : allow the owner of the project to view the proposal
      if (!res.proposser._id.equals(userId))
        throw new Server.ForbiddenError(
          "You dont have the permission to view this proposal"
        );

      return await Proposal.findOne({
        _id,
      })
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
    async hasUserAppliedForProject(_, args, context) {
      const { userId } = context
      const { projectId } = args
      return Proposal.findOne(
        {
          projectId,
          "proposser._id": ObjectId(userId)
        }
      )
    }
  },

  Mutation: {
    async addNewProposal(_, args, context) {
      const { userId } = context;
      if (!userId)
        throw new Server.AuthenticationError("You must be logged in");
      const { coverLetter, proposedRate, projectId, projectTitle, currency, proposser
      } =
        args;
      const newId = new ObjectId();

      await Project.updateOne(
        {
          _id: projectId,
        },
        {
          $push: {
            proposals: newId,
          },
        }
      );
      const userDetails = await User.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          $push: {
            proposals:
              newId,
          },
        }
      ).exec()

      const userObj = new Proposal({
        _id: newId,
        proposedRate,
        coverLetter,
        proposser: {
          _id: ObjectId(userId),
          name: userDetails?.name,
          skills: userDetails?.skills,
          picture: userDetails?.picture,
          location: userDetails?.contact?.location
        },
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
      const { _id, projectId } = args;
      const isProposalOwner = await User.findOne({
        _id: userId,
        proposals: {
          $in: ObjectId(_id),
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
            proposals: ObjectId(_id),
          },
        }
      );

      await Project.updateOne(
        {
          _id: projectId
        },
        {
          $pull: {
            proposals: ObjectId(_id)
          }
        }
      )
      await Proposal.deleteOne({
        _id,
      });
    },


    async updateProposal(_, args, context) {
      const { userId } = context;
      if (!userId) {
        throw new Server.AuthenticationError("You must be logged in");
      }
      const { _id, coverLetter, proposedRate } = args
      return Proposal.findOneAndUpdate(
        { _id },
        {
          $set: {
            coverLetter,
            proposedRate
          }
        },
        { new: true }
      )
    }

  },
};

export default proposalResolver;
