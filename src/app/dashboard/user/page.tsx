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

export default function UserDashboard() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchBooks();
    updateCartCount();
  }, []);

  // Ambil daftar buku dari API
  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/books");
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Perbarui jumlah item di keranjang
  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(storedCart.length);
  };

  // Tambahkan buku ke keranjang
  const addToCart = (book: Book) => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    storedCart.push(book);
    localStorage.setItem("cart", JSON.stringify(storedCart));
    setCartCount(storedCart.length);
    Swal.fire("Added!", `${book.title} by ${book.author} has been added to your cart.`, "success");
  };

  // Fungsi logout
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
        // Hapus token dan data dari localStorage
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("cart");
        localStorage.removeItem("token");

        Swal.fire("Logged out!", "You have been logged out.", "success").then(() => {
          router.push("/login"); // Redirect ke login
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow rounded p-6 w-full max-w-2xl text-center relative">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Bookstore!</h1>
        <p className="text-gray-700 mb-4">Browse and add books to your cart.</p>

        {/* Icon Keranjang */}
        <button
          onClick={() => router.push("/dashboard/user/cart")}
          className="absolute top-5 right-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          📚 Cart ({cartCount})
        </button>

        {/* Daftar Buku */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Books</h2>
          <ul className="w-full">
            {books.length === 0 ? (
              <p className="text-gray-500">No books available.</p>
            ) : (
              books.map((book) => (
                <li key={book.id} className="mb-4 border p-3 text-left">
                  <h3 className="font-bold">{book.title}</h3>
                  <p className="italic">by {book.author}</p>
                  <p>{book.description}</p>
                  <p className="text-green-600 font-semibold">Price: ${book.price}</p>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded mt-2"
                    onClick={() => addToCart(book)}
                  >
                    Add to Cart 📖
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

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
