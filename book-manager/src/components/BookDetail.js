import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`);
                setBook(response.data);
                setLoading(false);
            } catch (err) {
                setError("There was a problem fetching the book details.");
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) return <p>Loading book details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {book && (
                <div>
                    <h2>{book.title}</h2>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Published Date:</strong> {book.published_date}</p>
                    {book.cover_image && (
                        <div>
                            <strong>Cover Image:</strong><br />
                            <img 
                                src={`http://127.0.0.1:8000${book.cover_image}`} 
                                alt={book.title} 
                                width="200"
                                style={{ marginTop: '10px' }}
                            />
                        </div>
                    )}
                    <button onClick={() => navigate(`/book/${id}/edit`)}>Edit</button>
                    <button onClick={() => navigate(-1)}>Back</button>
                </div>
            )}
        </div>
    );
};

export default BookDetail;
