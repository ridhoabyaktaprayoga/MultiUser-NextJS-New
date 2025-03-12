/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  // Ambil data produk berdasarkan ID
  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");

      const product = await res.json();
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
    } catch (error) {
      console.error("Error fetching product:", error);
      Swal.fire("Error", "Failed to load product details.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Simpan perubahan produk
  const updateProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price: parseFloat(price) }),
      });

      if (!res.ok) throw new Error("Failed to update product");

      Swal.fire("Success", "Product updated!", "success").then(() => {
        router.push("/dashboard/admin");
      });
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire("Error", "Failed to update product.", "error");
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
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

        {loading ? (
          <p className="text-gray-500">Loading product details...</p>
        ) : (
          <>
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
              placeholder="Product Description"
            />
            <input
              className="border p-2 w-full mb-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Price"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
              onClick={updateProduct}
            >
              Update Product
            </button>
          </>
        )}
      </div>
    </div>
  );
}
