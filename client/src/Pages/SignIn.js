import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import setAuthToken from "../utilities/setAuthToken";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  addToken,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/UserSlice";
import { BASE_URL } from "../constants";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pass, setPass] = useState({
    civilId: "",
    password: "",
  });
  const { error, loading, currentUser } = useSelector((state) => state.user);

  function handleChange(e) {
    const updatevalue = e.target.value;
    const name = e.target.name;
    setPass({ ...pass, [name]: updatevalue });
  }
  useEffect(() => {
    document.title = "Sign In | GSMS";
  }, []);
  async function handleClick() {
    dispatch(signInStart());
    console.log(pass, "this is pass");
    try {
      // Authenticate User with given credentails
      const res1 = await axios.post(BASE_URL + "/auth/signin", pass);
      toast.success("You are part of GSMS now!");
      console.log("Response 1:", res1.data);
      setAuthToken(res1.data.token);
      dispatch(addToken(res1.data.token));
      // Load User
      const res2 = await axios.get(BASE_URL + "/user/loadUser");
      // const res2 = await axios.get(BASE_URL + "/user/loadUser", {
      //   headers: {
      //     Authorization: res1.data.token,
      //   },
      // });

      console.log("Loaded User:", res2.data);
      dispatch(signInSuccess(res2.data));

      {
        (currentUser?.systemRole === "USER" && navigate("/Home")) ||
          (currentUser?.systemRole === "ADMIN" && navigate("/home/admin"));
      }

      // navigate("/Home");
      setPass({ civilId: "", password: "" });
    } catch (error) {
      // axios
      //   .post("http://localhost:8088/auth/signin", pass)
      //   .then((res) => {
      //     console.log("whatares", res);
      //     dispatch(signInSuccess(res));
      //     saveinLs("Tokenjwt", res.data.token);

      //     navigate("/Home");
      //     setPass({
      //       civilId: "",
      //       password: "",
      //     });
      //   })
      // alert("this password is invaild");
      toast.error("Something Wrong!");
      console.log("Got an error..", error);
      dispatch(signInFailure(error.code));
    }
  }

  if (currentUser?.systemRole === "USER") return <Navigate to="/Home" />;
  if (currentUser?.systemRole === "ADMIN") return <Navigate to="/home/admin" />;
  return (
    <div className="min-h-screen flex flex-col sm:flex-row justify-center items-center gap-x-4">
      <div>
        <p className="text-3xl text-center text-blue-500 font-extrabold">
          General School <br /> Management System
        </p>
      </div>
      <hr className="w-1 mx-6 h-[50vh] bg-blue-500 hidden sm:block" />
      <div className="">
        <div className="w-80 bg-white rounded-md pt-5">
          <div className="pt-1 flex flex-col items-center">
            <div className="">
              <div className="text-blue-500 text-sm font-bold">civil Id</div>
              <input
                className="w-52 border-gray-400 mt-2  border p-1 rounded-lg bg-blue-50 text-blue-600"
                type="text"
                onChange={handleChange}
                name="civilId"
                value={pass.civilId}
              />
            </div>
            <div className="">
              <div className="text-blue-500 text-sm font-bold">Password</div>
              <input
                className="w-52 border-gray-400 mt-2  border p-1 rounded-lg bg-blue-50 text-blue-600"
                type="password"
                onChange={handleChange}
                name="password"
                value={pass.password}
              />
            </div>
            <div className="flex items-center">
              <div className="pt-5 pl-2">
                <button
                  disabled={loading}
                  className="broder-2 bg-blue-500 rounded-md p-3 px-4 hover:opacity-95 text-xs cursor-pointer text-white"
                  onClick={handleClick}
                >
                  {loading ? (
                    <div className="flex text-xs gap-2 ">
                      SignIn
                      <Spinner size="sm" color="white" />
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
              <div className="pt-5 pl-3">
                <Link
                  to="/signup"
                  className=" text-blue-500 hover:text-blue-600 cursor-pointer text-xs"
                >
                  or Create new account
                </Link>
              </div>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center pt-5">{error}</p>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5}
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

export default SignIn;
