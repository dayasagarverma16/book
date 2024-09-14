import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookEdit = () => {
    const { id } = useParams();
    const [book, setBook] = useState({
        title: '',
        author: '',
        published_date: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`);
                setBook(response.data);
            } catch (err) {
                setError("There was a problem fetching the book details.");
            }
        };

        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/books/${id}/`, book);
            navigate(`/book/${id}`);
        } catch (err) {
            setError("There was a problem updating the book.");
        }
    };

    return (
        <div>
            <h2>Edit Book</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input 
                    type="text" 
                    name="title" 
                    value={book.title} 
                    onChange={handleChange}
                /><br />
                <label>Author:</label>
                <input 
                    type="text" 
                    name="author" 
                    value={book.author} 
                    onChange={handleChange}
                /><br />
                <label>Published Date:</label>
                <input 
                    type="date" 
                    name="published_date" 
                    value={book.published_date} 
                    onChange={handleChange}
                /><br />
                <button type="submit">Save Changes</button>
                <button onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    );
};

export default BookEdit;
