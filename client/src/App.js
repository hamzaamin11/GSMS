import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Protected from "./Pages/Protected";
import SignUp from "./Pages/SignUp";
import Transcript from "./Pages/Transcript";
import Documents from "./Pages/Documents";
import SubmitApplication from "./Pages/SubmitApplication";
import SignIn from "./Pages/SignIn";
import AddSmster from "./Pages/AddSmster";
import GetSemester from "./Pages/GetSemester";
import Navbar from "./Pages/Navbar";
import { useSelector } from "react-redux";
import AdminHomePage from "./adminPage/AdminHomePage";
import Submit from "./Pages/Submit";
import SubmitApplications from "./adminPage/SubmitApplications";
import OpenApplications from "./adminPage/OpenApplications";
function App() {
  const userInfo = useSelector((state) => state.user.currentUser);
  return (
    <div>
      <BrowserRouter>
        {userInfo && <Navbar />}
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="" element={<Protected />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/transcript" element={<Transcript />} />
            <Route path="/document" element={<Documents />} />
            <Route path="/submit" element={<SubmitApplication />} />
            <Route path="/Addsmster" element={<AddSmster />} />
            <Route path="/submitTy" element={<Submit />} />
            <Route path="/semester/:id" element={<GetSemester />} />
            <Route path="/home/admin" element={<AdminHomePage />} />
            <Route
              path="/submiitedApplications"
              element={<SubmitApplications />}
            />
          </Route>
          <Route path="/openApplications" element={<OpenApplications />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
