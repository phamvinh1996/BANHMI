import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormPage.css';

function FormPage() {
  const [formData, setFormData] = useState({ name: '', email: '', image: '' });
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/add-user', formData);
      setFormData({ name: '', email: '', image: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3002/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="heading">Form Thêm Sản Phẩm</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" placeholder="Tên sản phẩm" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

        <input type="text" name="image" placeholder="Link hình ảnh" value={formData.image} onChange={handleChange} required />
        <button type="submit">Thêm sản phẩm</button>
      </form>

      <h2 className="heading">Danh sách sản phẩm</h2>
      <div className="product-list">
        {users.map(user => (
          <div className="product-card" key={user.id}>
            <img src={user.image} alt={user.name} />
            <div className="product-info">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <p>ngày tạo: {user.name}</p>
            
              <p>ngày tạo: {user.date}</p>

              

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormPage;
