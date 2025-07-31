"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function DeleteCarButton({ carId }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this car?");
    if (!confirmed) return;

    try {
      const res = await fetch("/api/cars/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: carId }),
      });

      const result = await res.json();

      if (result.status === 200) {
        toast.success(result.message);
        router.refresh(); // or router.push('/admin/cars') if you're on detail page
      } else {
        toast.error(result.message || "Failed to delete car");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Delete{carId}
    </button>
  );
}
