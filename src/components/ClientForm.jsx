import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";

export default function ClientForm({ initialData, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: initialData || {
      fullname: "",
      id_number: "",
      adresse: "",
      phone_number: "",
    },
  });

  React.useEffect(() => {
    reset(
      initialData || {
        fullname: "",
        id_number: "",
        adresse: "",
        phone_number: "",
      }
    );
  }, [initialData, reset]);

  return (
    <form
      className="bg-gradient-to-br from-white via-indigo-50 to-white p-6 rounded-2xl shadow-lg border border-indigo-200 max-w-md mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-extrabold mb-6 text-blue-700">
        {initialData ? "Edit Client" : "Add New Client"}
      </h2>

      {/* Fullname */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-black">Full Name</label>
        <input
          {...register("fullname", { required: "Full name is required" })}
          className="w-full border border-indigo-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition"
          type="text"
          placeholder="Enter full name"
        />
        {errors.fullname && (
          <p className="mt-1 text-sm text-red-600">{errors.fullname.message}</p>
        )}
      </div>

      {/* ID Number */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-black">ID Number</label>
        <input
          {...register("id_number", { required: "ID number is required" })}
          className="w-full border border-indigo-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition"
          type="text"
          placeholder="Enter ID number"
        />
        {errors.id_number && (
          <p className="mt-1 text-sm text-red-600">
            {errors.id_number.message}
          </p>
        )}
      </div>

      {/* Adresse */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-black">Address</label>
        <input
          {...register("adresse", { required: "Address is required" })}
          className="w-full border border-indigo-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition"
          type="text"
          placeholder="Enter address"
        />
        {errors.adresse && (
          <p className="mt-1 text-sm text-red-600">{errors.adresse.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-black">
          Phone Number
        </label>
        <input
          {...register("phone_number", {
            required: "Phone number is required",
          })}
          className="w-full border border-indigo-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition"
          type="text"
          placeholder="Enter phone number"
        />
        {errors.phone_number && (
          <p className="mt-1 text-sm text-red-600">
            {errors.phone_number.message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : initialData ? "Update" : "Create"}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 shadow-md transition"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
