import { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import { ApiService } from "./services/api-service";
import type { BookResponse } from "./models/book-response";

function App() {
  const [books, setBooks] = useState<Array<BookResponse>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <Layout>
      {isLoading && <p>טוען...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="rounded-lg bg-white p-4 shadow dark:bg-gray-800"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="mb-3 h-48 w-full rounded object-cover"
            />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {book.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {book.author}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default App;
