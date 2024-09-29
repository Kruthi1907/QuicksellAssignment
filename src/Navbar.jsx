import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const Navbar = ({ onGroupChange, onOrderChange }) => {
  const [Open, isSetOpen] = useState(false);
  const [grouping, setGrouping] = useState(localStorage.getItem("grouping") || "Status");
  const [ordering, setOrdering] = useState(localStorage.getItem("ordering") || "Priority");

  const dropdownClicked = () => {
    isSetOpen(!Open);
  };

  const handleGroupingChange = (event) => {
    const newGrouping = event.target.value;
    setGrouping(newGrouping);
    localStorage.setItem("grouping", newGrouping);
    onGroupChange(newGrouping); // Call the passed function
  };

  const handleOrderingChange = (event) => {
    const newOrdering = event.target.value;
    setOrdering(newOrdering);
    localStorage.setItem("ordering", newOrdering);
    onOrderChange(newOrdering); // Call the passed function
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        isSetOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="Nav">
      <div className="dropdown" ref={dropdownRef}>
        <button className="dropdown-btn" onClick={dropdownClicked}>
          <img src="Display.svg" height={"15px"} alt="none" />
          <span>Display</span>
          <img src="down.svg" height={"15px"} alt="none" />
        </button>
        {Open && (
          <div className="dropdown-content">
            <div className="dropdown-item">
              <label htmlFor="grouping">Grouping</label>
              <select id="grouping" value={grouping} onChange={handleGroupingChange}>
                <option>Status</option>
                <option>User</option>
                <option>Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <label htmlFor="ordering">Ordering</label>
              <select id="ordering" value={ordering} onChange={handleOrderingChange}>
                <option>Priority</option>
                <option>Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
