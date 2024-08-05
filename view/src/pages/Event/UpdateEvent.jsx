import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import styles from "./UpdateEvent.module.css";

function EventForm() {
  const [eventData, setEventData] = useState({
    /* winnersimages: ["", "", ""], // Initialize with empty strings
    winners: ["", "", ""], // Initialize with empty strings */
  }); //before update data get api
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    /* images: [],
    imageCover: "",
    winnersimages: ["", "", ""],
    winners: ["", "", ""], */
  }); //filter update data patch api
  //const [eventImages, setEventImages] = useState([]);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const eventId = params.id;

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/events/${eventId}`
        );
        setEventData(response.data.data.event);
        console.log("Before Update fetched Data :", response.data.data.event);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    if (eventId) {
      getEvent();
    } else {
      setIsLoading(false);
    }
  }, [eventId]);

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle empty string or undefined case
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return input string if not a valid date
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const formatTime = (dateTimeString) => {
    if (!dateTimeString) return ""; // Handle empty string or undefined case
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) return dateTimeString; // Return input string if not a valid date
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "Pm" : "Am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  /* const handleWinnersNameChange = (e, index) => {
    const { value } = e.target;
    const updatedWinners = [...formData.winners];
    updatedWinners[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      winners: updatedWinners,
    }));
  }; */

  /* const handleImageChange = (e, index, fieldName) => {
    const { files } = e.target; // Renamed 'name' to 'inputName'
    //const updatedImages = [...formData.images]; // Copy the existing images array from formData
    //const updatedWinnersImages = [...formData.winnersimages]; // Copy the existing winnersImages array from formData

    if (files && files.length > 0) {
      if (fieldName === "imageCover") {
        // Single image upload for imageCover
        const file = files[0]; // Get the first file from the array
        setFormData((prevFormData) => ({
          ...prevFormData,
          imageCover: file, // Set the file object for imageCover
        }));
      } else if (fieldName === `winnersimage${index}`) {
        const updatedWinnersImages = [...formData.winnersimages];
        updatedWinnersImages[index] = files[0]; // Update the image at the specified index
        setFormData((prevFormData) => ({
          ...prevFormData,
          winnersimages: updatedWinnersImages, // Update the winnersImages array in formData
        }));
      } else if (fieldName === "images") {
        // Array of images for images
        const updatedImages = [...formData.images];
        updatedImages[index] = files[0]; // Update the image at the specified index
        setFormData((prevFormData) => ({
          ...prevFormData,
          images: updatedImages, // Update the images array in formData
        }));
      }
    }
  };
 */
  /* const uploadImagesToCloudinary = async (images, type) => {
    const uploadedImageUrls = [];
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "EVENTS");
        formData.append("folder", "EventsImage");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dkppo2ktq/image/upload",
          formData
        );
        uploadedImageUrls.push(response.data.secure_url);
      }
    } catch (error) {
      console.error(`Error uploading ${type} image to Cloudinary:`, error);
      throw error;
    }
    return uploadedImageUrls;
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedFormData = { ...formData };

      // Check if new images are uploaded for imageCover
      /* if (formData.imageCover) {
        const uploadedImageUrls = await uploadImagesToCloudinary(
          [formData.imageCover],
          "imageCover"
        );
        updatedFormData.imageCover = uploadedImageUrls[0];
      }

      // Check if new images are uploaded for images
      if (formData.images && formData.images.length > 0) {
        const uploadedImageUrls = await uploadImagesToCloudinary(
          formData.images,
          "images"
        );
        updatedFormData.images = uploadedImageUrls;
      }

      // Check if new images are uploaded for winnersImages
      if (formData.winnersimages && formData.winnersimages.length > 0) {
        const uploadedImageUrls = await uploadImagesToCloudinary(
          formData.winnersimages,
          "winnersimages"
        );
        updatedFormData.winnersimages = uploadedImageUrls;
      } */

      // Make API call to update event data
      let updateResponse;
      if (eventId) {
        updateResponse = await axios.patch(
          `http://localhost:5173/api/v1/events/${eventId}`,
          updatedFormData
        );
      } else {
        updateResponse = await axios.post(
          "http://localhost:5173/api/v1/events",
          updatedFormData
        );
      }
      console.log("After Update the Data is : ", updateResponse.data);

      // Show success message
      setSuccessMessageVisible(true);

      // Redirect to single event page
      setTimeout(() => {
        navigate(`/event/${eventId || updateResponse.data.id}`);
      }, 500); // Redirect after 5 seconds (5000 milliseconds)
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  /* const handleCancel = () => {
    setTimeout(() => {
      navigate(`/event/${eventId}`);
    }, 500);
  }; */
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className={styles["form-container"]}>
      {successMessageVisible && (
        <div className={styles.successMessage}>Changes saved successfully!</div>
      )}
      {/* <h2>{eventId ? "Update Event" : "Upload Event"}</h2> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles["input - field"]}
            placeholder="Enter event name"
            value={
              formData.name !== undefined ? formData.name : eventData.name || ""
            }
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="Teamsize">Team Size</label>
          <input
            type="Number"
            id="Teamsize"
            name="Teamsize"
            className={styles["input - field"]}
            placeholder="Enter Team size "
            value={
              formData.Teamsize !== undefined
                ? formData.Teamsize
                : eventData.Teamsize || ""
            }
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">description : </label>
          <input
            type="text"
            id="description"
            name="description"
            className={styles["input - field"]}
            placeholder="Enter event Description"
            value={
              formData.description !== undefined
                ? formData.description
                : eventData.description || ""
            }
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="registrationdate">Registration Start Date : </label>
          <input
            type="date"
            id="registrationdate"
            name="registrationdate"
            className={styles["input - field"]}
            placeholder="Enter event name"
            value={
              formData.registrationdate !== undefined
                ? formatDate(formData.registrationdate)
                : formatDate(eventData.registrationdate)
            }
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="enddate">Registration Last Date</label>
          <input
            type="date"
            id="enddate"
            name="enddate"
            className={styles["input - field"]}
            placeholder="Enter event name"
            value={
              formData.enddate !== undefined
                ? formatDate(formData.enddate)
                : formatDate(eventData.enddate)
            }
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="eventdate">Event Date </label>
          <input
            type="date"
            id="eventdate"
            name="eventdate"
            className={styles["input - field"]}
            placeholder="Enter Event Date"
            value={
              formData.eventdate !== undefined
                ? formatDate(formData.eventdate)
                : formatDate(eventData.eventdate)
            }
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            className={styles["input - field"]}
            placeholder="Enter Event Location"
            value={
              formData.location !== undefined
                ? formatDate(formData.location)
                : formatDate(eventData.location)
            }
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="timing">Timing</label>
          <input
            type="text"
            id="timing"
            name="timing"
            className={styles["input - field"]}
            placeholder="Enter event name"
            value={
              formData.timing !== undefined
                ? formatTime(formData.timing)
                : formatTime(eventData.timing)
            }
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="price">Registration Fees</label>
          <input
            type="number"
            id="price"
            name="price"
            className={styles["input - field"]}
            placeholder="Enter event name"
            value={formData.price || eventData.price}
            onChange={handleChange}
          />
        </div>
        {/* 
        {[...Array(3)].map((_, index) => (
          <div key={index}>
            <label>
              Event Image {index + 1}:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
              />
            </label>
            {formData.images[index] && (
              <img
                src={URL.createObjectURL(formData.images[index])}
                alt={` ${index + 1}`}
                className={styles["image-preview"]}
              />
            )}
            {eventData.images[index] &&
              formData.images[index] === undefined && ( 
                <img
                  src={eventData.images[index]}
                  alt={`sdfes eers ${index + 1}`}
                  className={styles["image-preview"]}
                />
              )}
          </div>
        ))}
 */}

        {/*  <div >
          <label htmlFor="imageCover">Cover Image</label>
          <input
            type="file"
            id="imageCover"
            name="imageCover"
            className={styles["input - field"]}
            accept="image/*"
            onChange={handleImageChange}
          />
          {formData.imageCover && (
            <img
              src={URL.createObjectURL(formData.imageCover)}
              alt="Cov"
              className={styles["image-preview"]}
            />
          )}
          {eventData.imageCover && !formData.imageCover && (
            <img
              src={eventData.imageCover}
              alt="Cover"
              className={styles["image-preview"]}
            />
          )}
        </div> */}

        {/*  {[...Array(3)].map((_, index) => (
          <div key={index}>
            <label>
              Student Names({index + 1} Position):
              <input
                type="text"
                name={`winners${index}`}
                value={
                  formData.winners[index] || eventData.winners[index] || " "
                } // Use state variable as value
                onChange={(e) => handleWinnersNameChange(e, index)}
              />
            </label>
            <label>
              Students Winner Name {index + 1}:
              <input
                type="file"
                name={`winnersimage${index}`} 
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(e, index, `winnersimage${index}`)
                }
              />
            </label>
            {formData.winnersimages[index] && (
              <img
                src={URL.createObjectURL(formData.winnersimages[index])}
                alt={` ${index + 1}`}
                className={styles["image-preview"]}
              />
            )}
            {eventData.winnersimages[index] &&
              !formData.winnersimages[index] && ( 
                <img
                  src={eventData.winnersimages[index]}
                  alt={`sdfes eers ${index + 1}`}
                  className={styles["image-preview"]}
                />
              )}
          </div>
        ))}
 */}

        <div>
          <button
            type="submit"
            className={` ${styles["btn"]}  ${styles["btn--green"]} ${styles["span-all-rows"]}`}
          >
            Save
          </button>

          <Link to={`/event/${params.id}`}>
            <button
              className={` ${styles["btn"]}  ${styles["btn--green"]} ${styles["span-all-rows"]}`}
            >
              Cancel
            </button>
          </Link>
        </div>

        {/* <Link
          to={`/event/${eventId}`}
          //className={`${styles["btn"]} ${styles["btn--green"]} ${styles["span-all-rows"]}`}
        >
          Cancel
        </Link> */}
      </form>
    </div>
  );
}

export default EventForm;
