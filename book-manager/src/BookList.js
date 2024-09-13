import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/books/');
                setBooks(response.data);
                setLoading(false);
            } catch (err) {
                setError("There was a problem fetching the books.");
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id} style={{ marginBottom: '20px' }}>
                        <strong>Title:</strong> {book.title}<br />
                        <strong>Author:</strong> {book.author}<br />
                        <strong>Published Date:</strong> {book.published_date}<br />
                        {book.cover_image && (
                            <div>
                                <strong>Cover Image:</strong><br />
                                <img 
                                    src={`http://127.0.0.1:8000${book.cover_image}`} 
                                    alt={book.title} 
                                    width="150"
                                    style={{ marginTop: '10px' }}
                                />
                            </div>
                        )}
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
