import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import Dropzone from "react-dropzone";
import axios from "axios";

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValues = {
  username: "",
  password: "",
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values: any, onSubmitProps: any) => {
    const logInData = JSON.stringify(values);

    const loggedInResponse = await axios({
      method: "post",
      url: import.meta.env.VITE_SERVER_URL + "/login",
      data: logInData,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const loggedIn = await loggedInResponse.data;

    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
    }

    navigate("/");
  };

  const handleFormSubmit = async (values: any, onSubmitProps: any) => {
    await login(values, onSubmitProps);
  };

  return (
    <div className="bg-gray-600 px-2 pt-2 pb-5">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col m-2">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              className="bg-gray-200 p-3 rounded mt-2"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              className="bg-gray-200 p-3 rounded mt-2"
            />
            <button type="submit" className="bg-green-300 p-2 mt-2 text-white">
              Login
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
