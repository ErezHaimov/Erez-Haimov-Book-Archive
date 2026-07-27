import { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import { ApiService } from "./services/api-service";
import type { BookResponse } from "./models/book-response";
import BookCard from "./components/BookCard";

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
          <BookCard key={book.id} book={book} />
        ))}
      </div>{" "}
    </Layout>
  );
}

export default App;
