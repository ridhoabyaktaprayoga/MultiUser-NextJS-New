"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // Hapus produk dari keranjang
  const removeFromCart = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Hitung total harga
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // Checkout dan hapus semua item dari keranjang
  const handleCheckout = () => {
    if (cart.length === 0) {
      Swal.fire("Oops!", "Your cart is empty.", "warning");
      return;
    }

    Swal.fire({
      title: "Confirm Checkout",
      text: `Total Payment: $${totalPrice.toFixed(2)}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Checkout!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Kosongkan keranjang
        setCart([]);
        localStorage.removeItem("cart");

        // Notifikasi sukses
        Swal.fire("Success!", "Your checkout was successful.", "success");
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <button
        className="absolute top-5 left-5 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push("/dashboard/user")}
      >
        ← Back
      </button>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="w-full max-w-md">
          {cart.map((item, index) => (
            <li key={index} className="mb-2 border p-2 flex justify-between items-center">
              <span>
                {item.name} - ${item.price}
              </span>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="font-bold mt-2">Total: ${totalPrice.toFixed(2)}</p>

      {/* Tombol Checkout */}
      {cart.length > 0 && (
        <button
          onClick={handleCheckout}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Checkout
        </button>
      )}
    </div>
  );
}
