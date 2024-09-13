import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();  // Replacing useHistory
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [coverImage, setCoverImage] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`);
                const bookData = response.data;
                setTitle(bookData.title);
                setAuthor(bookData.author);
                setPublishedDate(bookData.published_date);
            } catch (err) {
                console.error("Error fetching book details.");
            }
        };

        fetchBook();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('published_date', publishedDate);
        if (coverImage) {
            formData.append('cover_image', coverImage);
        }

        try {
            await axios.put(`http://127.0.0.1:8000/api/books/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("Book updated successfully!");
            navigate('/books');  // Replacing history.push with navigate
        } catch (error) {
            console.error("There was an error updating the book!", error);
        }
    };

    return (
        <div>
            <h2>Update Book</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Title:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input 
                        type="text" 
                        value={author} 
                        onChange={(e) => setAuthor(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Published Date:</label>
                    <input 
                        type="date" 
                        value={publishedDate} 
                        onChange={(e) => setPublishedDate(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Cover Image:</label>
                    <input 
                        type="file" 
                        onChange={(e) => setCoverImage(e.target.files[0])} 
                    />
                </div>
                <button type="submit">Update Book</button>
            </form>
        </div>
    );
};

export default UpdateBook;
