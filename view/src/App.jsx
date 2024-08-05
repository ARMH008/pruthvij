/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Event from "./pages/Event/Event";
import SignUp from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import Profile from "./pages/Profile/Profile";
import ClubMembers from "./pages/ClubMembers/ClubMembers";
import Layout from "./pages/Profile/Layout"; // Import your Layout component
import EditEvent from "./pages/EditEvent/EditEvent";
import Paperbase from "./pages/Profile/Paperbase";
import EditUsers from "./pages/EditUsers/EditUsers";
import EditAccount from "./components/EditProfile/EditAccount";
import EditUsersTable from "./pages/EditUsers/EditUsersTable";
import UpdatePassword from "./components/EditProfile/UpdatePassword";
import ErrorPage from "./pages/Error/PageNotFound";
import PageNotFound from "./pages/Error/PageNotFound";
import BookedEvent from "./pages/Booking/BookedEvent";
import UploadEvent from "./pages/Event/UploadEvent";
import Aboutus from "./pages/Aboutus/Aboutus";
import Footer from "./components/Footer/Footer";
import EventDeatils from "./pages/Event/EventDetails";
import { useState, useEffect } from "react";
import UploadWinners from "./pages/Event/UploadWinners";
import useUserData from "./components/UserData/UserData";
//import { ProfileNew } from "./pages/Profile/Dashboard/src/ProfileNew";

function App() {
  const { userData } = useUserData();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  /* useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5173/api/v1/users/user"
        );
        console.log("Data Event ", response.data.status);
        setUserData(response.data);

        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); */

  return (
    <>
      <BrowserRouter>
        <Navbar userData={userData} />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route
            path="/event/:id"
            element={<EventDeatils userData={userData} />}
          />
          <Route path="/event/uploadwinner/:id" element={<UploadWinners />} />
          <Route path="/clubmembers" element={<ClubMembers />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/profile" element={<Layout />}>
            {/* user Part */}
            <Route index element={<Profile />} />
            <Route path="bookedEvent" element={<BookedEvent />} />
            <Route path="editAccount" element={<EditAccount />} />

            <Route path="editEvent" element={<EditEvent />} />

            <Route path="uploadEvent" element={<UploadEvent />} />
            <Route path="updatePassword" element={<UpdatePassword />} />
            <Route path="editUsers" element={<EditUsersTable />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
