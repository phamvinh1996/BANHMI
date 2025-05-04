import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormPage from './FormPage';
import ListPage from './ListPage';


function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <Link to="/">Form</Link> | 
          <Link to="/list">Danh sách</Link>
        </nav>

        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
