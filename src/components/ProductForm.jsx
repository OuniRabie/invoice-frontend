import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";

export default function ProductForm({ initialData, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: initialData || {
      product_code: "",
      product_name: "",
      price: "",
      stock: "",
    },
  });

  React.useEffect(() => {
    reset(
      initialData || {
        product_code: "",
        product_name: "",
        price: "",
        stock: "",
      }
    );
  }, [initialData, reset]);

  return (
    <form
      className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-6 rounded-2xl shadow-lg border border-indigo-200 max-w-md mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-extrabold mb-6 text-indigo-700">
        {initialData ? "Edit Product" : "Add New Product"}
      </h2>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-indigo-600">
          Product Code
        </label>
        <input
          {...register("product_code", {
            required: "Product code is required",
          })}
          className="w-full border border-indigo-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-600 transition"
          type="text"
          placeholder="Enter code"
        />
        {errors.product_code && (
          <p className="mt-1 text-sm text-red-600">
            {errors.product_code.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-indigo-600">
          Product Name
        </label>
        <input
          {...register("product_name", {
            required: "Product name is required",
          })}
          className="w-full border border-indigo-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-600 transition"
          type="text"
          placeholder="Enter name"
        />
        {errors.product_name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.product_name.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-indigo-600">
          Price HT
        </label>
        <input
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
            min: { value: 0, message: "Price must be at least 0" },
          })}
          className="w-full border border-indigo-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-600 transition"
          type="number"
          step="0.001"
          placeholder="0.000"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-indigo-600">
          Stock Quantity
        </label>
        <input
          {...register("stock", {
            required: "Stock quantity is required",
            valueAsNumber: true,
            min: { value: 0, message: "Stock cannot be negative" },
          })}
          className="w-full border border-indigo-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-600 transition"
          type="number"
          step="1"
          placeholder="0"
        />
        {errors.stock && (
          <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition"
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
