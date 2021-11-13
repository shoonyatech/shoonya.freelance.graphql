import userResolver from "./user.js";
import projectResolver from "./project.js";
import countryResolver from "./country.js";
import proposalResolver from "./proposal.js";

const resolvers = [
  userResolver,
  projectResolver,
  countryResolver,
  proposalResolver,
];

export default resolvers;
