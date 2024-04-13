import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddApplicationModal = ({ visible, onClose }) => {
  const [file, setFile] = useState("");
  if (!visible) return null;
  const handleSubmit = (e) => {
    e.preventDefault();

    const updateFile = new FormData();
    console.log("Length:", !Object.keys(file).length);
    if (!file) {
      console.log("no file");
      toast.error("please choose file first ");
      return;
    }
    updateFile.append("file", file);

    console.log("updateFile", updateFile);
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm pt-40 ">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div className=" border-2 pt-10 px-36 pb-16 border-blue-500">
            <input
              className="text-sm ml-14"
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              accept="application/pdf"
            />
            <div className="text-xs text-red-600 font-semibold ml-16 mt-5"></div>

            {file?.name || (
              <span className="text-xs text-red-600 font-semibold ml-14">
                "Only CSV format accepted!"
              </span>
            )}

            <div className=" pt-10 flex justify-center gap-16">
              <button className="text-white  hover:opacity-75 text-xs bg-blue-500 p-3 px-9">
                Upload
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-blue-500 hover:opacity-75 text-xs bg-blue-100 p-3 px-9"
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

export default AddApplicationModal;
