import { Proposal } from "../models.js";
import { Project } from "../models.js";
const proposalResolver = {
  Query: {
    /* async proposals(_, args) {
      const { proposser, projectId } = args;
      const getProposals = 
        ? await Proposal.find({
            proposser,
          })
        : await Proposal.find({
            projectId,
          });

      try {
        const result = getProposals;
        return result ? result : [];
      } catch (err) {
        console.log(err);
      }
    }, */

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
      const { coverLetter, budget, projectId } = args;
      const { userId } = context;
      if (!userId) return;
      const proposalObj = new Proposal({
        coverLetter,
        budget,
        projectId,
        proposser: userId,
      });
      try {
        const result = await proposalObj.save();
        return { ...result._doc };
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default proposalResolver;
