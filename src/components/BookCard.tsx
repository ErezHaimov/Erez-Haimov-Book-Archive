import type { BookResponse } from "../models/book-response";

interface BookCardProps {
  book: BookResponse;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
      <img
        src={book.coverImage}
        alt={book.title}
        className="mb-3 h-48 w-full rounded object-cover"
      />
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        {book.title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{book.author}</p>
    </div>
  );
}
