import React from "react";
import { Switch } from "@nextui-org/react";

const grades = [
  "Select",
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
  "F",
  "FA",
  "W",
  "CW",
  "i",
  "P",
  "NP",
  "S",
  "SN",
];

const AddCourse = ({ data, handleChange, removeFormHandle, error }) => {
  const {
    id,
    repeated,
    partOfGPA,
  } = data;

  return (
    // yh form ka component mn ny btaya ha? Jee yeh map kardena... pehley muhey lagta simple aap use kar rahe ho dakhao?yh modal ha?
    <div>
      <div className="pt-4">
        <span className="">
          <input
            className="border p-1 mt-1 ml-2 w-14 rounded border-blue-500   outline-none"
            type="text"
            name="courseId"
            placeholder="ID"
            onChange={(e) => handleChange(e, id)}
          />
        </span>

        <span>
          <input
            className="border py-2 px-[5px] w-96 text-sm rounded ml-3 border-blue-500 outline-none"
            placeholder="Required Field"
            type="text"
            name="courseTitle"
            onChange={(e) => handleChange(e, id)}
          />
        </span>
        <span>
          <input
            className="border p-1 mt-1 ml-3 w-14 rounded border-blue-500 outline-none"
            type="text"
            placeholder="0.0"
            name="credits"
            onChange={(e) => handleChange(e, id)}
          />
        </span>
        <span>
          <select
            className="border p-1 mt-1 ml-2 w-18 rounded text-blue-500 bg-transparent border-blue-500 outline-none"
            name="grade"
            onChange={(e) => handleChange(e, id)}
          >
            {grades.map((elem, index) => (
              <option key={index}>{elem}</option>
            ))}
          </select>
        </span>
        <span>
          <input
            className="border p-1 mt-1 ml-2 w-14 rounded border-blue-500 outline-none"
            type="text"
            name="points"
            placeholder="0.0"
            onChange={(e) => handleChange(e, id)}
          />
        </span>
        <span>
          <Switch
            name="repeated"
            className="ml-4"
            aria-label="Automatic updates"
            onChange={(e) => handleChange(e, id)}
            value={repeated}
          />
        </span>
        <span>
          <Switch
            name="partOfGpa"
            className="ml-4"
            aria-label="Automatic updates"
            onChange={(e) => handleChange(e, id)}
            value={partOfGPA}
          />
        </span>

        <button
          type="button"
          className="bg-red-600 ml-10 px-2 rounded-full font-bold text-white text-2xl"
          onClick={() => removeFormHandle(id)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default AddCourse;
