import { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import { ApiService } from "./services/api-service";
import type { BookResponse } from "./models/book-response";
import BookCard from "./components/BookCard";
import { Button } from "flowbite-react";
import BookFormModal from "./components/BookFormModal";
import type { BookRequest } from "./models/book-request";

function App() {
  const [books, setBooks] = useState<Array<BookResponse>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookResponse | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const res = await ApiService.getBooks();
        setBooks(res.data);
      } catch (err) {
        console.error(err);
        setError("שגיאה בטעינת הספרים");
      } finally {
        setIsLoading(false);
      }
    };

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
    try {
      const res = await ApiService.deleteBook(id);
      if (res.data) {
        setBooks((prev) => prev.filter((book) => book.id !== id));
      }
    } catch (err) {
      console.error(err);
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

  const handleToggleFavorite = async (book: BookResponse) => {
    try {
      const updated: BookRequest = { ...book, isFavorite: !book.isFavorite };
      const res = await ApiService.updateBook(book.id, updated);
      if (res.data) {
        setBooks((prev) => prev.map((b) => (b.id === book.id ? res.data : b)));
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
    <Layout>
      {isLoading && <p>טוען...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Button onClick={openCreateModal}>+ הוסף ספר</Button>
        <input
          type="text"
          placeholder="חפש ספר לפי שם..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs rounded-lg border px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>
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
      </div>{" "}
      {filteredBooks.length === 0 && !isLoading && (
        <p className="text-gray-500">לא נמצאו ספרים התואמים לחיפוש</p>
      )}
      <BookFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingBook ? handleUpdate : handleCreate}
        initialValues={editingBook ?? undefined}
        title={editingBook ? "עריכת ספר" : "הוספת ספר חדש"}
      />
    </Layout>
  );
}

export default App;
