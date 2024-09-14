import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookEdit = () => {
    const { id } = useParams();
    const [book, setBook] = useState({
        title: '',
        author: '',
        published_date: '',
        cover_image: null  // Initially, no file is selected
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`);
                setBook({
                    ...response.data,
                    cover_image: null // Prevent fetching image as File
                });
            } catch (err) {
                setError("There was a problem fetching the book details.");
                console.error("Error fetching book details:", err.response || err);
            }
        };

        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleFileChange = (e) => {
        setBook({ ...book, cover_image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Use FormData to handle file uploads
        const formData = new FormData();
        formData.append('title', book.title);
        formData.append('author', book.author);
        formData.append('published_date', book.published_date);

        // Only append cover_image if a new file has been selected
        if (book.cover_image) {
            formData.append('cover_image', book.cover_image);
        }

        try {
            await axios.put(`http://127.0.0.1:8000/api/books/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate(`/book/${id}`);
        } catch (err) {
            setError("There was a problem updating the book.");
            console.error("Error updating book:", err.response || err);
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
                    accept="image/*"
                    onChange={handleFileChange}
                /><br />
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    );
};

export default BookEdit;
