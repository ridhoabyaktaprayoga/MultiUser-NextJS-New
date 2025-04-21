"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Ambil daftar buku dari API
  const fetchBooks = async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data);
  };

  // Hapus buku berdasarkan ID
  const deleteBook = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This book will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`/api/books/${id}`, { method: "DELETE" });
        Swal.fire("Deleted!", "Book has been deleted.", "success");
        fetchBooks();
      }
    });
  };

  // Logout
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        Swal.fire("Logged out!", "You have been logged out.", "success").then(() => {
          router.push("/login");
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow rounded p-6 w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

        {/* Tombol Tambah Buku */}
        <button
          onClick={() => router.push("/dashboard/admin/create")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mb-4"
        >
          + Add New Book
        </button>

        {/* Daftar Buku */}
        <ul className="w-full">
          {books.map((book) => (
            <li key={book.id} className="mb-4 border p-3 text-left flex justify-between">
              <div>
                <h3 className="font-bold">{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>{book.description}</p>
                <p className="text-green-600 font-semibold">Price: ${book.price}</p>
              </div>
              <div>
                <button
                  onClick={() => router.push(`/dashboard/admin/edit/${book.id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
