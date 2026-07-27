import { HiTrash, HiHeart, HiOutlineHeart } from "react-icons/hi";
import type { BookResponse } from "../models/book-response";

interface BookCardProps {
  book: BookResponse;
  onDelete: (id: string) => void;
  onToggleFavorite: (book: BookResponse) => void;
}

export default function BookCard({
  book,
  onDelete,
  onToggleFavorite,
}: BookCardProps) {
  return (
    <div className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800">
      <img
        src={book.coverImage}
        alt={book.title}
        className="mb-3 h-48 w-full rounded object-cover"
      />
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        {book.title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{book.author}</p>

      <div className="absolute top-2 right-2 flex gap-1">
        <button
          onClick={() => onToggleFavorite(book)}
          className="rounded-full bg-white/80 p-2 hover:bg-red-50 dark:bg-gray-900/80 dark:hover:bg-red-900"
          aria-label={book.isFavorite ? "הסר ממועדפים" : "הוסף למועדפים"}
        >
          {book.isFavorite ? (
            <HiHeart size={18} className="text-red-500" />
          ) : (
            <HiOutlineHeart size={18} className="text-gray-400" />
          )}
        </button>

        <button
          onClick={() => onDelete(book.id)}
          className="rounded-full bg-white/80 p-2 text-red-600 hover:bg-red-100 dark:bg-gray-900/80 dark:hover:bg-red-900"
          aria-label="מחק ספר"
        >
          <HiTrash size={18} />
        </button>
      </div>
    </div>
  );
}
