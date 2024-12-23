export type Category =
    | 'Fiction'
    | 'Non-Fiction'
    | 'Science'
    | 'History'
    | 'Biography'
    | 'Fantasy'
    | 'Romance'
    | 'Thriller';

export interface Book {
    id: string;
    title: string;
    author: string;
    category: Category | string;
    publicationDate: string;
    pages: number;
    isbn: string;
    language: string;
    price: number;
    rating: number;
    description: string;
    publisher: string;
};