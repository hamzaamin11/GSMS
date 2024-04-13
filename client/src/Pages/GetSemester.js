import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCourse from "./AddCourse";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { BASE_URL } from "../constants";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { SemesterGet } from "../redux/AddSmster/AddSmsterSlice";
import { Spinner } from "@nextui-org/react";

// Initial State for form can be use to reset form eachtime rahter than repeating same code gain and again... :)
const formInitialState = {
  courseId: "",
  courseTitle: "",
  credits: 0,
  grade: "",
  points: 0,
  repeated: false,
  partOfGpa: false,
};

const GetSemester = () => {
  const [formData, setFormData] = useState([]); // by default eik form add karke deingey..
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log("formData", formData);
  const dispatch = useDispatch();
  const semester = useSelector((state) => state.transcript.Semester);
  console.log("semester", semester);
  const userId = semester.userId;
  const semesterId = semester._id;
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    console.log("All Data:", formData);
  }, [formData]);
  const handleChange = (e, id) => {
    const key = e.target.name;
    let value;
    const index = formData.findIndex((elem) => elem.id === id);
    console.log("Index of Form:", index);

    if (index >= 0) {
      if (key === "repeated" || key === "partOfGpa") {
        value = !formData[index][key];
      } else {
        value = e.target.value;
      }

      let newFormData = [...formData]; // create a shallow copy of formData
      newFormData[index][key] = value;
    }

    // if (e.target.name === "Repeated" || e.target.name === "Part_of_GPA") {
    //   setFormData({ ...formData, [e.target.name]: !formData[e.target.name] });
    // } else {
    //   setFormData({ ...formData, [e.target.name]: e.target.value });
    // }
  };

  const removeFormHandle = (id) => {
    console.log("id:", id);
    console.log("allData:", formData);
    setFormData((prevState) => prevState.filter((elem) => elem.id !== id));
  };
  // Dispatch kidahr hai???console log hi kr ra hun yar abi tk to lkn res.data k andr yh form ni mil ra??
  const handleUpload = async () => {
    const modeifiedFormData = formData.map((course) => {
      const { id, ...rest } = course;
      return rest;
    });
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/transcript/addCourses`,
        { data: modeifiedFormData, semesterId, userId }, // backend par APIjo controller hai usko "data" ki feld mein chchiye aap apni man pasand name ki key de kar nai bhejna...kidr likha ha zara dakhao
        {
          headers: {
            Authorization: token,
          },
        }
      ); // yh formData mje console mn show ni hota?
      dispatch(SemesterGet(res.data));
      toast.success("Your course is added!")
      setLoading(false);
      console.log("fetch data", res.data); //yeh wala ni o ra??
    } catch (error) {
      console.log(error.message);
      if (error.response?.data.type === "FORM_ERRORS") {
        toast.error("Please FulFill the requirements first");
        setError(error.response.data.errors[0]);
      } else if (error.response?.data.type === "ALERT") {
        console.log(error.response.data.message);
      }
      setLoading(false);
    }
  };
  console.log("formData", formData); // yh form show hota but
  return (
    <div>
      <div className="flex items-center justify-around pt-10 pb-3">
        <span className="text-blue-500 text-4xl">{semester.schoolName}</span>
        <span className="text-blue-500 text-4xl">
          {semester.semester} / {semester.year}
        </span>
      </div>

      <div className="border-2 border-blue-500 mb-3 mx-40">
        {formData.length ? (
          <div>
            <div>
              {/* Header Row */}
              <div className="pt-4">
                <span className="text-xs font-bold text-blue-500 ml-2 pr-44">
                  Course ID
                </span>
                <span className="text-xs font-bold text-blue-500 pr-44">
                  Course Title
                </span>
                <span className="text-xs font-bold text-blue-500 pr-8 ">
                  Credits
                </span>
                <span className="text-xs font-bold text-blue-500 pr-9">
                  Grade
                </span>
                <span className="text-xs font-bold text-blue-500 pr-6">
                  Points
                </span>
                <span className="text-xs font-bold text-blue-500 pr-5">
                  Repeated
                </span>
                <span className="text-xs font-bold text-blue-500">
                  Part of GPA
                </span>
              </div>
              {/* Form Row */}
              {formData.map((elem) => (
                <AddCourse
                  key={elem.id}
                  data={elem}
                  removeFormHandle={removeFormHandle}
                  handleChange={handleChange}
                  error={error}
                />
              ))}
            </div>
            <div className="flex justify-center p-5">
              <button
                type="button"
                className="bg-blue-600   w-10 p-2 rounded-3xl text-white"
                onClick={() =>
                  setFormData((prevState) => [
                    ...prevState,
                    { ...formInitialState, id: uuidv4() },
                  ])
                }
              >
                <p className="font-bold ">&#10010;</p>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center p-8 ">
            <button
              type="button"
              className="bg-blue-500 p-2 text-white rounded"
              onClick={() =>
                setFormData([{ ...formInitialState, id: uuidv4() }])
              }
            >
              Add Course
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-center space-x-10 pt-5">
        <Link
          to={"/transcript"}
          className="border border-blue-400 bg-blue-50 text-blue-300 p-3 text-sm px-10"
        >
          Back
        </Link>
        <button
          disabled={loading}
          type="button"
          onClick={handleUpload}
          className="border border-blue-400 bg-blue-50 text-blue-300 p-3  text-sm px-10 "
        >
          {loading ? (
            <div className="flex gap-2">
              Save <Spinner size="sm" color="blue" />
            </div>
          ) : (
            " Save"
          )}
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default GetSemester;
