import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListPage.css';

function ListPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3002/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/delete-user/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3002/update-user/${editingUser.id}`, editingUser);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="heading">Danh sách quản lý sản phẩm</h2>

      {editingUser && (
        <form onSubmit={handleUpdate} className="form">
          <input
            type="text"
            name="name"
            value={editingUser.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={editingUser.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            value={editingUser.image}
            onChange={handleChange}
            required
          />
          <button type="submit">Cập nhật</button>
        </form>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Ảnh</th>
            <th onClick={() => sortData('name')}>
              Tên {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => sortData('email')}>
              Email {sortConfig.key === 'email' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td> {/* Hiển thị số thứ tự */}
              <td>
                <img
                  src={user.image}
                  alt={user.name}
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>

              <td>{user.email}</td>

              <td>





              
                <button onClick={() => handleEdit(user)}>Sửa</button>
                <button onClick={() => handleDelete(user.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPage;
