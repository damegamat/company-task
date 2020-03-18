import { FETCH_COMPANIES, FETCH_COMPANIES_DETAILS } from "./types";

export function fetchCompaniesAction(companies) {
  return {
    type: FETCH_COMPANIES,
    companies
  };
}

export function fetchCompaniesDetailsAction(companiesDetails) {
  return {
    type: FETCH_COMPANIES_DETAILS,
    companiesDetails
  };
}
