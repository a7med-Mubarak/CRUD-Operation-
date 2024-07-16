import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { MdCloudUpload } from "react-icons/md";
import Style from "./CreateACC.module.css";

const CreateACC = () => {
  const apiHeaders = {
    'app-id': '64fc4a747b1786417e354f31'
  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validateScheme = Yup.object({
    firstName: Yup.string().min(3, 'Name must be at least 3 characters').max(10, 'Name must be at most 10 characters').required('First Name is required'),
    lastName: Yup.string().min(3, 'Name must be at least 3 characters').max(10, 'Name must be at most 10 characters').required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().matches(phoneRegExp, 'Invalid phone number').required('Phone Number is required'),
    picture: Yup.mixed().required('Please upload an image')
  });

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No Selected File");

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      picture: '',
      email: '',
      phone: ''
    },
    validationSchema: validateScheme,
    onSubmit: values => {
      registerSubmit(values);
    }
  });

  const registerSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('picture', values.picture);

      console.log('Submitting form with values:', {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        picture: values.picture ? values.picture.name : 'No file'
      });

      const response = await axios.post('https://dummyapi.io/data/v1/user/create', formData, {
        headers: {
          ...apiHeaders,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
    } catch (error) {
      console.error('Error during form submission:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className={Style.customBox}>
      <div className="container mt-5">
        <div className="card p-4">
          <main>
            <form
              className={Style.form}
              onClick={() => document.querySelector(".input-field").click()}
            >
              <input
                name="picture"
                onBlur={formik.handleBlur}
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  formik.setFieldValue("picture", file);
                  setFileName(file ? file.name : "No Selected File");
                  if (file) {
                    setImage(URL.createObjectURL(file));
                  }
                }}
                type="file"
                accept="image/*"
                className="input-field"
                hidden
              />
              {formik.errors.picture && formik.touched.picture ? (
                <div className="alert mt-2 p-2 alert-danger">{formik.errors.picture}</div>
              ) : null}
              {image ? (
                <img className={Style.picture} src={image} alt={fileName} />
              ) : (
                <>
                  <MdCloudUpload color="#0d6efd" size={60} />
                  <p className="text-center">Upload Picture</p>
                </>
              )}
            </form>
          </main>

          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    type="text"
                    className="mb-4 form-control"
                    placeholder="First Name"
                    name="firstName"
                  />
                  {formik.errors.firstName && formik.touched.firstName ? (
                    <div className="alert mt-2 p-2 alert-danger">{formik.errors.firstName}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="lastName"
                  />
                  {formik.errors.lastName && formik.touched.lastName ? (
                    <div className="alert mt-2 p-2 alert-danger">{formik.errors.lastName}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    type="tel"
                    className="mb-5 form-control"
                    placeholder="Phone Number"
                    name="phone"
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <div className="alert mt-2 p-2 alert-danger">{formik.errors.phone}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="alert mt-2 p-2 alert-danger">{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="row">
              <button type="button" className="w-25 btn btn-secondary mr-2">Cancel</button>
              <button type="submit" style={{ marginLeft: "50%" }} className="w-25 btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateACC;
