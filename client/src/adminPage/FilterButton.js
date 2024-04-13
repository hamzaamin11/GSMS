import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Form from "./Form";

const FilterButton = ({ getFormData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className=" border-2 border-blue-500 mx-10 bg-blue-50   rounded-lg">
      <div
        className="flex items-center justify-between  p-4"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-blue-500 text-lg font-semibold">
          <button>Filters</button>
        </span>
        {!isOpen ? (
          <FontAwesomeIcon
            className="text-blue-500"
            icon="fa-solid fa-caret-down"
          />
        ) : (
          <FontAwesomeIcon
            className="text-blue-500"
            icon="fa-solid fa-caret-up"
          />
        )}
      </div>
      {isOpen && <Form getFormData={getFormData} onClose={handleClose} />}
    </div>
  );
};

export default FilterButton;
