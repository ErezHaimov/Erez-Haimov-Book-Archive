import { HiTrash, HiHeart, HiOutlineHeart, HiPencil } from "react-icons/hi";
import type { BookResponse } from "../models/book-response";

interface BookCardProps {
  book: BookResponse;
  onDelete: (id: string) => void;
  onToggleFavorite: (book: BookResponse) => void;
  onEdit: (book: BookResponse) => void;
}

export default function BookCard({
  book,
  onDelete,
  onToggleFavorite,
  onEdit,
}: BookCardProps) {
  return (
    <div className="flex h-full flex-col rounded-lg bg-white p-4 shadow dark:bg-gray-800">
      <img
        src={book.coverImage}
        alt={book.title}
        className="mb-3 aspect-[2/3] w-full rounded object-cover"
      />

      <div className="flex-1">
        <h2 className="truncate text-lg font-bold text-gray-900 dark:text-white">
          {book.title}
        </h2>
        <p className="line-clamp-1 text-sm text-gray-600 dark:text-gray-300">
          {book.author}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1 border-t border-gray-100 pt-3 dark:border-gray-700">
        <button
          onClick={() => onToggleFavorite(book)}
          className="rounded-full p-2 hover:bg-red-50 dark:hover:bg-red-900"
          aria-label={book.isFavorite ? "הסר ממועדפים" : "הוסף למועדפים"}
        >
          {book.isFavorite ? (
            <HiHeart size={18} className="text-red-500" />
          ) : (
            <HiOutlineHeart size={18} className="text-gray-400" />
          )}
        </button>

        <button
          onClick={() => onEdit(book)}
          className="rounded-full p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900"
          aria-label="ערוך ספר"
        >
          <HiPencil size={18} />
        </button>

        <button
          onClick={() => onDelete(book.id)}
          className="rounded-full p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
          aria-label="מחק ספר"
        >
          <HiTrash size={18} />
        </button>
      </div>
    </div>
  );
}
