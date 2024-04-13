import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  AddSemesterStart,
  AddSemesterSuccess,
} from "../redux/AddSmster/AddSmsterSlice";
import ShowSmster from "./ShowSmster";
import { Spinner } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddSmster = ({ visible, onClose }) => {
  const [error, setError] = useState({});

  const [formdata, setFormData] = useState({
    schoolName: "",
    semester: "",
    year: 0,
  });

  const currentUser = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  if (!visible) return null;
  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
      userId: currentUser?._id,
    });
  };

  const calcYearVal = () => {
    const possibleYearValue = [];
    const currentYear = new Date().getFullYear();
    for (let i = 1970; i <= currentYear; i++) {
      possibleYearValue.unshift(i);
    }
    return possibleYearValue;
  };
  //seterror ko update kro
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      dispatch(AddSemesterStart());
      const res = await axios.post(
        `${BASE_URL}/transcript/addSemester`, // not a valid route according to our api for example..
        formdata,
        {
          headers: {
            Authorization: token,
          },
        }
      ); // galar phir wohi galti kar raheh ho... maine kaha tha jab request 400-599 hoti hai to control autmaically catch mein jaata... jab axios use kr rahe ho to...
      console.log(res.data);
      dispatch(AddSemesterSuccess(res.data));
      onClose();
      setLoading(false);
    } catch (error) {
      toast.error("Please fullfil the reqiurements first ");
      console.log(error);
      console.log("Error -> error.response:", error.response);
      // response ke aagey "?" is liye lagaya kyuke hamseha req ka error nai hota kabhi hamara server badn ho ya internet disconnet ho to hamein response nai milta...
      // aur data.type normally jaise upar karna tha response.data,ty waisey hi aaya... lagi samajh???
      // yar error.response? yh error server sy aya ga agr hoa to?
      // han agar server sey error aaye ga to
      // aur data.type sy vo field ka agar mily ga? Jee milega...
      // but waha to year nd semester wali field nai ha?
      // ok ok lag ge ab baki sb b asy hi nikalny ha error && <p>{error.schoolName}</p>?asy ? Jee.
      // Main eik ki example ikh eta hu baaki waisy hi akr lein...
      if (!error.response) {
        setError(error.message);
        console.log("Error:", error);
      } else if (error.response.data.type === "FORM_ERRORS") {
        console.log("error.response:", error.response);
        setError(error.response.data.errors); /// hum in ko separate ni likh... kis trhaar ik validation ko seprate variable mein???
        // error.andr response kaha likha? object open kr k dakhna?
        // Answr mila ke nai????haha g achy sy mil gya..:)
        // yar ap ko kasy pata chala k error k agya response ha?
        //yh hum hemsha use kren gy?
        // Jee hamesha.... jab response error hamara server bhejey ga koi clinet side ka internet ka issue nai hoga to phir hamseha error.response eik object hoga warna yeh undefined hoga.. main is trha ke errors apney project mein handle kar rha ahu mujhey is liye pata hai...:)
        // kia bat ha man gya bhai..:)
        // kuj smajh laggi ke agli wi gayi Hamza bHAI???HAHAHA internet bnd ho ga to yh undefined dy ga....?
        // Jee iska matlab ke jab response client side ka hi hoga to response undefined hoga... eik example aur dikhata hu... wait..
        // hamein undefined nai mila kyuke yeh response hamrey server ki taraf sey tha..
        // pata chala ham error.response kyu likhtey hain???? bas aise hi samajh lo jaise aap fetch api use kartey ho to usmein res.error mein error milta hai ismein eik aur object hota hai root level pe.. jo ke error hota hai.. uske andar object response hota hai agar wo error aapke server ki taraf sey ho warna wo clinet ke browser ka error hai.. wo kuch bhi ho sakta hai netwrok ke related ya kuch aur... :)okay okay samjh gya bhai...
      } else if (error.response.data.type === "ALERT") {
        setError(error.response.data);
        console.log(error.response.data.message, "****");
      } else {
        setError(error.response.data);
        console.log(error.response.data.message, "****");
      }
      setLoading(false);
    }
    try {
      const res2 = await axios.get(`${BASE_URL}/transcript/getSemesters`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res2.data);
    } catch (error) {
      console.log(error);
      if (error.response?.error.type === "FORM_ERRORS") {
        console.log(error.response.data.errors);
      } else if (error.response.data.type === "ALERT") {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm flex justify-center items-center  "
      >
        <div className=" flex  border-2 border-blue-400 p-12">
          <div className=" mx-2 pt-4">
            <div className="flex items-center justify-evenly ">
              <span className="text-blue-500 text-sm font-semibold p-2 ml-24 ">
                School Name
              </span>
              <span className="text-blue-500 text-sm font-semibold ml-28">
                Semester
              </span>
              <span className="text-blue-500 text-sm font-semibold ml-10  ">
                Year
              </span>
            </div>

            <div className="flex items-center gap-5 ">
              <span className="border border-blue-400 ">
                <input
                  className=" p-2  w-80 text-blue-500 outline-none"
                  type="text"
                  name="schoolName"
                  placeholder="Required Field"
                  onChange={handleChange}
                />
              </span>

              <span className="border border-blue-400 ">
                <select
                  className="text-blue-500 p-2"
                  name="semester"
                  onChange={handleChange}
                >
                  <option className="text-blue-500">Select</option>
                  <option className="text-blue-500">Fall</option>
                  <option className="text-blue-500">Spring</option>
                  <option className="text-blue-500">Summer1</option>
                  <option className="text-blue-500">Summer2</option>
                  <option className="text-blue-500">Summer3</option>
                </select>
              </span>
              <span className="border border-blue-400  ">
                <select
                  className="text-blue-500 p-2 px-4 text-center"
                  name="year"
                  onChange={handleChange}
                >
                  <option className="text-blue-500">Select</option>
                  {calcYearVal().map((val, index) => (
                    <option className="text-blue-500" key={index}>
                      {val}
                    </option>
                  ))}
                </select>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-red-500 text-xs ">{error?.message}</div>
              <div className="text-red-500 text-xs ">{error?.schoolName}</div>
              <div className="text-red-500 text-xs">{error?.year}</div>
              <div className="text-red-500 text-xs ">{error?.semester}</div>
            </div>

            <div className="p-10 text-center space-x-6">
              <button
                disabled={loading}
                className="border border-blue-500 p-2 text-white hover:opacity-95 bg-blue-400 text-xs"
              >
                {loading ? (
                  <div className="flex items-center">
                    loading <Spinner size="sm" color="white" />
                  </div>
                ) : (
                  "Add Semester"
                )}
              </button>
              <button
                className="border border-blue-500 p-2 text-blue-500 px-5  hover:opacity-80 bg-blue-100 text-xs"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
            <ShowSmster showSmsterModal={visible} />
          </div>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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

export default AddSmster;
