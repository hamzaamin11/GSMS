import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants";
import {
  fetchingCurrentPageRecords,
  fetchingDataSuccess,
  fetchingTotalPages,
  fetchingTotalRecords,
} from "../redux/openApplication/OpenApplicationSlice";
import {
  navigationStart,
  navigationSuccess,
} from "../redux/Navigation/NavigationSlice";
import Loader from "../components/Loader";

const OpenApplications = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const loading = useSelector((state) => state.navigation.loading);
  const datas = useSelector((state) => state.openApplications.data);
  console.log("hey", datas);
  const systemRole = currentUser?.systemRole;
  console.log(token, systemRole);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "OpenApplication | GSMS";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("openApplication"));
    }, 500);
    const body = {
      filters: { submitted: false, systemRole: "USER" },
      pageNumber: 1,
      pageSize: 25,
      sortField: "createdAt",
      sortOrder: "ASC",
    };
    const handleFetch = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/admin/applications`, body, {
          headers: {
            Authorization: token,
            systemRole: systemRole,
          },
        });
        dispatch(fetchingDataSuccess(res.data.data));
        dispatch(fetchingTotalRecords(res.data.totalRecords));
        dispatch(fetchingCurrentPageRecords(res.data.currentPageRecords));
        dispatch(fetchingTotalPages(res.data.totalPages));
      } catch (error) {
        console.log(error);
      }
    };
    handleFetch();
  }, []);
  if (loading) return <Loader />;
  return (
    <div>
      <div className="text-blue-500 text-3xl font-semibold flex justify-center pt-10">
        OpenApplications
      </div>
      <div className=" flex justify-evenly text-center pt-6">
        <div>
          <span className="text-blue-500">Civil ID</span>
          <hr className="h-[3px] w-[20vh] bg-blue-500  " />
        </div>
        <div>
          <span className="text-blue-500">Student Name</span>
          <hr className="h-[3px] w-[40vh] bg-blue-500  " />
        </div>
        <div>
          <span className="text-blue-500">GPA</span>
          <hr className="h-[3px] w-[16vh] bg-blue-500  " />
        </div>
        <div>
          <span className="text-blue-500">Program</span>
          <hr className="h-[3px] w-[24vh] bg-blue-500  " />
        </div>
      </div>
      {datas?.map((data) => (
        <div className="flex items-center justify-around text-blue-500" key={data._id}>
          <span className="w-20 bg-sky-100"> {data.civilId.slice(0,10)}</span>
          <span className="w-">{data.name}</span>
          <span className="w-20"> {data.gpa}</span>
          <span className="w-16">{data.program}</span>
        </div>
      ))}
    </div>
  );
};

export default OpenApplications;
