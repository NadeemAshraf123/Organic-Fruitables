import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import './Style.css';

type ContextType = { searchTerm: string };

const AuthenticatedUsers = () => {
  const { searchTerm } = useOutletContext<ContextType>();

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', password: '', role: "" });

  useEffect(() => {
    fetch('http://localhost:3000/fruitablesusers')
      .then((res) => res.json())
      .then((data) => {
        setAdmins(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching admin data:', err);
        setLoading(false);
      });
  }, []);

  const filteredAdmins = admins.filter((admin) => admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:3000/fruitablesusers/${id}`, {
        method: 'DELETE',
      });
      setAdmins(admins.filter((admin) => admin.id !== id));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEditClick = (admin) => {
    setEditUser(admin);
    setEditFormData({ name: admin.name, email: admin.email, password: admin.password, role: "" });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/fruitablesusers/${editUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });
      if (response.ok) {
        const updatedAdmins = admins.map((admin) =>
          admin.id === editUser.id ? { ...admin, ...editFormData } : admin
        );
        setAdmins(updatedAdmins);
        setEditUser(null);
        alert('User updated successfully');
      } else {
        alert('Update failed');
      }
    } catch (error) {
      console.error('Edit error:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading admins data...</p>;

  return (
    <div className="admin-table-container">
      <div className='wrapped-admin-table'>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdmins.map((admin) => (
            <tr key={admin.id}>
              <td>
                <div className='user-name-cell'>
                  <div className="profile-placeholder">{admin.name.charAt(0)}</div>
                  <span className='admin-name'> {admin.name} </span>
                </div>
              </td>
              <td>{admin.id}</td>
              <td>{admin.email}</td>
              <td>{admin.password}</td>
              <td>{admin.role}</td>
              <td className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(admin)}
                  aria-label="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(admin.id)}
                  aria-label="Delete"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div> 

      {editUser && (
        <div className="edit-popup">
          <h3>Edit User</h3>
          <form onSubmit={handleEditSubmit}>
            <input name="name" value={editFormData.name} onChange={handleFormChange} required />
            <input name="email" value={editFormData.email} onChange={handleFormChange} required />
            <input name="password" value={editFormData.password} onChange={handleFormChange} required />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditUser(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuthenticatedUsers;