/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";

export default function EditBook() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(""); // Tambahkan state description
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, []);

  // Ambil data buku berdasarkan ID
  const fetchBook = async () => {
    try {
      const res = await fetch(`/api/books/${id}`);
      if (!res.ok) throw new Error("Failed to fetch book");

      const book = await res.json();
      setTitle(book.title);
      setAuthor(book.author);
      setPrice(book.price);
      setDescription(book.description); // Set deskripsi dari API
    } catch (error) {
      console.error("Error fetching book:", error);
      Swal.fire("Error", "Failed to load book details.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Simpan perubahan buku
  const updateBook = async () => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, price: parseFloat(price), description }), // Tambahkan description
      });

      if (!res.ok) throw new Error("Failed to update book");

      Swal.fire("Success", "Book updated!", "success").then(() => {
        router.push("/dashboard/admin");
      });
    } catch (error) {
      console.error("Error updating book:", error);
      Swal.fire("Error", "Failed to update book.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative">
      {/* Tombol Back di pojok kiri atas */}
      <button
        className="absolute top-5 left-5 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push("/dashboard/admin")}
      >
        ← Back
      </button>

      <div className="bg-white shadow rounded p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Edit Book</h1>

        {loading ? (
          <p className="text-gray-500">Loading book details...</p>
        ) : (
          <>
            <input
              className="border p-2 w-full mb-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
            />
            <input
              className="border p-2 w-full mb-2"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
            />
            <input
              className="border p-2 w-full mb-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Price"
            />
            <textarea
              className="border p-2 w-full mb-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description" // Tambahkan input untuk description
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
              onClick={updateBook}
            >
              Update Book
            </button>
          </>
        )}
      </div>
    </div>
  );
}
