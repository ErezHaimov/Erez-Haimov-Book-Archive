import { useState, useRef } from "react";
import {
  HiTrash,
  HiHeart,
  HiOutlineHeart,
  HiPencil,
  HiInformationCircle,
} from "react-icons/hi";
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
  const [showDescription, setShowDescription] = useState(false);

  const descriptionRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (descriptionRef.current) {
      descriptionRef.current.scrollTop = 0;
    }
  };

  const handleCardClick = () => {
    if (descriptionRef.current) {
      descriptionRef.current.scrollTop = 0;
    }
    setShowDescription((prev) => !prev);
  };

  return (
    <div className="flex h-full flex-col rounded-lg bg-white p-4 shadow dark:bg-gray-800">
      <div
        onMouseEnter={handleMouseEnter}
        onClick={handleCardClick}
        className="group relative mb-3 aspect-[2/3] w-full cursor-pointer overflow-hidden rounded select-none"
      >
        <img
          src={
            book.coverImage || "https://placehold.co/400x600?text=No%0ACover"
          }
          alt={book.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://placehold.co/400x600?text=Cover%0ANot%0AFound";
          }}
        />

        {book.description && (
          <div className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white backdrop-blur-sm sm:hidden">
            <HiInformationCircle size={18} />
          </div>
        )}

        {book.description && (
          <div
            ref={descriptionRef}
            className={`absolute inset-x-0 bottom-0 max-h-[50%] overflow-y-auto bg-gradient-to-t from-black/90 via-black/75 to-black/60 p-3 pt-4 text-xs text-white backdrop-blur-sm transition-all duration-300 ease-out ${
              showDescription
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            } group-hover:translate-y-0 group-hover:opacity-100`}
          >
            <p className="leading-relaxed whitespace-pre-line">
              {book.description}
            </p>
          </div>
        )}
      </div>

      <div className="flex-1">
        <h2 className="line-clamp-2 h-[2.8rem] text-lg leading-snug font-bold text-gray-900 dark:text-white">
          {book.title}
        </h2>
        <p className="line-clamp-1 text-sm text-gray-600 dark:text-gray-300">
          {book.author}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1 border-t border-gray-100 pt-3 dark:border-gray-700">
        <button
          onClick={() => onToggleFavorite(book)}
          className="rounded-full p-2 hover:bg-red-50 dark:hover:bg-white/10"
          aria-label={
            book.isFavorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          {book.isFavorite ? (
            <HiHeart size={18} className="text-red-500" />
          ) : (
            <HiOutlineHeart size={18} className="text-gray-400" />
          )}
        </button>

        <button
          onClick={() => onEdit(book)}
          className="rounded-full p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-white/10"
          aria-label="Edit book"
        >
          <HiPencil size={18} />
        </button>

        <button
          onClick={() => onDelete(book.id)}
          className="rounded-full p-2 text-red-600 hover:bg-red-100 dark:hover:bg-white/10"
          aria-label="Delete book"
        >
          <HiTrash size={18} />
        </button>
      </div>
    </div>
  );
}
