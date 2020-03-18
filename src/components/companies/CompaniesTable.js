import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";

import { fetchCompanies } from "../../fetch/fetchData";
import Table from "../../common/table/Table";

const CompaniesTable = props => {
  useEffect(() => {
    props.fetchCompanies();
  }, []);
  const companies = useSelector(state => state.companies.companies);

  const companiesDetails = useSelector(
    state => state.companies.companiesDetails
  );

  const alltotalIncomes = [];
  companiesDetails.map(item => {
    const values = [];

    item.incomes.map(el => {
      return values.push(el.value);
    });

    const totalValue = values.reduce((a, b) => 1 * a + 1 * b).toFixed(2);
    const objectIncome = { id: item.id, value: totalValue };
    return alltotalIncomes.push(objectIncome);
  });

  const allCompanies = Array.from(companies);
  allCompanies.map(item => {
    return alltotalIncomes.map(income => {
      if (income.id === item.id) {
        return (item.totalIncome = income.value);
      } else return null;
    });
  });

  const compare = (a, b) => {
    const incomeA = a.totalIncome;
    const incomeB = b.totalIncome;

    let comparison = 0;
    if (incomeA < incomeB) {
      comparison = 1;
    } else if (incomeA > incomeB) {
      comparison = -1;
    }
    return comparison;
  };

  const allCompaniesSorted = allCompanies.sort(compare);

  return (
    <>
      <Table
        data={allCompaniesSorted}
        head={""}
        entry={5}
        entriesOptions={[5, 10]}
      />
    </>
  );
};
export default connect(null, { fetchCompanies })(CompaniesTable);
