import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    const deleteBook = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/books/${id}/`);
            setBooks(books.filter(book => book.id !== id));
        } catch (err) {
            setError("There was a problem deleting the book.");
        }
    };

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Book List</h2>
            <Link to="/add-book">
                <button>Add New Book</button>
            </Link>
            <ul style={styles.bookList}>
                {books.map((book) => (
                    <li key={book.id} style={styles.bookItem}>
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
                                    style={styles.bookImage}
                                />
                            </div>
                        )}
                        <button onClick={() => navigate(`/book/${book.id}`)}>View Details</button>
                        <button onClick={() => navigate(`/book/${book.id}/edit`)}>Edit</button>
                        <button onClick={() => deleteBook(book.id)} style={styles.deleteButton}>Delete</button>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    bookList: {
        listStyleType: 'none',
        padding: 0,
    },
    bookItem: {
        marginBottom: '20px',
    },
    bookImage: {
        marginTop: '10px',
    },
    deleteButton: {
        color: 'white',
        backgroundColor: 'red',
        marginLeft: '10px',
    },
};

export default BookList;
