"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function CreateBook() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(""); // Tambahkan state description

  // Tambahkan buku baru
  const addBook = async () => {
    if (!title || !author || !price || !description) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, price: parseFloat(price), description }), // Tambahkan description
      });

      if (!res.ok) throw new Error("Failed to add book");

      Swal.fire("Success", "Book added!", "success").then(() => {
        router.push("/dashboard/admin");
      });
    } catch (error) {
      console.error("Error adding book:", error);
      Swal.fire("Error", "Failed to add book.", "error");
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
        <h1 className="text-2xl font-bold mb-4">Add New Book</h1>

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
          placeholder="Price"
          type="number"
        />
        <textarea
          className="border p-2 w-full mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description" // Tambahkan input untuk description
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
          onClick={addBook}
        >
          Add Book
        </button>
      </div>
    </div>
  );
}
