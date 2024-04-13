import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  navigationStart,
  navigationSuccess,
} from "../redux/Navigation/NavigationSlice";
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.navigation.loading);

  useEffect(() => {
    document.title = "GSMS | Home";
    dispatch(navigationStart());

    setTimeout(() => {
      dispatch(navigationSuccess("Home"));
    }, 500);
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center pt-28  pl-72">
        <div className="p-16 ">
          <Link
            className="text-white bg-blue-500 hover:opacity-95 p-8  rounded-md text-2xl "
            to="/transcript"
          >
            Enter Transcript
          </Link>
        </div>
        <div>
          <Link
            className="text-white bg-blue-500 hover:opacity-95  p-8 rounded-md text-2xl"
            to="/document"
          >
            Upload Document
          </Link>
        </div>
      </div>
      <div className="pl-[500px]">
        <div className="border border-blue-400 hover:opacity-80 bg-blue-50  w-60 text-center p-8 ">
          <Link className="text-blue-500   rounded-md text-2xl" to="/submit">
            Submit Your <br />
            Application
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
