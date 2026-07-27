import axios from "axios";
import type { BookResponse } from "../models/book-response";
import type { BookRequest } from "../models/book-request";

const _axios = axios.create({
  baseURL: "https://6a679a68157beab892d39b44.mockapi.io",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiService = {
  getBooks: () => _axios.get<Array<BookResponse>>("/books"),

  createBook: (payload: BookRequest) =>
    _axios.post<BookResponse>("/books", payload),

  updateBook: (id: string, payload: BookRequest) =>
    _axios.put<BookResponse>(`/books/${id}`, payload),

  deleteBook: (id: string) => _axios.delete<BookResponse>(`/books/${id}`),
};
