import { Proposal } from "../models.js";

const proposalResolver = {
  Query: {},

  Mutation: {
    async addNewProposal(_, args, context) {
      const { coverLetter, budget } = args;
      const { userId } = context;
      if (!userId) return;
      const proposalObj = new Proposal({
        coverLetter,
        budget,
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
