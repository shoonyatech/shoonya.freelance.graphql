import { Proposal } from "../models.js";

const proposalResolver = {
  Query: {
    async proposals(_, args) {
      const { proposser, projectId } = args;
      const getProposals = proposser
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
