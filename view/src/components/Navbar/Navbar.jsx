/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import axios from "axios";

function Navbar({ userData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  console.log(userData);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      // Check if viewport width is less than or equal to 768px (considered as mobile view)
      setIsMobileView(window.innerWidth <= 768);
    };

    // Call handleResize initially and add event listener for resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Make a request to your logout API endpoint
      await axios.get("api/v1/users/logout");
      // Optionally, you can perform additional actions after successful logout
      // For example, redirect the user to the login page
      // window.location.href = '/login'; // Redirect example
      window.location.reload("/");

      console.log("Logout Successfully ");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white z-10">
      <nav className="flex justify-between items-center w-[92%] mx-auto ">
        <div>
          <img
            className="w-16 cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/512/5968/5968204.png"
            alt="..."
          />
        </div>
        <div
          /* className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[50vh] left-0 ${
            menuOpen ? "top-[9%] z-10" : "top-[-100%]"
          } md:w-auto w-full flex items-center px-5`} */
          className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[50vh] left-0 ${
            menuOpen ? "top-[9%] z-10" : "top-[-100%]"
          } md:w-auto w-full flex items-start md:items-center px-5`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <Link className="hover:text-gray-500" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/event">
                Event
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/clubmembers">
                Club Members
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/aboutus">
                About us
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          {/* <Link
            className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
            to="/signin"
          >
            Sign in
          </Link>
          <Link
            className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
            to="/signup"
          >
            Sign up
          </Link>
          <Link
            className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
            onClick={handleLogout}
          >
            Logout
          </Link>

          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Link
            className="hover:text-gray-500"
            //className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
            to="/profile"
          >
            Profile
          </Link> */}
          {userData?.status === "success" ? (
            <>
              <Link
                className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
                onClick={handleLogout}
              >
                Logout
              </Link>

              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Link
                className="hover:text-gray-500"
                //className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
                to="/profile"
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
                to="/signin"
              >
                Sign in
              </Link>
              <Link
                className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
                to="/signup"
              >
                Sign up
              </Link>
            </>
          )}

          {/*  <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
            Sign in
          </button> */}

          {isMobileView && (
            <MenuIcon
              onClick={toggleMenu}
              className="text-3xl cursor-pointer md:hidden"
              /* name={menuOpen ? "close" : "menu"} */
            />
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
