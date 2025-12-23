import React, { useCallback } from 'react';
import { useGet } from 'react-api-weaver';
import { getUsers } from '../api/user-api/api';
import '../styles/UserList.css';

function UserList() {
  // Memoize the API function to prevent infinite loops
  const fetchUsers = useCallback(() => getUsers(), []);
  
  const { data: users, loading, error, refetch } = useGet(
    fetchUsers,
    {
      cache: false
    }
  );
  

  if (loading) {
    return (
      <div className="user-list-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list-container">
        <div className="error">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={refetch} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>User List</h2>
        <p className="user-count">Total Users: {users?.length}</p>
      </div>
      
      {users?.length === 0 ? (
        <div className="empty-state">
          <p>No users found</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id}>
                  <td className="name-cell">
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.gender}</td>
                  <td>{user.age}</td>
                  <td>{user.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;
