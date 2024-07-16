import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Style from './Home.module.css';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2);
  const [userImages, setUserImages] = useState({});
  const apiHeaders = {
    'app-id': '64fc4a747b1786417e354f31'
  };

  async function fetchUsers() {
    try {
      const response = await axios.get('https://dummyapi.io/data/v1/user', { headers: apiHeaders });
      setUsers(response.data.data);

      const images = {};
      response.data.data.forEach(user => {
        images[user.id] = user.picture;
      });
      setUserImages(images);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function deleteUser(userId) {
    try {
      await axios.delete(`https://dummyapi.io/data/v1/user/${userId}`, { headers: apiHeaders });
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const filteredUsers = currentUsers.filter(user => {
    return user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className={Style.customBox}>
        <form style={{ width: '85%' }} className="m-auto p-5" role="search">
          <input 
            className="form-control me-2" 
            type="search" 
            placeholder="Search by Name" 
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <button style={{ marginLeft: "80%", height: "8%" }} type="button" className="btn btn-primary">
          <Link className="text-center text-white text-decoration-none px-3 w-100" to="CreateACC">
            <i className="fa-solid fa-plus mx-1" />
            Add New Contact
          </Link>
        </button>

        <div className="container mt-5">
          {filteredUsers.map(user => (
            <div key={user.id} className="container justify-content-around mt-5 text-white d-flex">
              <img src={userImages[user.id]} alt={`${user.firstName} ${user.lastName}`} className="rounded-circle" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              <h3>{user.firstName} {user.lastName}</h3>
              <div className="ms-3">
                <div className={Style.icon}>
                  <Link to={`/EditUser/${user.id}`}>
                    <i className="fa-solid fa-pen-to-square fa-2x text-warning mx-3"></i>
                  </Link>
                  <i className="fa-solid fa-trash fa-2x text-danger" onClick={() => deleteUser(user.id)}></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        <nav className="mt-3">
          <ul className="pagination justify-content-center">
            {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(number => (
              <li key={number + 1} className="page-item">
                <button onClick={() => paginate(number + 1)} className="page-link">
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <hr className="text-white w-75 mx-auto" />
      </div>
    </>
  );
}
