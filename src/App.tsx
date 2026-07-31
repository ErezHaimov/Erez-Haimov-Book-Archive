import { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import Layout from "./layout/Layout";
import BookCard from "./components/BookCard";
import BookFormModal from "./components/BookFormModal";
import { ApiService } from "./services/api-service";
import type { BookResponse } from "./models/book-response";
import type { BookRequest } from "./models/book-request";
import { HiPlus } from "react-icons/hi";

function App() {
  const [books, setBooks] = useState<Array<BookResponse>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookResponse | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await ApiService.getBooks();
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      setError(
        "Error loading books. Please check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreate = async (newBook: BookRequest) => {
    try {
      const res = await ApiService.createBook(newBook);
      if (res.data) {
        setBooks((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    const previousBooks = books;
    setBooks((prev) => prev.filter((book) => book.id !== id));
    try {
      await ApiService.deleteBook(id);
    } catch (err) {
      console.error(err);
      setBooks(previousBooks); // נכשל? מחזירים את הספר שנמחק
    }
  };

  const handleToggleFavorite = async (book: BookResponse) => {
    const previousBooks = books;
    const optimisticBook: BookResponse = {
      ...book,
      isFavorite: !book.isFavorite,
    };
    setBooks((prev) =>
      prev.map((b) => (b.id === book.id ? optimisticBook : b)),
    );
    try {
      await ApiService.updateBook(book.id, optimisticBook);
    } catch (err) {
      console.error(err);
      setBooks(previousBooks); // נכשל? מחזירים למצב הקודם
    }
  };

  const handleUpdate = async (updatedFields: BookRequest) => {
    if (!editingBook) return;
    try {
      const res = await ApiService.updateBook(editingBook.id, updatedFields);
      if (res.data) {
        setBooks((prev) =>
          prev.map((b) => (b.id === editingBook.id ? res.data : b)),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openCreateModal = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const openEditModal = (book: BookResponse) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Layout
      headerActions={
        <>
          <input
            type="text"
            placeholder="Search by book title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 rounded-lg border px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          <Button onClick={openCreateModal} className="dark:hover:bg-blue-500">
            Add Book
          </Button>
        </>
      }
    >
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Spinner size="xl" />
          <p className="mt-4 text-gray-500">Loading books...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="py-8 text-center">
          <p className="mb-3 text-red-600">{error}</p>
          <Button color="red" onClick={fetchBooks}>
            Try again
          </Button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="grid [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))] gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
                onEdit={openEditModal}
              />
            ))}
            <button
              onClick={openCreateModal}
              className="flex h-full min-h-[280px] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-4 text-gray-400 transition-colors hover:border-blue-400 hover:text-blue-500 dark:border-gray-600 dark:text-gray-500 dark:hover:border-blue-500 dark:hover:text-blue-400"
              aria-label="Add new book"
            >
              <HiPlus size={40} />
              <span className="text-sm font-medium">Add Book</span>
            </button>
          </div>
          {filteredBooks.length === 0 && (
            <p className="mt-4 text-gray-500">
              No books found matching your search.
            </p>
          )}
        </>
      )}

      <BookFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingBook ? handleUpdate : handleCreate}
        initialValues={editingBook ?? undefined}
        title={editingBook ? "Editing book" : "Adding new book"}
      />
    </Layout>
  );
}

export default App;
