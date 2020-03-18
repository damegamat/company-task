import React from "react";
import { connect, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./CompaniesDetails.css";

const CompaniesDetails = ({ match }) => {
  const id = match.params.id * 1;
  const companies = useSelector(state => state.companies.companies);
  const companiesDetails = useSelector(
    state => state.companies.companiesDetails
  );

  const company = companies.filter(item => item.id === id);
  const companyDetails = companiesDetails.filter(item => item.id === id);

  let averageIncome;
  let lastIncome;

  companyDetails.map(item => {
    const incomes = [];
    const lastIncomesValue = [];

    // get last income
    const lastDate = new Date(
      Math.max.apply(
        null,
        item.incomes.map(item => {
          return new Date(item.date);
        })
      )
    );
    const lastDateMonth = lastDate.getMonth();
    const lastDateYear = lastDate.getFullYear();

    const lastObjects = item.incomes.filter(
      el =>
        new Date(el.date).getFullYear() === lastDateYear &&
        new Date(el.date).getMonth() === lastDateMonth
    );

    lastObjects.map(el => {
      return lastIncomesValue.push(1 * el.value);
    });

    const value = lastIncomesValue.reduce((a, b) => a + b).toFixed(2);

    lastIncome = value;

    // get average income

    item.incomes.map(el => {
      return incomes.push(1 * el.value);
    });

    const average = (incomes.reduce((a, b) => a + b) / incomes.length).toFixed(
      2
    );
    return (averageIncome = average);
  });

  const result = company.map(item => {
    return (
      <div key={item.id} className="companiesDetails">
        <h1 className="companiesDetails__header">details</h1>
        <div className="companiesDetails__id">
          <span>id:</span>
          <p>{item.id}</p>
        </div>
        <div className="companiesDetails__name">
          <span>name:</span>
          <p>{item.name}</p>
        </div>
        <div className="companiesDetails__city">
          <span>city:</span>
          <p>{item.city}</p>
        </div>
        <div className="companiesDetails__average-income">
          <span>average income:</span>
          <p>{averageIncome}</p>
        </div>
        <div className="companiesDetails__last-month-income">
          <span>last income:</span>
          <p>{lastIncome}</p>
        </div>
        <NavLink to="/">
          <button className="companiesDetails__btn">home</button>
        </NavLink>
      </div>
    );
  });

  return <>{result}</>;
};

export default connect(null)(CompaniesDetails);
