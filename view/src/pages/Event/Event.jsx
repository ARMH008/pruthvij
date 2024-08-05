/* function Event() {
  return (
    <div>
      <h1>Event Page</h1>
      <div className="mt-24 flex justify-start items-start text-[#1A0C40] flex-wrap card_list">
        <div className="relative bg-purple-100 h-[450px] w-[300px] shadow-xl rounded-lg transition-all duration-500 m-8 hover:translate-y-[-10px] hover:rotate-[-0.5deg]">
          <div className="font-medium px-5 py-1.5 w-max absolute left-0 right-0 mx-auto top-[-15px] border border-green-800 rounded-md text-black bg-lime-300 transition-all duration-500">
            EVENT ENDS SOON
          </div>
          <div className="image">
            <img
              className="rounded-t-lg w-[300px] h-[150px] shadow-lg"
              src="socialShareImage.img.a10b3fc00b8543dba5614ebf9623ffa3.png.avif"
              alt="Event"
            />
          </div>
          <div className="text-center mt-4">
            <div className="text-xl font-bold">SAS</div>
            <div className="text-lg font-medium">Hackathon</div>
          </div>
          <div className="p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            tenetur, culpa quidem, dolorum aperiam dolores optio sapiente beatae
            distinctio quia impedit nemo atque aliquid deleniti et dolore totam.
            Eius, pariatur?
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event; */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";

function Event() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [filterOption, setFilterOption] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/events");
      setEvents(response.data.data.events);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update time remaining for each event
      const updatedEvents = events.map((event) => ({
        ...event,
        timeRemaining: getTimeRemaining(event.eventdate),
      }));
      setEvents(updatedEvents);
    }, 1000);
    return () => clearInterval(interval);
  }, [events]);

  const getTimeRemaining = (eventDate) => {
    const currentTime = new Date().getTime();
    const eventTime = new Date(eventDate).getTime();
    const timeRemaining = eventTime - currentTime;
    if (timeRemaining <= 0) {
      return "No time remaining";
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      <h1>Event Page</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error.message}</p>}
      <div className="mt-24 flex justify-start items-start text-[#1A0C40] flex-wrap card_list">
        {!isLoading &&
          events.map((event) => (
            <Link to={`/event/${event.id}`} key={event.id}>
              <div
                key={event.id}
                className="relative bg-purple-100 h-[450px] w-[300px] shadow-xl rounded-lg transition-all duration-500 m-8 hover:translate-y-[-10px] hover:rotate-[-0.5deg]"
              >
                {/* <div className="font-medium px-5 py-1.5 w-max absolute left-0 right-0 mx-auto top-[-15px] border border-green-800 rounded-md text-black bg-lime-300 transition-all duration-500">
                REGISTRATION ENDS SOON
              </div> */}
                <div className="image">
                  <img
                    className="rounded-t-lg w-[300px] h-[150px] shadow-lg"
                    src={event.imageCover}
                    alt="Event"
                  />
                </div>
                {/* <div className="pl-5 pt-2.5 w-[300px] mx-auto text-2xl font-extrabold card-title">
                <span className="text-4xl ">{event.title}</span>
                <div className="text-lg font-medium">{event.subtitle}</div>
              </div> */}
                <div className="pl-5 pt-2.5 w-[300px] mx-auto text-2xl font-extrabold card-title">
                  {event.name}
                  <br />
                  {/* <span className="text-4xl">{event.name}</span> */}
                </div>
                <div className="pl-5 pt-2.5 pr-5 text-[#601F7E] card-description">
                  {event.description}
                </div>

                <div className="pl-5 pt-2.5 pr-5 text-[#601F7E] card-description">
                  College : K.K Wagh <br />
                  Location : {event.location} <br />
                  <span>
                    Registration Date :{" "}
                    {moment(event.registrationdate).format("DD-MM-YYYY ")}
                  </span>
                  <br />
                  <span>
                    Registration Last Date :{" "}
                    {moment(event.endDate).format("DD-MM-YYYY")}
                  </span>
                  <br />
                  <span>
                    Event Date : {moment(event.eventDate).format("DD-MM-YYYY")}
                  </span>
                  <br />
                  <span className="text-primary font-bold text-lg">
                    Time Remaining: {getTimeRemaining(event.eventdate)}
                  </span>
                </div>

                {/* <div className="p-4"></div> */}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Event;
