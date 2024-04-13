import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants";
import downloadFile from "js-file-download";
import { useEffect } from "react";
import {
  navigationStart,
  navigationSuccess,
} from "../redux/Navigation/NavigationSlice";
import Loader from "../components/Loader";
const ApplicationFormModal = ({ visilble, onClose }) => {
  const data = useSelector((state) => state.application.application);
  console.log("data per person=>", data);
  if (!visilble) return null;
  const handleGetDoc = async (fileName) => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/download/${fileName}`);
      console.log(res.data);
      downloadFile(res.data, `${fileName}.pdf`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetAllDoc = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/downloadAll/${id}`);
      console.log(res.data);
    } catch (error) {}
  };

  return (
    <div className="fixed z-10 inset-0 bg-white bg-opacity-75 backdrop-blur-lg ">
      <div className="flex items-center mt-20 pl-8 ">
        <button onClick={onClose} className="text-red-600 ">
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Back
        </button>
      </div>
      <div className="flex items-center justify-around border-2 border-blue-500  py-10 mx-10 rounded-lg">
        {" "}
        <div className="left-div">
          <div className="flex items-center">
            <img src="appAvatar.png" alt="applicationPicture" />
            <div className="flex flex-col space-y-3 pl-4">
              <span className="text-blue-500 text-lg">
                Program:{data.program}
              </span>
              <span className="text-blue-500 text-lg">
                School:{data.schoolName}
              </span>
              <span className="text-blue-500 text-lg">GPA:{data.gpa}</span>
              <span className="text-blue-500 text-lg">GPA:{data.gpa}</span>
              <span className="text-blue-500 text-lg">
                #Repetition:{data.repeatedCourses}
              </span>
              <span className="text-blue-500 text-lg">
                #Scool:{data.schoolsAttended}
              </span>
            </div>
          </div>
          <div className=" flex flex-col pl-5">
            <span className="text-blue-500 text-3xl ">{data.name}</span>
            <span className="text-blue-500 text-lg">Contact:93922451</span>
            <span className="text-blue-500 text-lg">student@student.com</span>
          </div>
        </div>
        <div className="right-div flex gap-5">
          <div className="space-y-4">
            <div className="border-2 border-blue-500 flex items-center w-48 py-2">
              <span className="text-blue-400  text-xs pl-12 ">Civil ID</span>
              <button
                onClick={() => handleGetDoc(data?.documents.civilId.fileName)}
                className=" pl-12"
              >
                <img className="w-6 bg-blue-400" src="upp.png" alt="up" />
              </button>
            </div>
            <div className="border-2 border-blue-500 flex items-center w-48 py-2">
              <span className="text-blue-400 text-xs pl-6 ">
                MOE Certificate
              </span>
              <button
                onClick={() =>
                  handleGetDoc(data?.documents.moeCertificate.fileName)
                }
                className=" pl-7"
              >
                <img className="w-6  bg-blue-400" src="upp.png" alt="up" />
              </button>
            </div>
            <div className="border-2 border-blue-500 flex items-center w-48 py-2">
              <span className="text-blue-400 text-xs pl-8  ">Grade Scale</span>
              <button
                onClick={() =>
                  handleGetDoc(data?.documents.gradingScale.fileName)
                }
                className="pl-10 "
              >
                <img className="w-6  bg-blue-400" src="upp.png" alt="up" />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border-2 border-blue-500 flex items-center w-48 py-2">
              <span className="text-blue-400 text-xs pl-12 ">Transcript</span>
              <button
                onClick={() =>
                  handleGetDoc(data?.documents.transcript.fileName)
                }
                className="pl-10 "
              >
                <img className="w-6  bg-blue-400" src="upp.png" alt="up" />
              </button>
            </div>
            <div className="border-2 border-blue-500 flex items-center w-48 py-2">
              <span className="text-blue-400 text-xs pl-4 ">
                Graduation Certificate
              </span>
              <button
                onClick={() =>
                  handleGetDoc(data?.documents.graduationCertificate.fileName)
                }
                className=" pl-2"
              >
                <img className="w-6  bg-blue-400" src="upp.png" alt="up" />
              </button>
            </div>
            <div className="border-2 border-blue-500 flex items-center w-48 py-2">
              <span className="text-blue-400 text-xs pl-5 ">
                Other Documents
              </span>
              <button
                onClick={() =>
                  handleGetDoc(data?.documents.otherDocument.fileName)
                }
                className=" pl-6"
              >
                <img className="w-6  bg-blue-400" src="upp.png" alt="up" />
              </button>
            </div>
            <div className="border-2 border-blue-500 flex justify-around items-center w-96 py-2 ">
              <span className="text-blue-400  pl-5 ">
                download All Documents
              </span>
              <button
                onClick={() => handleGetAllDoc(data?._id)}
                className=" pl-6"
              >
                <img className="w-6  bg-blue-400" src="upp.png" alt="up" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFormModal;
