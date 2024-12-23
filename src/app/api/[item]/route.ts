import books from "@/lib/booksDB.json";
import { Book } from '@/entities/book';
import { NextResponse } from 'next/server';
import updateJsonFile from '@/repositories/bookRepository';

export async function DELETE({ params }: { params: { item: string } }) {
    try {
        const bookId = params.item;
        const bookIndex = books.findIndex((book => book.id === bookId));
        if (bookIndex === -1) return NextResponse.json({ error: 'Book not found' }, { status: 404 });
        books.splice(bookIndex, 1);
        await updateJsonFile(books);
        return NextResponse.json({ message: 'Book deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
    }
};

export async function PUT(req: Request, { params }: { params: { item: string } }) {
    const updatedBook: Book = await req.json();
    const bookId = params.item;
    const bookIndex = books.findIndex((book => book.id === bookId));
    if (bookIndex === -1) return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    books[bookIndex] = { ...books[bookIndex], ...updatedBook };
    await updateJsonFile(books);
    return NextResponse.json(books[bookIndex]);
};

export async function GET(req: Request, { params }: { params: { item: string } }) {
    const category = params.item;
    
    if (!category) {
        return NextResponse.json({ error: "Category parameter is missing" }, { status: 400 });
    }

    const booksInCategory = books.filter((book) => book.category === category);

    if (booksInCategory.length === 0) {
        return NextResponse.json({ error: "Books in this category not found" }, { status: 404 });
    }

    return NextResponse.json(booksInCategory);
}