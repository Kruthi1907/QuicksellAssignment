import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [Open, isSetOpen] = useState(false);

  const dropdownClicked = () => {
    isSetOpen(!Open);
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
      <div class="dropdown" ref={dropdownRef}>
        <button class="dropdown-btn" onClick={dropdownClicked}>
          <img src="Display.svg" height={"15px"} alt="none"/>
          <span>Display</span>
          <img src="down.svg" height={"15px"} alt="none"/>
        </button>
        {Open && (
          <div class="dropdown-content">
            <div class="dropdown-item">
              <label for="grouping">Grouping</label>
              <select id="grouping">
                <option>Status</option>
                <option>User</option>
                <option>Priority</option>
              </select>
            </div>
            <div class="dropdown-item">
              <label for="ordering">Ordering</label>
              <select id="ordering">
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
