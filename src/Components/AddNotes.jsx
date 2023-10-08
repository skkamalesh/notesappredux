import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { NotesDataContext } from "../Context/NotesContext";
import { toast } from "react-toastify";
import axios from "axios";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { addData, deleteData, setData } from "../redux/DataSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
function AddNotes() {
  const data = useSelector((state) => state.data.data);
  let dispatch = useDispatch();
  let { API } = useContext(NotesDataContext);
  const [initialValues, setInitialValues] = useState({
    id: null,
    title: "",
    content: "",
  });
  const UserSchema = Yup.object().shape({
    title: Yup.string().required("* Required"),
    content: Yup.string().required("* Required"),
  });
  const getData = async (id) => {
    try {
      if (id) {
        let res = await axios.get(`${API}/${id}`);
        if (res.status === 200) {
          setInitialValues(res.data);
        }
      } else {
        let res = await axios.get(API);
        if (res.status === 200) {
          dispatch(setData(res.data));
        }
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };
  const handleAddUser = async (values) => {
    dispatch(addData(values));
    toast.success("Added");
    try {
      let res = await axios.post(API, values);
      if (res.status === 201) {
        getData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Occurred");
    }
  };
  const handleDelete = async (id, values) => {
    dispatch(deleteData(values));
    try {
      let res = await axios.delete(`${API}/${id}`);
      if (res.status === 200) {
        getData();
        toast.success("Deleted");
      }
    } catch (error) {
      toast.error("Error Occurred");
    }
  };
  const getEditUser = async (id) => {
    try {
      let res = await axios.get(`${API}/${id}`);
      if (res.status === 200) {
        setInitialValues(res.data);
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };
  const handleEditUser = async (id, values) => {
    try {
      let res = await axios.put(`${API}/${id}`, values);

      if (res.status === 200) {
        setInitialValues({
          id: null,
          title: "",
          content: "",
        });
        toast.success("Updated");
        getData();
      }
    } catch (error) {
      toast.error("Error Occurred");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="flex flex-1 flex-col bg-white rounded-lg h-[290px] m-auto mt-1 shadow-lg">
        <div className="text-blue-950 opacity-80 text-3xl pt-5 ps-6 font-semibold">
          Add a Note
        </div>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={UserSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            if (initialValues.id) {
              handleEditUser(initialValues.id, values);
            } else {
              handleAddUser(values);
            }
            resetForm();
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className="w-1/2 pt-5 px-6 text-blue-950 outline-none border-0 text-2xl placeholder:text-blue-950 font-semibold opacity-75"
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.title && touched.title ? (
                  <div style={{ color: "red", paddingLeft: "20px" }}>
                    {errors.title}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <div className="mb-3">
                  <textarea
                    className="w-full h-1/3 resize-none outline-none border-0 pt-2 px-6 scrollbar-thin"
                    type="text"
                    name="content"
                    placeholder="Take a note..."
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.content && touched.content ? (
                    <div style={{ color: "red", paddingLeft: "20px" }}>
                      {errors.content}
                    </div>
                  ) : null}
                </div>
                <div className="flex justify-end me-3">
                  <button
                    type="submit"
                    className="bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-950 border-0 rounded-lg"
                    disabled={isSubmitting}
                  >
                    {initialValues.id ? "Edit Note" : "Add Note"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className="text-blue-950  mt-6">
        <div className="flex items-center gap-3 opacity-85 mb-2">
          <DescriptionOutlinedIcon />
          <h1 className="text-2xl font-semibold">My Notes</h1>
        </div>
        <div className="text-sm text-gray-600 font-semibold mb-2 opacity-80">
          <p>Recently viewed</p>
        </div>
        <div className="flex gap-5 flex-nowrap overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 py-2">
          {data.map((e, i) => (
            <div
              className="min-w-[14rem] w-[14rem] h-64 bg-white rounded-xl shadow-lg cursor-pointer "
              key={i}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-[9rem] mt-3 ms-3 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-50">
                  <h1 className="font-semibold opacity-85">{e.title}</h1>
                </div>
                <div className="mt-3 opacity-85">
                  <EditOutlinedIcon
                    className="ms-1 cursor-pointer"
                    onClick={() => getEditUser(e.id)}
                  />
                  <DeleteOutlineIcon
                    className="me-2 cursor-pointer"
                    onClick={() => handleDelete(e.id, e)}
                  />
                </div>
              </div>
              <div className="h-[65%] overflow-auto scrollbar-thin scrollbar-thumb-slate-50">
                <p className="ms-3 me-3 text-black break-words font-medium opacity-80 text-justify">
                  {e.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default AddNotes;
