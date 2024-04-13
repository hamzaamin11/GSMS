import React, { useEffect, useState } from "react";

const Form = ({ getFormData, onClose }) => {
  const [formData, setFormData] = useState({
    submitted: true,
    systemRole: "USER",
    name: "",
    civilId: "",
    program: "",
  });

  const handleChange = (e) => {
    const key = e.target.name;
    const val = e.target.value;
    setFormData({ ...formData, [key]: val });
  };
  const handleReset = () => {
    getFormData({ systemRole: "USER", submitted: true });
    onClose()
  };
  const handleSubmit = () => {
    const filteredFormData = { ...formData };
    Object.keys(filteredFormData).forEach((key) => {
      if (formData[key] === "") delete filteredFormData[key];
      onClose();
    });

    getFormData(filteredFormData);
  };
  return (
    <div>
      <div>
        <div className="text-blue-500 pb-1 ml-6 ">Name</div>
        <span className="ml-5">
          <input
            className="w-[1150px] p-2 border border-blue-500 rounded-lg outline-none text-blue-500"
            type="text"
            name="name"
            onChange={handleChange}
          />
        </span>
      </div>
      <div className="flex items-center pt-5">
        <div>
          <div className="text-blue-500  pb-1 ml-6">Civil ID</div>
          <span>
            <input
              className=" w-[500px] p-2 border border-blue-500 outline-none rounded-lg ml-5 text-blue-500"
              type="text"
              name="civilId"
              onChange={handleChange}
            />
          </span>
        </div>
        <div className="ml-7">
          <div className="text-blue-500 pb-1 ml-6">Program</div>
          <input
            className="w-[610px] p-2 border border-blue-500 outline-none rounded-lg ml-5 text-blue-500 "
            type="text"
            name="program"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className=" flex items-center justify-end p-8">
        <button
          onClick={handleSubmit}
          className="text-white bg-blue-500 p-2  px-6 border rounded mx-4"
        >
          Search
        </button>

        <button
          onClick={handleReset}
          className="bg-blue-100 text-blue-500 p-2 px-6 border rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Form;
