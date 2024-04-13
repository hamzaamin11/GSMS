import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  navigationStart,
  navigationSuccess,
} from "../redux/Navigation/NavigationSlice";
import Loader from "../components/Loader";
import FIleUploadModal from "./FIleUploadModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";
import {
  uploadFileStart,
  uploadFileSuccess,
} from "../redux/AddSmster/AddSmsterSlice";

const Documents = () => {
  const loading = useSelector((state) => state.navigation.loading);
  const documents = useSelector((state) => state.transcript.document);
  const token = useSelector((state) => state.user.token);
  const [documentName, setDocumentName] = useState("");
  console.log("docName:", documentName);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (documentName) => {
    setDocumentName(documentName);
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };

  const handleGetDoc = async () => {
    dispatch(uploadFileStart());
    try {
      const res = await axios.get(`${BASE_URL}/transcript/getDocuments`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data);
      console.log("get all docs...");
      dispatch(uploadFileSuccess(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    dispatch(navigationStart());
    document.title = "GSMS | Document";
    handleGetDoc();
    setTimeout(() => {
      dispatch(navigationSuccess("Documents"));
    }, [500]);
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex justify-center  pt-14 text-blue-500 text-3xl font-semibold">
        Documents
      </div>
      <div>
        <div className="flex items-center justify-center gap-10 my-10 ">
          <div className="flex items-center justify-center border-2 border-blue-500  py-2  px-4 rounded">
            {documents?.civilId ? (
              <button className="bg-blue-400  w-10 p-2 rounded-3xl text-white">
                <FontAwesomeIcon icon="fa-solid fa-check" />
              </button>
            ) : (
              <button className="bg-red-500  w-10 p-2 rounded-3xl text-white">
                <p className="font-bold text-center">X</p>
              </button>
            )}
            <span className="text-blue-400 text-xl pl-4">Civil ID</span>
            <button
              onClick={() => handleClick(() => "civilId")}
              className=" pl-44"
            >
              <img className="w-10 bg-blue-400" src="upp.png" alt="up" />
            </button>
          </div>
          <div className="flex items-center justify-center border-2 border-blue-500   py-2 px-4 mx-2 rounded">
            {documents?.graduationCertificate ? (
              <button className="bg-blue-400  w-10 p-2 rounded-3xl text-white">
                <FontAwesomeIcon icon="fa-solid fa-check" />
              </button>
            ) : (
              <button className="bg-red-500  w-10 p-2 rounded-3xl text-white">
                <p className="font-bold text-center">X</p>
              </button>
            )}
            <span className="text-blue-400 text-xl pl-2">
              Graduation Certificate
            </span>
            <button
              onClick={() => handleClick("graduationCertificate")}
              className="pl-10"
            >
              <img className="w-10" src="upp.png" alt="up" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-[50px] ">
          <div className="flex items-center justify-center border-2 border-blue-500  py-2  px-4 rounded">
            {documents?.transcript ? (
              <button className="bg-blue-400  w-10 p-2 rounded-3xl text-white">
                <FontAwesomeIcon icon="fa-solid fa-check" />
              </button>
            ) : (
              <button className="bg-red-500  w-10 p-2 rounded-3xl text-white">
                <p className="font-bold text-center">X</p>
              </button>
            )}
            <span className="text-blue-400 text-xl pl-4 ">Transcript</span>
            <button
              onClick={() => handleClick("transcript")}
              className=" pl-[152px]"
            >
              <img className="w-10" src="upp.png" alt="up" />
            </button>
          </div>

          <div className="flex items-center justify-center border-2 border-blue-500   py-2 px-4  rounded">
            {documents?.moeCertificate ? (
              <button className="bg-blue-400  w-10 p-2 rounded-3xl text-white">
                <FontAwesomeIcon icon="fa-solid fa-check" />
              </button>
            ) : (
              <button className="bg-red-500  w-10 p-2 rounded-3xl text-white">
                <p className="font-bold text-center">X</p>
              </button>
            )}
            <span className="text-blue-400 text-xl pl-2">MOE Certificate</span>
            <button
              onClick={() => handleClick("moeCertificate")}
              className="pl-24"
            >
              <img className="w-10" src="upp.png" alt="up" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-10 mt-10">
          <div className="flex items-center justify-center border-2 border-blue-500  py-2  px-4 rounded">
            {documents?.gradingScale ? (
              <button className="bg-blue-400  w-10 p-2 rounded-3xl text-white">
                <FontAwesomeIcon icon="fa-solid fa-check" />
              </button>
            ) : (
              <button className="bg-red-500  w-10 p-2 rounded-3xl text-white">
                <p className="font-bold text-center">X</p>
              </button>
            )}
            <span className="text-blue-400 text-xl pl-4">Grading Scale</span>
            <button
              onClick={() => handleClick("gradingScale")}
              className=" pl-[119px]"
            >
              <img className="w-10" src="upp.png" alt="up" />
            </button>
          </div>
          <div className="flex items-center justify-center border-2 border-blue-500   py-2 px-4 mx-2 rounded">
            {documents?.otherDocument ? (
              <button className="bg-blue-400  w-10 p-2 rounded-3xl text-white">
                <FontAwesomeIcon icon="fa-solid fa-check" />
              </button>
            ) : (
              <button className="bg-red-500  w-10 p-2 rounded-3xl text-white">
                <p className="font-bold text-center">X</p>
              </button>
            )}
            <span className="text-blue-400 text-xl pl-2">Other Document</span>
            <button
              onClick={() => handleClick("otherDocument")}
              className="pl-[85px]"
            >
              <img className="w-10" src="upp.png" alt="up" />
            </button>
          </div>
        </div>
        <div className="flex justify-center pt-10">
          <Link to={"/Home"}>
            <button
              className="bg-blue-500 border p-3 text-sm text-white rounded"
            >
              Back to home
            </button>
          </Link>
        </div>
      </div>
      <FIleUploadModal
        visible={modal}
        documentName={documentName}
        onClose={handleClose}
      />
    </div>
  );
};

export default Documents;
