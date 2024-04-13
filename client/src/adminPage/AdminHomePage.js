import { useEffect, useState } from "react";
import AddApplicationModal from "./AddApplicationModal";
import AddUserModal from "./AddUserModal";

const AdminHomePage = () => {
  const [visible, setVisible] = useState(false);
  const [appear, setAppear] = useState(false);
  console.log(visible);
  function handleClick() {
    setVisible(true);
  }
  function handleClose() {
    setVisible(false);
  }
  useEffect(() => {
    document.title = "HOME | GSMS";
  }, []);
  return (
    <div>
      <div className="flex items-center justify-around h-96 ">
        <button
          type="button"
          onClick={handleClick}
          className="text-blue-500 font-bold border-2 p-2 px-6 border-blue-500 bg-blue-50"
        >
          Add Application
        </button>
        <button
          onClick={() => setAppear(true)}
          className="text-blue-500 font-bold border-2 p-2 px-6 border-blue-500 bg-blue-50"
        >
          Add Users
        </button>
      </div>
      <AddApplicationModal visible={visible} onClose={handleClose} />
      <AddUserModal visible={appear} onClose={() => setAppear(false)} />
    </div>
  );
};

export default AdminHomePage;
