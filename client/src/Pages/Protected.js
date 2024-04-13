import React, { useEffect } from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";
import { getFromLs } from "./Heplers";
import { useSelector } from "react-redux";
import SignIn from "./SignIn";

const Protected = () => {
  const userInfo = useSelector((state) => state.user.currentUser);

  return userInfo ? <Outlet /> :  <Navigate to="/signin" replace={true} />;
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const isLoggedIn = getFromLs("Tokenjwt");
  //   if (!isLoggedIn) {
  //     navigate("/signIn");
  //   }
  // }, []);
  // return <Outlet />;
};

export default Protected;
