/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import "./EventDetails.css";
function EventDeatils({ userData }) {
  const [eventData, setEventData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [userData, setuserData] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getSingleEvent = async () => {
      // Function body remains the same
      axios
        .get(`api/v1/events/${params.id}`)
        .then((response) => {
          console.log(response.data);
          setEventData(response.data.data.event);

          setIsLoading(false);
          //const event_id = response.data.data.event._id;
          //console.log("Event id : ", response.data.data.event._id);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          console.log("Axios error details:", error.response);
          setError(error);
          setIsLoading(false);
        });
    };

    getSingleEvent(); // Call getSingleEvent inside useEffect
  }, [params.id]);

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5173/api/v1/events/${params.id}/generate-pdf`,
        {
          responseType: "blob",
        }
      );

      // Create a blob object from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a temporary URL for the blob object
      const url = window.URL.createObjectURL(blob);

      // Create a link element and simulate a click to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "event_report.pdf");
      document.body.appendChild(link);
      link.click();

      // Clean up by revoking the temporary URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Construct the formatted date string
    const formattedDate = `${day}th ${monthNames[monthIndex]} `;

    return formattedDate;
  };

  // Usage example:
  const formattedEventDate = formatDate(eventData.eventdate);
  console.log(formattedEventDate); // Output: "29th February 2024"
  const formattedRegiterDate = formatDate(eventData.registrationdate);
  console.log(formattedEventDate); // Output: "29th February 2024"
  const formattedEndDate = formatDate(eventData.enddate);
  console.log(formattedEventDate); // Output: "29th February 2024"

  /* const formattedRegiterDate = new Date(eventData.registrationdate)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const formattedEndDate = new Date(eventData.enddate)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const formattedEventDate = new Date(eventData.eventdate)
    .toISOString()
    .slice(0, 19)
    .replace("T", " "); */

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error:", error);
    console.log("event data id ", eventData._id);
    return <div>Something went wrong</div>;
  }
  return (
    <>
      <div className="cover">
        {/*  <img src={eventData.imageCover} alt="" />{" "} */}
      </div>
      <div className="main">
        <div className="details">
          <h1 className="name">{eventData.name}</h1>
          <p className="description">{eventData.description}</p>
          <button className="register">Register</button>
          {(userData?.user?.role === "admin" ||
            userData?.user?.role === "teacher") && (
            <button
              className="register"
              onClick={handleDownloadPDF}
              /* onClick={() => {
                navigate(`/event/uploadwinner/${eventData._id}`);
              }} */
            >
              Download Pdf
            </button>
          )}

          <button
            className="register"
            onClick={handleDownloadPDF}
            /* onClick={() => {
                navigate(`/event/uploadwinner/${eventData._id}`);
              }} */
          >
            Download Pdf
          </button>
        </div>
        <div className="timer">
          <p className="date">Event on {formattedEventDate} </p>
          <div>
            <p className="time-title">
              <span>Days</span>
              <span>Hours</span>
              <span>Minutes</span>
            </p>
            <p className="time-left">
              <span>12</span> : <span>07</span> : <span>41</span>
            </p>
          </div>
        </div>
      </div>
      <div className="event">
        <div className="event-child">
          <h1>Event Details</h1>
          <div className="event-card">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-glyphs/30/conference-call--v1.png"
              alt="conference-call--v1"
            />
            <p className="event-card-title">Team Size</p>
            <p className="event-card-detail">{eventData.Teamsize}</p>
          </div>
          <div className="event-card">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-glyphs/30/marker--v1.png"
              alt="marker--v1"
            />
            <p className="event-card-title">Location</p>
            <p className="event-card-detail"> {eventData.location}</p>
          </div>
          <div className="event-card">
            <img
              width="64"
              height="64"
              src="https://img.icons8.com/glyph-neue/64/overtime.png"
              alt="overtime"
            />
            <p className="event-card-title">Time</p>
            <p className="event-card-detail">9:00 AM</p>
          </div>
          <div className="event-card">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/average-2.png"
              alt="average-2"
            />
            <p className="event-card-title">Entry Fees</p>
            <p className="event-card-detail">Rs {eventData.price}/-</p>
          </div>

          {/*  */}
        </div>
        <div className="contact">
          For more details contact us +91 8888-46902
        </div>
      </div>
      <h1 className="winner-title">Legacy of Champion's 2k23</h1>
      <div className="winners">
        {/* {eventData.images &&
          eventData.images.map((img, index) => (
            <div key={index}>
              <img src={img} alt="" />
              <p className="winner-position">1st Position</p>
              <p className="winner-description">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
                magni vero distinctio nihil ipsum accusantium ducimus inventore,
                libero ab mollitia quos amet deleniti, optio ullam? Aut
                laboriosam deserunt tempora eveniet?
              </p>
            </div>
          ))} */}
        <div>
          <img src={eventData.images[0]} alt="" />
          <p className="winner-position">1st Position</p>
          <p className="winner-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
            magni vero distinctio nihil ipsum accusantium ducimus inventore,
            libero ab mollitia quos amet deleniti, optio ullam? Aut laboriosam
            deserunt tempora eveniet?
          </p>
        </div>
        <div>
          <img src={eventData.images[1]} alt="" />
          <p className="winner-position">2nd Position</p>
          <p className="winner-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus ab eligendi reprehenderit laboriosam quas quam
            aspernatur exercitationem corrupti reiciendis, doloribus facere
            repudiandae, eaque perferendis! Asperiores fuga blanditiis delectus
            quibusdam quia!
          </p>
        </div>
        <div>
          <img src={eventData.images[2]} alt="" />
          <p className="winner-position">3rd Position </p>
          <p className="winner-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim,
            adipisci nemo sunt tempore dolores fuga quibusdam praesentium harum
            ipsa corrupti, tenetur, voluptate placeat quisquam expedita beatae
            ipsam repudiandae sed non!
          </p>
        </div>
      </div>
      <button
        className="register"
        onClick={() => {
          navigate(`/event/uploadwinner/${eventData._id}`);
        }}
      >
        Upload Winners
      </button>
      {/* {(userData?.user?.role === "admin" ||
        userData?.user?.role === "teacher") && (
        <button
          className="register"
          onClick={() => {
            navigate(`/event/uploadwinner/${eventData._id}`);
          }}
        >
          Upload Winners
        </button>
      )} */}
    </>
  );
}

export default EventDeatils;
