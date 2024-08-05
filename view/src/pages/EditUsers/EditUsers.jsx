/* eslint-disable no-unused-vars */
import * as React from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import "./EditUsers.css"; // Import the CSS file

const EditUsers = () => {
  const [userRoles, setUserRoles] = useState({}); // Store selected roles for each user
  const [allUser, setAllUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async () => {
    try {
      let response;
      if (search) {
        response = await axios.get(
          `http://localhost:5173/api/v1/users/searchuser?name=${search}`
        );
      } else {
        response = await axios.get(`http://localhost:5173/api/v1/users`);
      }
      setAllUser(response.data.data.users);
      console.log("Fetching all user Data", response.data.data.users);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5173/api/v1/users");
        console.log("User Fetching daat", response.data.data.data);
        setUsers(response.data.data.data);
      } catch (err) {
        console.error("Erroe is fetching datausers", err);
      }
    };
    fetchData();
  }, []);
  const handleSelectChange = (userId, e) => {
    const { value } = e.target;
    setUserRoles((prevUserRoles) => ({
      ...prevUserRoles,
      [userId]: value, // Update selected role for the user
    }));
  };

  const handleUserUpdate = async (user) => {
    try {
      console.log("handle userUpdate ", user._id);
      const userData = user;
      userData.role = userRoles[user._id];
      console.log("Before Updating the userData ", userData.role);
      console.log("user role userID ", userRoles[user._id]);
      const response = await axios.patch(
        `http://localhost:5173/api/v1/users/${user._id}`,
        userData
      );
      console.log("Updated user:", response.data.data.data);
      // Update the allUser state after successful update
      setAllUser((prevUsers) =>
        prevUsers.map((u) =>
          u._id === user._id ? { ...u, role: userRoles[user._id] } : u
        )
      );
    } catch (error) {
      console.log("Updating User info Error", error);
    }
  };

  const handleUserDelete = async (user) => {
    try {
      const response = await axios.delete(
        `http://localhost:5173/api/v1/users/${user._id}`
      );
      console.log("Successfully deleted the user ", response);
      // Remove the deleted user from allUser state
      const userId = user._id;
      setAllUser((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
    } catch (error) {
      console.log("Deleting User Error", error);
    }
  };

  return (
    <div className="main">
      <div className="max-w-md mx-auto">
        <form
          className="max-w-md mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search User..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="usercontainer">
        {(searchPerformed && allUser.length === 0) ||
        (!searchPerformed && allUser.length === 0)
          ? users.map((user) => (
              <div
                key={user._id}
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "",
                }}
              >
                <div className="card">
                  <button
                    className="mail"
                    onClick={() => handleUserDelete(user)}
                  >
                    <RiDeleteBin6Line
                      style={{ width: 20, height: 16, x: 2, y: 4, rx: 2 }}
                    />
                  </button>

                  <div className="profile-pic">
                    <img src={user.photo} alt="" />
                  </div>
                  <div className="bottom">
                    <div className="content">
                      <span className="name">Name : {user.name}</span>
                      <span className="name">Email : {user.email}</span>
                      <span className="name">Role : {user.role}</span>
                    </div>
                    <div className="bottom-bottom">
                      <div>
                        <label htmlFor={`options-${user._id}`}>
                          Select an option:
                        </label>
                        <select
                          id={`options-${user._id}`}
                          value={userRoles[user._id] || user.role}
                          onChange={(e) => handleSelectChange(user._id, e)}
                          className=""
                        >
                          <option value="">Select Role</option>
                          <option value="user">User</option>
                          <option value="club">Club</option>
                          <option value="teacher">Teacher</option>
                          <option value="student">Student</option>
                          <option value="eventhandler">Event Handler</option>
                          <option value="admin">Admin</option>
                          <option value="President">President</option>
                          <option value="Vice President">Vice President</option>
                          <option value="Alumni Coordinator">
                            Alumni Coordinator
                          </option>
                          <option value="Placement Coordinator">
                            Placement Coordinator
                          </option>
                          <option value="Website/ERP coordinator">
                            Website/ERP coordinator
                          </option>
                          <option value="Workshop/Expert Talk coordinator">
                            Workshop/Expert Talk coordinator
                          </option>
                          <option value="Discipline Committee">
                            Discipline Committee
                          </option>
                          <option value="Creatives">Creatives</option>
                          <option value="Secretary">Secretary</option>
                          <option value="Treasurer">Treasurer</option>
                          <option value="Core Members">Core Members</option>
                        </select>
                        <p>Selected Role : {userRoles[user._id]}</p>
                      </div>
                      <button
                        className="button"
                        onClick={() => handleUserUpdate(user)}
                      >
                        Update
                      </button>
                      <button
                        className="button"
                        onClick={() => handleUserDelete(user)}
                      >
                        <RiDeleteBin6Line
                          style={{
                            width: 16,
                            height: 16,
                            x: 2,
                            y: 4,
                            rx: 2,
                            padding: 1,
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : allUser.map((user) => (
              <div
                key={user._id}
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "",
                }}
              >
                <div className="card">
                  <button
                    className="mail"
                    onClick={() => handleUserDelete(user)}
                  >
                    <RiDeleteBin6Line
                      style={{ width: 20, height: 16, x: 2, y: 4, rx: 2 }}
                    />
                  </button>

                  <div className="profile-pic">
                    <img src="../../public/download.png" alt="" />
                  </div>
                  <div className="bottom">
                    <div className="content">
                      <span className="name">Name : {user.name}</span>
                      <span className="name">Email : {user.email}</span>
                      <span className="name">Role : {user.role}</span>
                    </div>
                    <div className="bottom-bottom">
                      <div>
                        <label htmlFor={`options-${user._id}`}>
                          Select an option:
                        </label>
                        <select
                          id={`options-${user._id}`}
                          value={userRoles[user._id] || user.role}
                          onChange={(e) => handleSelectChange(user._id, e)}
                          className=""
                        >
                          <option value="">Select Role</option>
                          <option value="user">User</option>
                          <option value="club">Club</option>
                          <option value="teacher">Teacher</option>
                          <option value="student">Student</option>
                          <option value="eventhandler">Event Handler</option>
                          <option value="admin">Admin</option>
                          <option value="President">President</option>
                          <option value="Vice President">Vice President</option>
                          <option value="Alumni Coordinator">
                            Alumni Coordinator
                          </option>
                          <option value="Placement Coordinator">
                            Placement Coordinator
                          </option>
                          <option value="Website/ERP coordinator">
                            Website/ERP coordinator
                          </option>
                          <option value="Workshop/Expert Talk coordinator">
                            Workshop/Expert Talk coordinator
                          </option>
                          <option value="Discipline Committee">
                            Discipline Committee
                          </option>
                          <option value="Creatives">Creatives</option>
                          <option value="Secretary">Secretary</option>
                          <option value="Treasurer">Treasurer</option>
                          <option value="Core Members">Core Members</option>
                        </select>
                        <p>Selected Role : {userRoles[user._id]}</p>
                      </div>
                      <button
                        className="button"
                        onClick={() => handleUserUpdate(user)}
                      >
                        Update
                      </button>
                      <button
                        className="button"
                        onClick={() => handleUserDelete(user)}
                      >
                        <RiDeleteBin6Line
                          style={{
                            width: 16,
                            height: 16,
                            x: 2,
                            y: 4,
                            rx: 2,
                            padding: 1,
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* <div className="usercontainer">
        {search && allUser.length === 0
          ? !searchPerformed &&
            users.map((user) => (
              <div
                key={user._id}
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "",
                }}
              >
                <div className="card">
                  <button
                    className="mail"
                    onClick={() => handleUserDelete(user)}
                  >
                    <RiDeleteBin6Line
                      style={{ width: 20, height: 16, x: 2, y: 4, rx: 2 }}
                    />
                  </button>

                  <div className="profile-pic">
                    <img src="../../public/download.png" alt="" />
                  </div>
                  <div className="bottom">
                    <div className="content">
                      <span className="name">Name : {user.name}</span>
                      <span className="name">Email : {user.email}</span>
                      <span className="name">Role : {user.role}</span>
                    </div>
                    <div className="bottom-bottom">
                      <div>
                        <label htmlFor={`options-${user._id}`}>
                          Select an option:
                        </label>
                        <select
                          id={`options-${user._id}`}
                          value={userRoles[user._id] || user.role}
                          onChange={(e) => handleSelectChange(user._id, e)}
                          className=""
                        >
                          <option value="">Select Role</option>
                          <option value="user">User</option>
                          <option value="club">Club</option>
                          <option value="teacher">Teacher</option>
                          <option value="student">Student</option>
                          <option value="eventhandler">Event Handler</option>
                          <option value="admin">Admin</option>
                          <option value="President">President</option>
                          <option value="Vice President">Vice President</option>
                          <option value="Alumni Coordinator">
                            Alumni Coordinator
                          </option>
                          <option value="Placement Coordinator">
                            Placement Coordinator
                          </option>
                          <option value="Website/ERP coordinator">
                            Website/ERP coordinator
                          </option>
                          <option value="Workshop/Expert Talk coordinator">
                            Workshop/Expert Talk coordinator
                          </option>
                          <option value="Discipline Committee">
                            Discipline Committee
                          </option>
                          <option value="Creatives">Creatives</option>
                          <option value="Secretary">Secretary</option>
                          <option value="Treasurer">Treasurer</option>
                          <option value="Core Members">Core Members</option>
                        </select>
                        <p>Selected Role : {userRoles[user._id]}</p>
                      </div>
                      <button
                        className="button"
                        onClick={() => handleUserUpdate(user)}
                      >
                        Update
                      </button>
                      <button
                        className="button"
                        onClick={() => handleUserDelete(user)}
                      >
                        <RiDeleteBin6Line
                          style={{
                            width: 16,
                            height: 16,
                            x: 2,
                            y: 4,
                            rx: 2,
                            padding: 1,
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : 

          allUser.length === 0 && !searchPerformed
          ? users.map((user) => (
              <div
                key={user._id}
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "",
                }}
              >
                <div className="card">
                  <button
                    className="mail"
                    onClick={() => handleUserDelete(user)}
                  >
                    <RiDeleteBin6Line
                      style={{ width: 20, height: 16, x: 2, y: 4, rx: 2 }}
                    />
                  </button>

                  <div className="profile-pic">
                    <img src="../../public/download.png" alt="" />
                  </div>
                  <div className="bottom">
                    <div className="content">
                      <span className="name">Name : {user.name}</span>
                      <span className="name">Email : {user.email}</span>
                      <span className="name">Role : {user.role}</span>
                    </div>
                    <div className="bottom-bottom">
                      <div>
                        <label htmlFor={`options-${user._id}`}>
                          Select an option:
                        </label>
                        <select
                          id={`options-${user._id}`}
                          value={userRoles[user._id] || user.role}
                          onChange={(e) => handleSelectChange(user._id, e)}
                          className=""
                        >
                          <option value="">Select Role</option>
                          <option value="user">User</option>
                          <option value="club">Club</option>
                          <option value="teacher">Teacher</option>
                          <option value="student">Student</option>
                          <option value="eventhandler">Event Handler</option>
                          <option value="admin">Admin</option>
                          <option value="President">President</option>
                          <option value="Vice President">Vice President</option>
                          <option value="Alumni Coordinator">
                            Alumni Coordinator
                          </option>
                          <option value="Placement Coordinator">
                            Placement Coordinator
                          </option>
                          <option value="Website/ERP coordinator">
                            Website/ERP coordinator
                          </option>
                          <option value="Workshop/Expert Talk coordinator">
                            Workshop/Expert Talk coordinator
                          </option>
                          <option value="Discipline Committee">
                            Discipline Committee
                          </option>
                          <option value="Creatives">Creatives</option>
                          <option value="Secretary">Secretary</option>
                          <option value="Treasurer">Treasurer</option>
                          <option value="Core Members">Core Members</option>
                        </select>
                        <p>Selected Role : {userRoles[user._id]}</p>
                      </div>
                      <button
                        className="button"
                        onClick={() => handleUserUpdate(user)}
                      >
                        Update
                      </button>
                      <button
                        className="button"
                        onClick={() => handleUserDelete(user)}
                      >
                        <RiDeleteBin6Line
                          style={{
                            width: 16,
                            height: 16,
                            x: 2,
                            y: 4,
                            rx: 2,
                            padding: 1,
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : allUser.map((user) => (
              <div
                key={user._id}
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "",
                }}
              >
                <div className="card">
                  <button
                    className="mail"
                    onClick={() => handleUserDelete(user)}
                  >
                    <RiDeleteBin6Line
                      style={{ width: 20, height: 16, x: 2, y: 4, rx: 2 }}
                    />
                  </button>

                  <div className="profile-pic">
                    <img src="../../public/download.png" alt="" />
                  </div>
                  <div className="bottom">
                    <div className="content">
                      <span className="name">Name : {user.name}</span>
                      <span className="name">Email : {user.email}</span>
                      <span className="name">Role : {user.role}</span>
                    </div>
                    <div className="bottom-bottom">
                      <div>
                        <label htmlFor={`options-${user._id}`}>
                          Select an option:
                        </label>
                        <select
                          id={`options-${user._id}`}
                          value={userRoles[user._id] || user.role}
                          onChange={(e) => handleSelectChange(user._id, e)}
                          className=""
                        >
                          <option value="">Select Role</option>
                          <option value="user">User</option>
                          <option value="club">Club</option>
                          <option value="teacher">Teacher</option>
                          <option value="student">Student</option>
                          <option value="eventhandler">Event Handler</option>
                          <option value="admin">Admin</option>
                          <option value="President">President</option>
                          <option value="Vice President">Vice President</option>
                          <option value="Alumni Coordinator">
                            Alumni Coordinator
                          </option>
                          <option value="Placement Coordinator">
                            Placement Coordinator
                          </option>
                          <option value="Website/ERP coordinator">
                            Website/ERP coordinator
                          </option>
                          <option value="Workshop/Expert Talk coordinator">
                            Workshop/Expert Talk coordinator
                          </option>
                          <option value="Discipline Committee">
                            Discipline Committee
                          </option>
                          <option value="Creatives">Creatives</option>
                          <option value="Secretary">Secretary</option>
                          <option value="Treasurer">Treasurer</option>
                          <option value="Core Members">Core Members</option>
                        </select>
                        <p>Selected Role : {userRoles[user._id]}</p>
                      </div>
                      <button
                        className="button"
                        onClick={() => handleUserUpdate(user)}
                      >
                        Update
                      </button>
                      <button
                        className="button"
                        onClick={() => handleUserDelete(user)}
                      >
                        <RiDeleteBin6Line
                          style={{
                            width: 16,
                            height: 16,
                            x: 2,
                            y: 4,
                            rx: 2,
                            padding: 1,
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div> */}
    </div>
  );
};

export default EditUsers;
