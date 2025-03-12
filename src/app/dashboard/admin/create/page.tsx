"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function CreateProduct() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // Tambahkan produk baru
  const addProduct = async () => {
    if (!name || !description || !price) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price: parseFloat(price) }),
      });

      if (!res.ok) throw new Error("Failed to add product");

      Swal.fire("Success", "Product added!", "success").then(() => {
        router.push("/dashboard/admin");
      });
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire("Error", "Failed to add product.", "error");
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
        <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

        <input
          className="border p-2 w-full mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />
        <textarea
          className="border p-2 w-full mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          className="border p-2 w-full mb-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
          onClick={addProduct}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
