import countries from "../data/countries.js";

const countryResolver = {
  Query: {
    countries() {
      return countries;
    },
  },
};

export default countryResolver;
