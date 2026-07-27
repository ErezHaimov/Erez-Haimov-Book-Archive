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

  return (
    <Layout>
      {isLoading && <p>טוען...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <Button onClick={() => setIsModalOpen(true)} className="mb-6">
        + הוסף ספר
      </Button>{" "}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onDelete={handleDelete} />
        ))}
      </div>{" "}
      <BookFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        title="הוספת ספר חדש"
      />
    </Layout>
  );
}

export default App;
