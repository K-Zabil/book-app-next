"use client";

import { useEffect, useState } from 'react';
import { Book, Category } from '@/entities/book'; // Assuming the Category type is imported
import axios from 'axios';

export default function AllBooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchBooks() {
            const res = await axios.get("http://localhost:3000/api");
            setBooks(res.data);
            setLoading(false);
        }
        fetchBooks();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>All Books</h1>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const form = new FormData(e.target as HTMLFormElement);
                    const title = form.get('title') as string;
                    const author = form.get('author') as string;
                    const category = form.get('category') as Category;
                    const publicationDate = form.get('publicationDate') as string;
                    const pages = parseInt(form.get('pages') as string, 10);
                    const isbn = form.get('isbn') as string;
                    const language = form.get('language') as string;
                    const price = parseFloat(form.get('price') as string);
                    const rating = parseFloat(form.get('rating') as string);
                    const description = form.get('description') as string;
                    const publisher = form.get('publisher') as string;

                    const res = await fetch('/api/books', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            title,
                            author,
                            category,
                            publicationDate,
                            pages,
                            isbn,
                            language,
                            price,
                            rating,
                            description,
                            publisher,
                        }),
                    });

                    const newBook = await res.json();
                    setBooks([...books, newBook]);
                }}
            >
                <input name="title" type="text" placeholder="Book Title" required />
                <input name="author" type="text" placeholder="Author" required />
                <input name="category" type="text" placeholder="Category" required />
                <input name="publicationDate" type="date" placeholder="Publication Date" required />
                <input name="pages" type="number" placeholder="Pages" required />
                <input name="isbn" type="text" placeholder="ISBN" required />
                <input name="language" type="text" placeholder="Language" required />
                <input name="price" type="number" step="0.01" placeholder="Price" required />
                <input name="rating" type="number" step="0.1" min="0" max="5" placeholder="Rating" required />
                <textarea name="description" placeholder="Description" required></textarea>
                <input name="publisher" type="text" placeholder="Publisher" required />
                <button type="submit">Add Book</button>
            </form>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.title} - {book.author} ({book.category}) - {book.price}$
                    </li>
                ))}
            </ul>
        </div>
    );
};