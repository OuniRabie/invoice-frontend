import { useEffect, useState } from "react";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../services/clientAPI";
import Button from "../components/Button";
import ClientForm from "../components/ClientForm";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    setLoading(true);
    setError(null);
    try {
      const data = await getClients();
      setClients(data);
    } catch (err) {
      setError(err.message || "Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  }

  function openCreateForm() {
    setEditingClient(null);
    setFormOpen(true);
  }

  function openEditForm(client) {
    setEditingClient(client);
    setFormOpen(true);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this client?")) {
      await deleteClient(id);
      fetchClients();
    }
  }

  async function handleFormSubmit(formData) {
    try {
      if (editingClient) {
        await updateClient(editingClient._id, formData);
      } else {
        await createClient(formData);
      }
      setFormOpen(false);
      fetchClients();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Clients</h1>
      <div className="mb-4">
        <Button onClick={openCreateForm}>Add New Client</Button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-xl shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Full Name</th>
              <th className="py-3 px-4 text-left font-semibold">ID Number</th>
              <th className="py-3 px-4 text-left font-semibold">Address</th>
              <th className="py-3 px-4 text-left font-semibold">
                Phone Number
              </th>
              <th className="py-3 px-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c._id} className="border-b hover:bg-blue-50">
                <td className="py-3 px-4">{c.fullname}</td>
                <td className="py-3 px-4">{c.id_number}</td>
                <td className="py-3 px-4">{c.adresse}</td>
                <td className="py-3 px-4">{c.phone_number}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditForm(c)}
                      className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden grid gap-4">
        {clients.map((c) => (
          <div
            key={c._id}
            className="bg-white border border-gray-200 rounded-xl shadow p-4"
          >
            <div className="font-bold text-blue-700">{c.fullname}</div>
            <div className="text-gray-700">
              <strong>ID:</strong> {c.id_number}
            </div>
            <div className="text-gray-700">
              <strong>Address:</strong> {c.adresse}
            </div>
            <div className="text-gray-700">
              <strong>Phone:</strong> {c.phone_number}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => openEditForm(c)}
                className="flex-1 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(c._id)}
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
            <ClientForm
              initialData={editingClient}
              onSubmit={handleFormSubmit}
              onCancel={() => setFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
