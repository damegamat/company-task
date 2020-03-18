import React, { useState } from "react";
import Pagination from "../pagination/Pagination";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import "./Table.css";
import { NavLink } from "react-router-dom";

const Table = ({ data, entry = 5, entriesOptions }) => {
  const [search, setSearch] = useState("");
  const [currentData, setCurrentData] = useState("");

  const getFilteredData = (data, text) => {
    const dataSearch = text.toLowerCase();

    return data.filter(dataList => {
      const dataListLower = dataList.name.toLowerCase();
      const currentList = dataListLower.indexOf(dataSearch) !== -1;
      return currentList;
    });
  };

  const handleSearchChange = e => {
    setSearch(e.target.value);
    setCurrentData(data && getFilteredData(data, e.target.value));
  };
  // data head
  const head = ["id", "name", "city", "total incomes"];
  const headOutput = head.map((data, i) => {
    return (
      <th key={i} className="th-sm">
        {data.toLocaleUpperCase()}
      </th>
    );
  });

  // getCurrentPage
  let selectPagination;
  if (entriesOptions) {
    selectPagination = entriesOptions.map(number => {
      return (
        <option key={number} value={`${number}`}>
          {number}
        </option>
      );
    });
  } else {
    selectPagination = <option value={`${entry}`}>{entry}</option>;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(entry);

  const handleChangePagination = e => {
    setDataPerPage(e.target.value);
  };

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDataPages = (currentData || data).slice(
    indexOfFirstData,
    indexOfLastData
  );

  // data body
  const dataOutput = currentDataPages.map(data => {
    const array = Object.values(data);
    const tableElement = array.map((elem, i) => {
      return (
        <td data-label={head[i]} key={i}>
          {<NavLink to={`/company/` + data.id}>{elem}</NavLink>}
        </td>
      );
    });
    return <tr key={data.id}>{tableElement}</tr>;
  });
  //Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="dataTables_wrapper dt-bootstrap4">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="dataTables_length bs-select">
            <label>
              {"Show "}
              <select
                className="custom-select custom-select-sm form-control form-control-sm"
                onChange={e => handleChangePagination(e)}
                value={dataPerPage}
              >
                {selectPagination}
              </select>
              {" entries"}
            </label>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="dtBasicExample_filter">
            <label>
              <input
                className="form-control"
                type="text"
                placeholder={"Search..."}
                onChange={e => handleSearchChange(e)}
                value={search}
              ></input>
            </label>
          </div>
        </div>
      </div>

      <table
        className="table table-striped table-bordered"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>{headOutput}</tr>
        </thead>
        <tbody>{dataOutput}</tbody>
      </table>
      <Pagination
        className="row"
        dataPerPage={dataPerPage}
        totalData={(currentData || data).length}
        paginate={paginate}
      />
    </div>
  );
};

export default Table;
