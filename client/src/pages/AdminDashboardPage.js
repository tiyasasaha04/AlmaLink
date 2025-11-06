import React, { useState, useEffect } from 'react';
import { getPendingUsers, approveUser, rejectUser } from '../services/userService';
import './AdminDashboard.css'; // Add styles below

const AdminDashboardPage = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      const { data } = await getPendingUsers();
      setPendingUsers(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch users. Are you an admin?');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveUser(id);
      // Remove user from the list
      setPendingUsers(pendingUsers.filter((user) => user._id !== id));
    } catch (err) {
      setError('Failed to approve user.');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectUser(id);
      // Remove user from the list
      setPendingUsers(pendingUsers.filter((user) => user._id !== id));
    } catch (err) {
      setError('Failed to reject user.');
    }
  };

  if (loading) {
    return <div>Loading pending users...</div>; // Replace with <Spinner />
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard - Pending Approvals</h2>
      {error && <div className="admin-error">{error}</div>}
      
      {pendingUsers.length === 0 ? (
        <p>No users pending approval.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Enrollment No.</th>
              <th>Registered On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.enrollmentNumber}</td>
                <td>{new Date(user.dateJoined).toLocaleDateString()}</td>
                <td className="admin-actions">
                  <button 
                    className="admin-btn approve" 
                    onClick={() => handleApprove(user._id)}
                  >
                    Approve
                  </button>
                  <button 
                    className="admin-btn reject" 
                    onClick={() => handleReject(user._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboardPage;