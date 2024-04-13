import { Button, Checkbox } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubmitApplication = () => {
  const [upload, setUpload] = useState(false);
  const [upload2, setUpload2] = useState(false);
  const [upload3, setUpload3] = useState(false);
  const token = useSelector((state) => state.user.token);
  console.log("token", token);
  const navigate = useNavigate();
  const handleCheck = () => {
    setUpload(true);
  };

  const handleSubmit = async () => {
    try {
      if (upload === true && upload2 === true && upload3 === true) {
        const res = await axios.patch(
          `${BASE_URL}/user/submit`,

          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log("your application submitted", res.data);
        navigate("/submitTy");
      } else toast.error("Check all boxs");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center pt-20">
      <div className="border-2 border-blue-500 ">
        <div className="text-red-600 text-center text-3xl my-3">
          I Confirmed
        </div>
        <div className="flex items-center mx-2 mb-3">
          <div>
            <Checkbox onClick={handleCheck} size="lg"></Checkbox>
          </div>
          <div className="font-bold text-sm text-blue-500">
            Transcript entered matches uploaded transcript document.
            <br />
            <p className="text-[10px] text-red-600">
              (warning, If there is any mismatch, your application will be
              disqualified.)
            </p>
          </div>
        </div>
        <div className="flex items-center mx-2 mb-3">
          <div>
            <Checkbox
              onClick={() => {
                setUpload2(true);
              }}
              size="lg"
            ></Checkbox>
          </div>
          <div className="font-bold text-sm text-blue-500">
            I uploaded all necessary documents (civil Id, Transcript, Graduation
            certificate,
            <br /> grading scale, MOE certificate for international students).
          </div>
        </div>
        <div className="flex items-center mx-2 mb-3">
          <div className="">
            <Checkbox onClick={() => setUpload3(true)} size="lg"></Checkbox>
          </div>
          <div className="font-bold text-sm text-blue-500">
            Your application can not be changes after submission.
          </div>
        </div>
        <div className="flex items-center justify-center gap-10 my-10">
          <Button
            onClick={handleSubmit}
            className="text-white text-xs bg-blue-500 rounded p-5"
          >
            Submit
          </Button>

          <Link
            to={"/Home"}
            className="text-xs bg-blue-100 rounded p-3 px-6  text-blue-500"
          >
            Cancel
          </Link>
        </div>
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

export default SubmitApplication;
