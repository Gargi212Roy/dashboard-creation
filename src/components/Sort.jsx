import React, { useState, useEffect } from "react";
import "../stylesheets/sort.scss";

function Sort({ users, handlePagination, channelRef }) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const sortData = [
    { sortName: "Name", sortType: "name" },
    { sortName: "User name", sortType: "username" },
    { sortName: "Email ID", sortType: "email" },
  ];

  useEffect(() => {
    channelRef.current.listen(
      "handleSort",
      ({ sortedUsers, currSortColumn, currSortDirection }) => {
        setSortColumn(currSortColumn);
        setSortDirection(currSortDirection);
        handlePagination(sortedUsers, 1);
      }
    );
  }, []);

  const handleSort = (columnName) => {
    const currSortColumn = columnName;
    const currSortDirection =
      sortColumn !== columnName
        ? "asc"
        : sortDirection === "asc"
        ? "desc"
        : "asc";
    setSortColumn(currSortColumn);
    setSortDirection(currSortDirection);
    const sortedUsers = users.sort((a, b) => {
      const columnA = a[currSortColumn] || "";
      const columnB = b[currSortColumn] || "";

      if (currSortDirection === "asc") {
        return columnA.localeCompare(columnB);
      } else {
        return columnB.localeCompare(columnA);
      }
    });
    channelRef.current.publish("handleSort", {
      sortedUsers,
      currSortColumn,
      currSortDirection,
    });
    handlePagination(sortedUsers, 1);
  };

  return (
    <div className="sort-container">
      <p>Sort By:</p>
      {sortData.map(({ sortName, sortType }, index) => (
        <button
          key={index}
          className="sort-item"
          onClick={() => handleSort(sortType)}
        >
          {sortName}
        </button>
      ))}
    </div>
  );
}

export default Sort;
