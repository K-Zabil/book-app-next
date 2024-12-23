"use client";

import { use, useEffect, useState } from 'react';
import { Book } from '@/entities/book';
import axios from 'axios';

export default function BooksPageByCategory({ params }: { params: Promise<{ category: string }> }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { category } = use(params);
    
    useEffect(() => {
        if (!category) return;
        
        async function fetchBooksByCategory() {
            try {
                const res = await axios.get(`http://localhost:3000/api/${category}`);
                setBooks(res.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching books');
                setLoading(false);
            }
        }

        fetchBooksByCategory();
    }, [category]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>{category} Books</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
};