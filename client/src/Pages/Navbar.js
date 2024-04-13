import { Link, useLocation } from "react-router-dom";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/user/UserSlice";

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const systemRole = currentUser.systemRole;
  console.log("systemRole", systemRole);
  const location = useLocation();
  console.log(location);
  const activeLinkStyle = "underline";
  const dispatch = useDispatch();

  return (
    <div className="bg-blue-500 flex items-center justify-between pr-6">
      <div className=" p-4 space-x-6 flex items-center ">
        <span className="text-white text-3xl ">GSMS</span>
        {systemRole === "USER" ? (
          <div className="space-x-6">
            <Link
              className={`text-white hover:underline ${
                location.pathname === "/Home" && activeLinkStyle
              }`}
              to="/Home"
            >
              Home
            </Link>
            <Link
              className={`text-white hover:underline ${
                location.pathname === "/transcript" && activeLinkStyle
              }`}
              to="/transcript"
            >
              Transcript
            </Link>
            <Link
              className={`text-white hover:underline ${
                location.pathname === "/document" && activeLinkStyle
              }`}
              to="/document"
            >
              Document
            </Link>
          </div>
        ) : (
          <div className=" flex items-center  space-x-6">
            <Link
              className={`text-white hover:underline ${
                location.pathname === "/home/admin" && activeLinkStyle
              } `}
              to={"/home/admin"}
            >
              Home
            </Link>
            <Link
              className={`text-white hover:underline flex ${
                location.pathname === "/submiitedApplications" &&
                activeLinkStyle
              }`}
              to={"/submiitedApplications"}
            >
              Submitted Applications
            </Link>
            <Link
              className={`text-white hover:underline ${
                location.pathname === "/openApplications" && activeLinkStyle
              }`}
              to={"/openApplications"}
            >
              Open Applications
            </Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 ">
        <div className=" text-white font-semibold ">{currentUser?.name}</div>
        <div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://gravatar.com/avatar?d=mp"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="text-slate-500">
                  <span>{currentUser?.name}</span>
                  <br />
                  Civil ID: {currentUser?.civilId}
                </p>
              </DropdownItem>
              {/* <DropdownItem key="settings">My Settings</DropdownItem> */}
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => dispatch(signOut(), localStorage.clear())}
              >
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
