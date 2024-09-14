import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBook = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        published_date: '',
        cover_image: null, // For file input
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === 'cover_image') {
            setBook({ ...book, cover_image: e.target.files[0] });
        } else {
            setBook({ ...book, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', book.title);
        formData.append('author', book.author);
        formData.append('published_date', book.published_date);
        if (book.cover_image) {
            formData.append('cover_image', book.cover_image);
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/books/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            navigate('/');
        } catch (err) {
            setError("There was a problem adding the book.");
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add New Book</h2>
            {error && <p>{error}</p>}
            {loading && <p>Adding book...</p>}
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input 
                    type="text" 
                    name="title" 
                    value={book.title} 
                    onChange={handleChange} 
                    required
                /><br />

                <label>Author:</label>
                <input 
                    type="text" 
                    name="author" 
                    value={book.author} 
                    onChange={handleChange} 
                    required
                /><br />

                <label>Published Date:</label>
                <input 
                    type="date" 
                    name="published_date" 
                    value={book.published_date} 
                    onChange={handleChange}
                    required
                /><br />

                <label>Cover Image:</label>
                <input 
                    type="file" 
                    name="cover_image" 
                    onChange={handleChange}
                /><br />

                <button type="submit">Add Book</button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    );
};

export default AddBook;
