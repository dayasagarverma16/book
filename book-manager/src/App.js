
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';  // Link to the CSS file
import AddBook from './AddBook';
import BookList from './BookList';
import UpdateBook from './UpdateBook';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Book Manager</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/add-book" className="nav-item">Add Book</Link>
              </li>
              <li>
                <Link to="/books" className="nav-item">Book List</Link>
              </li>
              <li>
                <Link to="/up-books" className="nav-item">Update Book</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/up-books" element={<UpdateBook/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
