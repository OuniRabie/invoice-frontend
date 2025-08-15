import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../services/productAPI";
import Button from "../components/Button";
import ProductForm from "../components/ProductForm";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  function openCreateForm() {
    setEditingProduct(null);
    setFormOpen(true);
  }

  function openEditForm(product) {
    setEditingProduct(product);
    setFormOpen(true);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  }

  async function handleFormSubmit(formData) {
    console.log("Submitting product data:", formData);

    if (editingProduct) {
      await updateProduct(editingProduct._id, formData);
    } else {
      await createProduct(formData);
    }
    setFormOpen(false);
    fetchProducts();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Produits</h1>

      {/* Add new product button */}
      <div className="mb-4">
        <Button onClick={openCreateForm}>Ajouter Nouveau Produit</Button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-xl shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Code</th>
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Price HT</th>
              <th className="py-3 px-4 text-left font-semibold">Stock</th>
              <th className="py-3 px-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-b border-gray-200 hover:bg-blue-50 transition"
              >
                <td className="py-3 px-4">{p.product_code}</td>
                <td className="py-3 px-4">{p.product_name}</td>
                <td className="py-3 px-4">{p.price_ht?.toFixed(3)}</td>
                <td className="py-3 px-4">{p.stock_quantity}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => openEditForm(p)}
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden grid gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white border border-gray-200 rounded-xl shadow p-4"
          >
            <div className="flex justify-between mb-2">
              <span className="font-bold text-blue-700">{p.product_name}</span>
              <span className="text-sm text-gray-500">{p.product_code}</span>
            </div>
            <div className="text-gray-700 mb-1">
              <span className="font-medium">Price HT:</span>{" "}
              {p.price_ht?.toFixed(3)}
            </div>
            <div className="text-gray-700 mb-3">
              <span className="font-medium">Stock:</span> {p.stock_quantity}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEditForm(p)}
                className="flex-1 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="flex-1 px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal/Card */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-full max-w-md">
            <ProductForm
              initialData={editingProduct}
              onSubmit={handleFormSubmit}
              onCancel={() => setFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
