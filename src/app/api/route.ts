import { NextResponse } from 'next/server';
import books from "@/lib/booksDB.json";
import updateJsonFile from '@/repositories/bookRepository';
import { Book } from '@/entities/book';
import { v4 as uuidv4 } from 'uuid';


export async function GET() {
    return NextResponse.json(books);
}

export async function POST(req: Request) {
    try {
        const newBook: Book = await req.json();
        newBook.id = uuidv4();
        const booksCopy: Book[] = [...books];
        booksCopy.push(newBook);
        await updateJsonFile(booksCopy);
        return NextResponse.json(newBook, { status: 201 });
      } catch (error) {
        return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
      }
}