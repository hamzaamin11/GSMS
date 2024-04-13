import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FilterButton from "./FilterButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "@nextui-org/react";
import {
  fetchingCurrentPageRecords,
  fetchingDataStart,
  fetchingDataSuccess,
  fetchingTotalPages,
  fetchingTotalRecords,
} from "../redux/SubmittedApplications/SubmittedApplicationSlice";
import ApplicationFormModal from "./ApplicationFormModal";
import { addApplicationData } from "../redux/Application/ApplicationSlice";
import {
  navigationStart,
  navigationSuccess,
} from "../redux/Navigation/NavigationSlice";
import Loader from "../components/Loader";
const SubmitApplications = () => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [pagination, setPagination] = useState({ totalPages: 0 });
  const [sortOrder, setSortOrder] = useState("ASC");
  const [sortField, setSortField] = useState("name");
  const [sort, setSort] = useState({
    order: true,
    field: "gpa",
  });
  const [filters, setFilters] = useState({
    systemRole: "USER",
    submitted: true,
  });

  const { currentUser, token } = useSelector((state) => state.user);
  const datas = useSelector((state) => state.submittedApplications.data);
  const loading = useSelector((state) => state.navigation.loading);
  console.log("for mapping", datas);

  const dispatch = useDispatch();
  const systemRole = currentUser?.systemRole;
  console.log(token, systemRole);
  const onChangeSort = (field) => {
    setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
    setSortField(field);
    setSort({
      ...sort,
      order: sort.field === field ? !sort.order : true, //yh ak simple object ha jo field k name same hony pay true data ha..
      field: field,
    });
  };
  // this function is prop lifting Up k lia use kia ha...
  const getFormData = (formData) => {
    setFilters(formData);
  };
  const handleFilter = async (id) => {
    const body = {
      filters: {
        submitted: true,
        systemRole: "USER",
        _id: id,
      },
      pageNumber: currentPage,
      pageSize: recordsPerPage,
      sortField,
      sortOrder,
    };

    try {
      const res = await axios.post(
        `${BASE_URL}/admin/applicationsWithSemestersInfo`,
        body,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(addApplicationData(res.data.data[0]));
    } catch (error) {
      console.log(error.message);
    }

    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };
  console.log("sorting", sort);
  useEffect(() => {
    document.title = "Submitted Application | GSMS";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("Submitted Application | GSMS"));
    }, 500);
    const body = {
      filters,
      pageNumber: currentPage,
      pageSize: recordsPerPage,
      sortField,
      sortOrder,
    };

    const fetchData = async () => {
      dispatch(fetchingDataStart());
      try {
        const res = await axios.post(
          `${BASE_URL}/admin/applicationsWithSemestersInfo`,
          body,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(res.data);
        const { data, ...pagination } = res.data;
        setPagination(pagination);

        console.log("response=>", res.data?.data);
        dispatch(fetchingDataSuccess(res.data?.data));
        dispatch(fetchingTotalPages(res.data.totalPages));
        dispatch(fetchingTotalRecords(res.data.totalRecords));
        dispatch(fetchingCurrentPageRecords(res.data.currentPageRecords));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [sortField, sortOrder, filters, recordsPerPage, currentPage]);
  if (loading) return <Loader />;
  return (
    <div>
      <div className="text-blue-500 text-3xl font-semibold flex justify-center pt-10">
        Submitted Applications
      </div>
      <div className="">
        <FilterButton getFormData={getFormData} />
      </div>
      <div className=" flex justify-evenly text-center pt-6">
        <div className="" onClick={() => onChangeSort("civilId")}>
          <span className="text-blue-500 ">Civil ID</span>
          <span className="ml-1">
            {sort.field === "civilId" &&
              (sort.order ? (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-up"
                  size="xs"
                />
              ) : (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-down"
                  size="xs"
                />
              ))}
          </span>
          <hr className="h-[3px] w-[20vh] bg-blue-500  " />
        </div>
        <div onClick={() => onChangeSort("name")}>
          <span className="text-blue-500">Student Name</span>
          <span className="ml-1">
            {sort.field === "name" &&
              (sort.order ? (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-up"
                  size="xs"
                />
              ) : (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-down"
                  size="xs"
                />
              ))}
          </span>
          <hr className="h-[3px] w-[40vh] bg-blue-500  " />
        </div>
        <div onClick={() => onChangeSort("program")}>
          <span className="text-blue-500 ">Program</span>
          <span className="ml-1">
            {sort.field === "program" &&
              (sort.order ? (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-up"
                  size="xs"
                />
              ) : (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-down"
                  size="xs"
                />
              ))}
          </span>
          <hr className="h-[3px] w-[24vh] bg-blue-500  " />
        </div>
        <div onClick={() => onChangeSort("gpa")}>
          <span className="text-blue-500 ml-1">GPA</span>
          <span className="ml-1">
            {sort.field === "gpa" &&
              (sort.order ? (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-up"
                  size="xs"
                />
              ) : (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-down"
                  size="xs"
                />
              ))}
          </span>
          <hr className="h-[3px] w-[16vh] bg-blue-500  " />
        </div>
        <div onClick={() => onChangeSort("kugpa")}>
          <span className="text-blue-500">Ku GPA</span>
          <span className="ml-1">
            {sort.field === "kugpa" &&
              (sort.order ? (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-up"
                  size="xs"
                />
              ) : (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-down"
                  size="xs"
                />
              ))}
          </span>
          <hr className="h-[3px] w-[16vh] bg-blue-500  " />
        </div>
        <div onClick={() => onChangeSort("kuMgpa")}>
          <span className="text-blue-500"> Ku MGPA</span>
          <span className="ml-1">
            {sort.field === "kuMgpa" &&
              (sort.order ? (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-up"
                  size="xs"
                />
              ) : (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-down"
                  size="xs"
                />
              ))}
          </span>
          <hr className="h-[3px] w-[16vh] bg-blue-500  " />
        </div>
        <div onClick={() => onChangeSort("repeatedCourses")}>
          <span className="text-blue-500">#R</span>
          <span className="ml-1">
            {sort.field === "repeatedCourses" &&
              (sort.order ? (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-up"
                  size="xs"
                />
              ) : (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-down"
                  size="xs"
                />
              ))}
          </span>
          <hr className="h-[3px] w-[16vh] bg-blue-500  " />
        </div>
        <div onClick={() => onChangeSort("schoolsAttended")}>
          <span className="text-blue-500">#S</span>
          <span className="ml-1">
            {sort.field === "schoolAttended" &&
              (sort.order ? (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-up"
                  size="xs"
                />
              ) : (
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon="fa-solid fa-caret-down"
                  size="xs"
                />
              ))}
          </span>
          <hr className="h-[3px] w-[16vh] bg-blue-500  " />
        </div>
      </div>
      {datas?.map((data) => (
        <div
          key={data._id}
          className="flex items-center justify-between text-blue-500"
        >
          <div className="ml-5 flex w-16">
            <button onClick={() => handleFilter(data._id)}>
              <FontAwesomeIcon size="xs" icon="fa-solid fa-magnifying-glass" />
            </button>
            <span className="">{data.civilId.slice(0, 12)}</span>
          </div>
          <span className="w-16"> {data.name}</span>
          <span className="w-16">{data.program}</span>
          <span className="w-">{data.gpa}</span>
          <span className="w-56"> {data.repeatedCourses}</span>
          <span className="w-16">{data.schoolsAttended}</span>
        </div>
      ))}
      <div className="flex justify-around pt-20">
        <div className="">
          <Pagination
            page={currentPage}
            onChange={(page, e) => setCurrentPage(page)}
            showControls
            total={pagination.totalPages}
          />
        </div>
        <div className="flex items-center justify-around   ">
          <select
            onChange={(e) => setRecordsPerPage(e.target.value)}
            value={recordsPerPage}
            className="text-blue-500 p-1 border border-blue-500 rounded"
          >
            {[1, 10, 25, 50, 100].map((val, id) => (
              <option key={id} value={val}>
                {val}
              </option>
            ))}
          </select>
          <div className="text-blue-500 pl-4">
            Showing records {currentPage} of {pagination.totalRecords}
          </div>
        </div>
      </div>
      <ApplicationFormModal visilble={visible} onClose={handleClose} />
    </div>
  );
};

export default SubmitApplications;
