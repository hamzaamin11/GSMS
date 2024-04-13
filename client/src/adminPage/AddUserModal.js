import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  navigationStart,
  navigationSuccess,
} from "../redux/Navigation/NavigationSlice";
import { set } from "react-hook-form";
import { Spinner } from "@nextui-org/react";

const AddUserModal = ({ visible, onClose }) => {
  const { currentUser, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  console.log("loaddddddddd", loading);
  const systemRole = currentUser?.systemRole;
  console.log(token, systemRole);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    civilId: "",
    department: "",
    program: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/user/addUser`, formData, {
        headers: {
          Authorization: token,
          systemRole: systemRole,
        },
      });

      console.log(res.data);
      setFormData({
        name: "",
        civilId: "",
        department: "",
        program: "",
      });
      setLoading(false);
      onClose();
    } catch (error) {
      if (error.response?.data.type === "ALERT") {
        toast.error(error.response.data.message);
        setError(error.response.data.message);
      } else if (error.response?.data.type === "FORM_ERRORS") {
        setError(error.response.data.errors);
      }
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("Add User"));
    }, 500);
  }, []);

  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm pt-20 ">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div className=" border-2  border-blue-500 px-8 py-7 ">
            <div className="text-blue-500 font-bold text-center text-2xl my-1">
              Add User
            </div>
            <div className="mb-3">
              <span className="text-blue-500 font-extrabold text-xs ml-1  ">
                Name
              </span>
              <div className="">
                <input
                  className="outline-none border text-blue-500 border-blue-500 py-1 w-[600px] text-start mx-1 rounded bg-blue-50"
                  type="text"
                  onChange={handleChange}
                  name="name"
                />
              </div>
              {error && <p className="text-red-500 text-xs">{error?.name}</p>}
            </div>
            <div className="mb-3">
              <span className="text-blue-500 font-extrabold text-xs ml-1 ">
                Email
              </span>
              <div className="">
                <input
                  className="outline-none border text-blue-500 border-blue-500 py-1 w-[600px] text-start mx-1 rounded bg-blue-50"
                  type="text"
                  onChange={handleChange}
                  name="civilId"
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs">{error?.civilId}</p>
              )}
            </div>

            <span className="text-blue-500 font-extrabold text-xs ml-1 ">
              Department
            </span>
            <div className="">
              <input
                className="outline-none border text-blue-500 border-blue-500 py-1 w-[600px] text-start mx-1 rounded bg-blue-50"
                type="text"
                onChange={handleChange}
                name="department"
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs">{error?.department}</p>
            )}
            <div className="my-3">
              <span className="text-blue-500 font-extrabold text-xs ml-1 ">
                Program
              </span>
              <div className="">
                <input
                  className="outline-none border text-blue-500 border-blue-500 py-1 w-[600px] text-start mx-1 rounded bg-blue-50"
                  type="text"
                  onChange={handleChange}
                  name="program"
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs">{error?.program}</p>
              )}
            </div>
            <div className=" pt-4 flex justify-center gap-16">
              <button
                disabled={loading}
                className="text-white  hover:opacity-75 text-xs bg-blue-500 p-3 px-8"
              >
                {loading ? (
                  <p>
                    Add User <Spinner size="sm" color="white" />
                  </p>
                ) : (
                  "Add User"
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-blue-500 hover:opacity-75 text-xs bg-blue-100 p-3 px-8"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer
        position="top-center"
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

export default AddUserModal;
