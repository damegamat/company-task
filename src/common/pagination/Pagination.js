import React, { useState } from "react";

const Pagination = ({ dataPerPage, totalData, paginate }) => {
  const pageNumber = [];
  const pages = Math.ceil(totalData / dataPerPage);

  const count = () => {
    for (let i = 1; i < pages; i++) {
      pageNumber.push(i);
    }
  };
  count();

  const initNumbers = pageNumber.slice(0, 6);
  const [actualNumbers, setCurrentPage] = useState(null);

  const handleChangeNumber = number => {
    if (number < 3) {
      const actualNumbers = initNumbers;
      setCurrentPage(actualNumbers);
    } else {
      const actualNumbers = pageNumber.slice(number - 3, number + 3);

      setCurrentPage(actualNumbers);
    }
  };

  const activeNumbers = actualNumbers || initNumbers;

  return (
    <nav className="dataTables_paginate paging_simple_numbers">
      <ul className="pagination">
        <li className="page-item">
          <button
            onClick={() => {
              paginate(1);
              handleChangeNumber(1);
            }}
            className="page-link"
          >
            First
          </button>
        </li>
        {activeNumbers.map(number => (
          <li key={number} className="page-item">
            <button
              onClick={() => {
                paginate(number);
                handleChangeNumber(number);
              }}
              className="page-link"
            >
              {number}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            onClick={() => {
              paginate(pageNumber.length);
              handleChangeNumber(pageNumber.length);
            }}
            className="page-link"
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
