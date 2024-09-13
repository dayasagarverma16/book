import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [coverImage, setCoverImage] = useState(null);  // State for the cover image

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new FormData object to handle file uploads
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('published_date', publishedDate);
        if (coverImage) {
            formData.append('cover_image', coverImage);  // 'cover_image' should match the field in the backend model
        }

        try {
            // Send a POST request to the API with FormData
            const response = await axios.post('http://127.0.0.1:8000/api/books/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Important for file uploads
                },
            });
            alert("Book added successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("There was an error adding the book!", error);
        }
    };

    // Handle image file selection
    const handleImageChange = (e) => {
        setCoverImage(e.target.files[0]);
    };

    return (
        <div>
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
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
                        onChange={handleImageChange}  // Set the selected file in state
                        accept="image/*"  // Optional: Restrict to image files only
                    />
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;
