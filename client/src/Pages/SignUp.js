import { useEffect, useState } from "react";
import {  Link, Navigate, useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    dob: "",
    civilId: "",
    phone: "",
    gpa: "",
    schoolName: "",
    schoolLocation: "",
    program: "",
    password: "",
    confirmPassword: "",
  });
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Sign Up | GSMS";
  }, []);
  function handleChanging(e) {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
    
      const res = await fetch("http://localhost:8088/user/createAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      setLoading(false);
      const data = await res.json();
      console.log("Got the response:", data);
      if (data.type === "FORM_ERRORS") {
        setError(data.errors);
      } else if (data.type === "ALERT") {
        if (res.status === 201) {
          toast.success("Sucessfuly created");
          navigate("/signin");
        } else if (res.status === 409) {
          setError({ civilId: data.message });
        } else {
          console.log("Error -> ALERT", data.message);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  if (currentUser) return <Navigate to="/Home" />;

  return (
    <div>
      <div className="flex items-center justify-around mx-56">
        <div className="text-3xl text-center text-blue-500 pt-5 font-extrabold ">
          General School <br />
          Management System
        </div>
        <hr className="w-1 mx-6 h-[65vh] bg-blue-500 hidden sm:block" />
        <div className="pt-28 ">
          <p className="text-blue-500 ">Create a new account</p>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="mr-5 pt-2">
                <p className="text-blue-500 text-xs">Full Name</p>
                <input
                  className="border-blue-500 text-blue-600  border p-1 rounded-md bg-blue-50 text-sm"
                  type="text"
                  name="name"
                  onChange={handleChanging}
                  value={dataForm.name}
                />
                {error?.name && (
                  <div className="text-red-500 text-xs">{error.name}</div>
                )}
              </div>
              <div className="pt-2">
                <p className="text-blue-500 text-xs">Date Of Birth</p>
                <input
                  className="border-blue-500 border text-blue-600 p-1 w-[173px] rounded-md bg-blue-50 text-sm"
                  type="date"
                  name="dob"
                  onChange={handleChanging}
                  value={dataForm.dob}
                />
                {error?.dob && (
                  <div className="text-red-500 text-sm">{error.dob}</div>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="mr-5 pt-2">
                <p className="text-blue-500 text-xs"> Phone Number</p>
                <input
                  className="border-blue-500 text-blue-600 border p-1 rounded-md bg-blue-50 text-sm"
                  type="text"
                  name="phone"
                  onChange={handleChanging}
                  value={dataForm.phone}
                />
                {error?.phone && (
                  <div className="text-red-500 text-xs">{error.phone}</div>
                )}
              </div>
              <div className="pt-2">
                <p className="text-blue-500 text-sm"> civil Id</p>
                <input
                  className="border-blue-500 text-blue-600 border p-1 rounded-md bg-blue-50 text-sm"
                  type="text"
                  name="civilId"
                  onChange={handleChanging}
                  value={dataForm.civilId}
                />
                {error?.civilId && (
                  <div className="text-red-500 text-xs">{error.civilId}</div>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="mr-5 pt-2">
                <p className="text-blue-500 text-xs">School Name</p>
                <input
                  className="border-blue-500 text-blue-600 border  p-1 rounded-md bg-blue-50 text-sm"
                  type="text"
                  name="schoolName"
                  onChange={handleChanging}
                  value={dataForm.schoolName}
                />
                {error?.schoolName && (
                  <div className="text-red-500 text-sm">{error.schoolName}</div>
                )}
              </div>
              <div className="pt-2">
                <p className="text-blue-500 text-xs"> GPA</p>
                <input
                  className="border-blue-500 text-blue-600 border p-1 rounded-md bg-blue-50 text-sm"
                  type="text"
                  name="gpa"
                  onChange={handleChanging}
                  value={dataForm.gpa}
                />
                {error?.gpa && (
                  <div className="text-red-500 text-sm">{error.gpa}</div>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="mr-5 pt-2">
                <p className="text-blue-500 text-xs">
                  Program you want to apply
                </p>
                <input
                  className="border-blue-500 text-blue-600 border  p-1 rounded-md bg-blue-50 text-sm"
                  type="text"
                  name="program"
                  onChange={handleChanging}
                  value={dataForm.program}
                />
                {error?.program && (
                  <div className="text-red-500 text-xs">{error.program}</div>
                )}
              </div>
              <div className="pt-2">
                <p className="text-blue-500 text-xs">School Location</p>
                <input
                  className="border-blue-500 text-blue-600 border p-1 rounded-md bg-blue-50 text-sm"
                  type="text"
                  name="schoolLocation"
                  onChange={handleChanging}
                  value={dataForm.schoolLocation}
                />
                {error?.schoolLocation && (
                  <div className="text-red-500 text-xs">
                    {error.schoolLocation}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="mr-5 pt-2">
                <p className="text-blue-500 text-xs"> Password</p>
                <input
                  className="border-blue-500 text-blue-600 border  p-1 rounded-md bg-blue-50 text-sm"
                  type="text"
                  name="password"
                  onChange={handleChanging}
                  value={dataForm.password}
                />
                {error?.password && (
                  <div className="text-red-500 text-xs">{error.password}</div>
                )}
              </div>
              <div className="pt-2">
                <p className="text-blue-500 text-xs">Confirm Password</p>
                <input
                  className="border-blue-500 text-blue-600 border text-sm  p-1 rounded-md bg-blue-50"
                  type="text"
                  name="confirmPassword"
                  onChange={handleChanging}
                  value={dataForm.confirmPassword}
                />
                {error?.confirmPassword && (
                  <div className="text-red-500 text-xs">
                    {error.confirmPassword}
                  </div>
                )}
              </div>
            </div>
            <div className="pt-5  ml-10 pb-10 ">
              <button
                disabled={loading}
                className="bg-blue-500 p-3 text-white text-xs hover:opacity-95 rounded-sm"
              >
                {loading ? (
                  <div className="flex gap-4 text-xs ">
                    Loading
                    <Spinner size="sm" color="white" />
                  </div>
                ) : (
                  "create an account"
                )}
              </button>
              <Link to="/signin" className="text-blue-500 pl-5 text-xs ">
                or back to sign In
              </Link>
            </div>
          </form>
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

export default SignUp;
