import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import filter from "../assets/filter.svg";
import arrowUp from "../assets/arrowUp.svg";

import Sort from "../components/Sort";
import Search from "./Search";
import "../stylesheets/data.scss";

function Data({ channelRef }) {
  const [users, setUsers] = useState([]);
  const [displayUsers, setDisplayedUsers] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    channelRef.current.listen("handlePageChange", (data, meta) => {
      setPage(data.page);
      handlePagination(data.users, data.page);
    });
    channelRef.current.listen("handleFilterChange", (filteredUsers, meta) => {
      setDisplayedUsers(filteredUsers);
    });
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
      handlePagination(response.data, 1);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handlePagination = (data, currPage) => {
    setTotalPages(Math.ceil(data.length / 5));
    setDisplayedUsers(data.slice((currPage - 1) * 5, currPage * 5));
  };

  const onNext = () => {
    channelRef.current.publish("handlePageChange", { page: page + 1, users });
    setPage(page + 1);
    handlePagination(users, page + 1);
  };

  const onPrev = () => {
    channelRef.current.publish("handlePageChange", { page: page - 1, users });
    setPage(page - 1);
    handlePagination(users, page - 1);
  };

  const applyFilters = () => {
    let filterUsers;
    filterData.forEach((filter) => {
      const filterInLowerCase = filter.toLowerCase();
      filterUsers = users.filter((user) => {
        return (
          user.name.toLowerCase().includes(filterInLowerCase) ||
          user.username.toLowerCase().includes(filterInLowerCase) ||
          user.email.toLowerCase().includes(filterInLowerCase) ||
          user.phone.toLowerCase().includes(filterInLowerCase) ||
          user.address.city.toLowerCase().includes(filterInLowerCase) ||
          user.website.toLowerCase().includes(filterInLowerCase) ||
          user.company.name.toLowerCase().includes(filterInLowerCase)
        );
      });
    });

    return filterUsers;
  };

  const handleFilterChange = () => {
    if (filterData.length > 0) {
      const filteredUsers = applyFilters();
      setDisplayedUsers(filteredUsers);
      channelRef.current.publish("handleFilterChange", filteredUsers);
    } else {
      fetchData();
    }
  };

  return (
    <div className="data-container">
      <p>Sample Data</p>
      <div className="data-header">
        <Search
          setFilterData={setFilterData}
          handleFilterChange={handleFilterChange}
          channelRef={channelRef}
        />
        <button className="sort-button" onClick={handleFilterChange}>
          <img src={filter} alt="" />
          Filter
        </button>
        <button className="sort-button">
          <img src={arrowUp} alt="" /> Export
        </button>
      </div>
      <Sort
        users={users}
        handlePagination={handlePagination}
        channelRef={channelRef}
      />
      <div className="details">
        <input type="checkbox" />
        <div>Name</div>
        <div>User name</div>
        <div>Email ID</div>
        <div>phone</div>
        <div>Address</div>
        <div>Website</div>
        <div>Company Name</div>{" "}
      </div>
      {displayUsers.map((user) => (
        <div className="details" key={user.id} style={{ marginTop: "0px" }}>
          <input type="checkbox" />
          <div>{user.name}</div>
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>{user.phone}</div>
          <div>{user.address.city}</div>
          <div>{user.website}</div>
          <div>{user.company.name}</div>
        </div>
      ))}
      <div className="btn-container">
        {page !== 1 && (
          <button className="page-btn" type="button" onClick={onPrev}>
            Prev
          </button>
        )}
        <div className="page-btn">{page}</div>{" "}
        {totalPages >= 1 && page !== totalPages && (
          <button className="page-btn" type="button" onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Data;
