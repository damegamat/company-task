import { FETCH_COMPANIES, FETCH_COMPANIES_DETAILS } from "../actions/types";

const initState = {
  companies: [],
  companiesDetails: []
};

const companiesReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_COMPANIES:
      return {
        ...state,
        companies: action.companies
      };
    case FETCH_COMPANIES_DETAILS:
      return {
        ...state,
        companiesDetails: action.companiesDetails
      };

    default:
      return state;
  }
};

export default companiesReducer;
