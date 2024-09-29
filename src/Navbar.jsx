import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [Open, setOpen] = useState(false);
  const [grouping, setGrouping] = useState("Status"); // Default value for grouping
  const [ordering, setOrdering] = useState("Priority"); // Default value for ordering

  const dropdownClicked = () => {
    setOpen(!Open);
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const savedGrouping = localStorage.getItem("grouping");
    const savedOrdering = localStorage.getItem("ordering");

    if (savedGrouping) {
      setGrouping(savedGrouping);
    }
    
    if (savedOrdering) {
      setOrdering(savedOrdering);
    }
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle selection changes
  const handleGroupingChange = (event) => {
    setGrouping(event.target.value);
    localStorage.setItem("grouping", event.target.value);
  };

  const handleOrderingChange = (event) => {
    setOrdering(event.target.value);
    localStorage.setItem("ordering", event.target.value);
  };

  return (
    <div className="Nav">
      <div className="dropdown" ref={dropdownRef}>
        <button className="dropdown-btn" onClick={dropdownClicked}>
          <img src="Display.svg" height={"15px"} alt="none"/>
          <span>Display</span>
          <img src="down.svg" height={"15px"} alt="none"/>
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
