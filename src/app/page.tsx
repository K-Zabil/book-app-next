import Link from 'next/link';
import { Category } from '@/entities/book';

export default function HomePage() {
  const categoryArray: Category[] = [
    'Fiction',
    'Non-Fiction',
    'Science',
    'History',
    'Biography',
    'Fantasy',
    'Romance',
    'Thriller',
  ];

  return (
    <div>
      <h1>Welcome to the Book Tracker</h1>
      <ul>
        {categoryArray.map((category) => (
          <li key={category}>
            <Link href={`/books/${category.replace(/\s+/g, '-')}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};