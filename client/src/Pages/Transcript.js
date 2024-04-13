import { useEffect, useState } from "react";

import AddSmster from "./AddSmster";
import { useDispatch, useSelector } from "react-redux";
import {
  navigationStart,
  navigationSuccess,
} from "../redux/Navigation/NavigationSlice";
import axios from "axios";
import { BASE_URL } from "../constants";
import {
  SemesterGet,
  deleteSemester,
  deleteSemesterStart,
} from "../redux/AddSmster/AddSmsterSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { Spinner } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transcript = () => {
  const [modal, setModal] = useState(false);
  const semesters = useSelector((state) => state.transcript.Semesters);
  // const rolling = useSelector((state) => state.transcript.loading);
  const token = useSelector((state) => state.user.token);
  const loading = useSelector((state) => state.navigation.loading);
  // const rolling = useSelector((state) => state.transcript.loading);
  const [rolling, setRolling] = useState(false);
  // const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    setModal(true);
  };

  useEffect(() => {
    document.title = "GSMS | Transcript";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("Transcript"));
    }, [500]);
  }, []);

  const handleClose = () => {
    setModal(false);
  };
  const handleRemove = async (id) => {
    console.log("_id to remove:", id);
    setRolling(true);
    try {
      const res = await axios.delete(`${BASE_URL}/transcript/semester/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(deleteSemester(id));
      setRolling(false);
    } catch (error) {
      console.log(error.message);
      if (error.response?.data.type === "FORM_ERRORS") {
        console.log(error.response.data.errors);
      } else if (error.response?.data.type === "ALERT") {
        toast.error(error.response.data.message);
      }
    }
  };
  const handleEdit = async (id, userId) => {
    console.log("userID", userId);
    console.log("id", id);
    try {
      const res = await axios.get(
        `${BASE_URL}/transcript/${userId}/semester/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(SemesterGet(res.data));
      navigate(`/semester/${id}`);
    } catch (error) {
      console.log(error.message);
      if (error.response?.data.type === "FORM ERRORS") {
        console.log(error.response.data.errors);
      } else if (error.response?.data.type === "ALERT") {
        toast.error(error.response.data.message);
      }
    }
  };
  if (loading) return <Loader />;
  return (
    <div>
      <div>
        <div className="text-blue-500 text-center text-3xl pt-5 ">
          Transcript
        </div>
        {semesters?.map((semester) => (
          <div
            className="mx-72 my-4 border border-blue-500 p-6"
            key={semester._id}
          >
            <div className="flex items-center justify-around gap-10 ">
              <div>
                <span className="text-blue-500 text-sm">
                  {semester.schoolName}
                </span>
                <span>
                  <hr className="h-[3px] w-[35vh] bg-blue-200 hidden sm:block" />
                </span>
              </div>
              <div className="">
                <span className="text-blue-500 text-sm">
                  {semester.semester}/{semester.year}
                </span>
                <span>
                  <hr className="h-[3px] w-[20vh] bg-blue-200 hidden sm:block" />
                </span>
              </div>
              <div className="flex items-center text-center justify-items-center gap-5 ">
                <button
                  onClick={() => handleEdit(semester._id, semester.userId)}
                >
                  <img className="h-16" src={"edit.png"} alt="edit" />
                </button>
                <button
                  disabled={rolling}
                  className="bg-red-600  w-10 p-2 rounded-3xl text-white"
                  onClick={() => handleRemove(semester._id)}
                >
                  {rolling ? (
                    <Spinner size="sm" color="white" />
                  ) : (
                    <p className="font-bold">X</p>
                  )}
                </button>
              </div>
              <div></div>
            </div>
          </div>
        ))}
        <div className="text-center pt-3">
          <button
            className=" bg-blue-500 text-white p-2 rounded-sm"
            onClick={handleClick}
          >
            Add Semester
          </button>
        </div>
      </div>
      <AddSmster visible={modal} onClose={handleClose} />
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

export default Transcript;
