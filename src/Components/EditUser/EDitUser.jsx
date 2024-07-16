import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Style from './EditUser.module.css';


export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const apiHeaders = {
    'app-id': '64fc4a747b1786417e354f31'
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`https://dummyapi.io/data/v1/user/${id}`, { headers: apiHeaders });
        setUser(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setPhone(response.data.phone);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUser();
  }, [id]);

  async function updateUser(e) {
    e.preventDefault();
    try {
      const updatedUser = { firstName, lastName, phone };
      await axios.put(`https://dummyapi.io/data/v1/user/${id}`, updatedUser, { headers: apiHeaders });
      navigate('/');
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  return <>
  <div className="container mt-5 p-5">
    <div className={Style.editContainer}>
      <h1 className="d-flex justify-content-center"> Edit User</h1>
      <form onSubmit={updateUser}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input 
            type="text" 
            className="form-control" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input 
            type="text" 
            className="form-control" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input 
            type="text" 
            className="form-control" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Update User</button>
      </form>
    </div>
      </div>

  </>

}
