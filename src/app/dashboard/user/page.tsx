"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function UserDashboard() {
  const router = useRouter();

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
        // Menghapus token dari cookie
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        Swal.fire("Logged out!", "You have been logged out.", "success").then(() => {
          router.push("/login");
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow rounded p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, User!</h1>
        <p className="text-gray-700 mb-8">This is your user dashboard.</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
