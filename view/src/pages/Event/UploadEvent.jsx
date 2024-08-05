/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

function UploadEvent() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    Teamsize: "",

    description: "",
    registrationdate: "",
    enddate: "",
    eventdate: "",
    location: "",
    timing: "",
    price: "",
    coordinators: [],
    images: [],
    imageCover: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      /* [name]: value, */
      imageCover: file,
    }));
  };

  const handleImageChange = (e, index) => {
    const { files } = e.target;
    const updatedImages = [...formData.images];
    updatedImages[index] = files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: updatedImages,
    }));
  };

  /* const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageCover: file,
    }));
  }; */

  const handleCoverChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Upload images to Cloudinary here (omitted for brevity)

    try {
      const response = await axios.post(
        "http://localhost:5173/api/v1/events",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Data uploaded and stored in the database:", response.data);

      // Reset form fields
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: "",
        Teamsize: "",
        description: "",
        registrationdate: "",
        enddate: "",
        eventdate: "",
        location: "",
        timing: "",
        price: "",
        coordinators: [],
        images: [],
        imageCover: null,
      }));

      setTimeout(() => {
        navigate(`/event`);
      }, 950);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };
  /* const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  }; */

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Upload New Event
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="name">
                Event Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="name">
                Team Size
              </label>
              <input
                type="number"
                name="Teamsize"
                id="name"
                value={formData.Teamsize}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            {/*  <div>
              <label className="text-white dark:text-gray-200" htmlFor="price">
                price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div> */}
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="registrationdate"
              >
                registrationdate
              </label>
              <input
                id="registrationdate"
                name="registrationdate"
                type="date"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor=" enddate"
              >
                enddate
              </label>
              <input
                id=" enddate"
                name=" enddate"
                type="date"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="eventdate"
              >
                eventdate
              </label>
              <input
                id="eventdate"
                name="eventdate"
                type="date"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="description"
              >
                description
              </label>
              <textarea
                id="description"
                name="description"
                type="textarea"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                defaultValue={""}
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="Location"
              >
                Location:
                <input
                  type="text"
                  name="location"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor=" Timing:"
              >
                Timing :
                <input
                  type="text"
                  name="timing"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={formData.timing}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="Registration Fees:"
              >
                Registration Fees :
                <input
                  name="price"
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor=" Event-Head :"
              >
                Event-Head :
                <input
                  name="coordinators"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={formData.coordinators[0]}
                  onChange={(e) => {
                    const updatedCoordinators = [...formData.coordinators];
                    updatedCoordinators[0] = e.target.value;
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      coordinators: updatedCoordinators,
                    }));
                  }}
                />
              </label>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="Event Co-Head :"
              >
                Event Co-Head :
                <input
                  name="coordinators"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={formData.coordinators[1]}
                  onChange={(e) => {
                    const updatedCoordinators = [...formData.coordinators];
                    updatedCoordinators[1] = e.target.value;
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      coordinators: updatedCoordinators,
                    }));
                  }}
                />
              </label>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="Faculty Head :"
              >
                Faculty Head :
                <input
                  name="coordinators"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={formData.coordinators[2]}
                  onChange={(e) => {
                    const updatedCoordinators = [...formData.coordinators];
                    updatedCoordinators[2] = e.target.value;
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      coordinators: updatedCoordinators,
                    }));
                  }}
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Image Cover (Single Image)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {formData.imageCover && (
                    <div>
                      <img
                        src={URL.createObjectURL(formData.imageCover)}
                        alt="Selected"
                        className="mx-auto h-24 w-24 rounded-md"
                      />
                      <p className="text-sm text-white">
                        {formData.imageCover.name}
                      </p>
                    </div>
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="imageCover"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span className="">Upload a file</span>
                      <input
                        id="imageCover"
                        name="imageCover"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleCoverChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-white">PNG, JPG</p>
                </div>
              </div>
            </div>

            <div>
              {[...Array(3)].map((_, index) => (
                <div key={index}>
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Event Image {index + 1}
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {formData.images[index] && (
                          <div>
                            <img
                              src={URL.createObjectURL(formData.images[index])}
                              alt={`Event ${index + 1}`}
                              className="mx-auto h-24 w-24 rounded-md"
                            />
                            <p className="text-sm text-white">
                              {formData.images[index].name}
                            </p>
                          </div>
                        )}
                        {/* <svg
                          className="mx-auto h-12 w-12 text-white"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg> */}
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor={`image-upload-${index}`}
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span className="">Upload a file</span>
                            <input
                              id={`image-upload-${index}`}
                              name={`image-upload-${index}`}
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) => handleImageChange(e, index)}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-white">PNG, JPG</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/*  {[...Array(3)].map((_, index) => (
              <div key={index}>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Event Image {index + 1}
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {formData.images[index] && (
                        <div>
                          <img
                            src={URL.createObjectURL(formData.images[index])}
                            alt={` ${index + 1}`}
                            className="mx-auto h-24 w-24 rounded-md"
                          />
                          <p className="text-sm text-white">
                            {formData.images[index].name}
                          </p>
                        </div>
                      )}
                      <svg
                        className="mx-auto h-12 w-12 text-white"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span className="">Upload a file</span>
                          <input
                            id="imageCover"
                            name="imageCover"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => handleImageChange(e, index)}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-white">PNG, JPG</p>
                    </div>
                  </div>
                </div>
              </div>
            ))} */}
            {/* <div>
              <label className="block text-sm font-medium text-white">
                Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span className="">Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span className="">Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="mx-auto h-40 w-auto"
                    />
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-white"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span className="">Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div> */}
          </div>
          <div className="flex justify-end mt-6 space-x-4">
            <button
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
              type="submit"
              disabled={submitting}
            >
              {/* Save */}
              {submitting ? "Uploading..." : "Submit"}
            </button>

            <Link to={`/event`}>
              <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </section>
      {/*  <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Account settings
        </h2>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Password Confirmation
              </label>
              <input
                id="passwordConfirmation"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section> */}
    </>
  );
}

export default UploadEvent;
