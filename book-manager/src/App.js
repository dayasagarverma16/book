import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import BookEdit from './components/BookEdit';
import AddBook from './components/AddBook';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/book/:id/edit" element={<BookEdit />} />
                <Route path="/add-book" element={<AddBook />} />
            </Routes>
        </Router>
    );
};

export default App;
