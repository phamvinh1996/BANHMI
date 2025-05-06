const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'qlyhang'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Thêm người dùng
app.post('/add-user', (req, res) => {
  const { name, email, image} = req.body;
  const sql = 'INSERT INTO hangonline (name, email,image) VALUES (?,?,?)';
  db.query(sql, [name,email,image], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Nhập dữ liệu thành công', id: result.insertId });
  });
});

// Cập nhật người dùng
app.put('/update-user/:id', (req, res) => {
  const { id } = req.params;
  const { name, email,image } = req.body;
  const sql = 'UPDATE hangonline SET name = ?, email = ?, image = ? WHERE id = ?';
  db.query(sql, [name, email,image,id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({message: 'User updated successfully'  });
});
});
// Xóa người dùng
app.delete('/delete-user/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM hangonline WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'User deleted' });
  });
});























// Lấy danh sách người dùng
app.get('/users', (req, res) => {
  db.query('SELECT * FROM hangonline ORDER BY id,name DESC ',  (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

app.listen(3002, () => {
  console.log('Server running on port 3002');
})
