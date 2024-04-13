import axios from "axios";
import  {  useRef, useState } from "react";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadFileFailure,
  uploadFileStart,
  uploadFileSuccess,
} from "../redux/AddSmster/AddSmsterSlice";

const FIleUploadModal = ({ visible, onClose, documentName }) => {
  console.log("documentName",documentName)
  const token = useSelector((state) => state.user.token);
  const [file, setFile] = useState(<p className="text-red-500 text-xs">No choosen file</p>);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  if (!visible) return null;
  const handleDocUpload = async () => {
    console.log("File:", file);
    console.log("Length:", !Object.keys(file).length);
    if (!file.name) {
      // Handle the error
      console.log("File is not added");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentName", documentName);
    dispatch(uploadFileStart());
    try {
      console.log("Making request to the server");
      const res = await axios.post(
        `${BASE_URL}/transcript/uploadDocument`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      dispatch(uploadFileSuccess(res.data));
      onClose();
      console.log("pdf file", res.data);
    } catch (error) {
      dispatch(uploadFileFailure(error.message));
      console.log("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm">
    
      <div className="flex justify-center pt-40">
        <form className="border-2 border-blue-500 p-14 px-52 bg-white">
          <div className="">
            <span>
              <input
                type="file"
                ref={fileRef}
                onChange={(e) => setFile(e.target.files[0])}
                hidden
                accept="application/pdf,application/csv"
              />
            </span>
          </div>
          <div className="pl-10">
            <button
              type="button"
              className="text-white bg-blue-500 p-3 rounded text-sm"
              onClick={() => fileRef.current.click()}
            >
              Select File from Pc
            </button>
          </div>
          <div className="text-xs text-red-600 font-semibold pl-9">
            only PDF format accepted!
          </div>
          <div className="text-blue-500 text-center text-xs pt-2">{file.name}</div>
          <div className="pt-10 space-x-16">
            <button
              type="button"
              onClick={handleDocUpload}
              className="border border-blue-500 p-[10px] px-5  bg-blue-500 text-white text-sm"
            >
              Upload File
            </button>
            <button
              className="border border-blue-500 p-[10px] px-6 bg-blue-50 text-blue-500 text-sm"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FIleUploadModal;
