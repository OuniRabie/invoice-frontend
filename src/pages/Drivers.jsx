import { useEffect, useState } from "react";
import {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../services/driverAPI";
import Button from "../components/Button";
import DriverForm from "../components/DriverForm";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  async function fetchDrivers() {
    setLoading(true);
    setError(null);
    try {
      const data = await getDrivers();
      setDrivers(data);
    } catch (err) {
      setError(err.message || "Failed to fetch drivers");
    } finally {
      setLoading(false);
    }
  }

  function openCreateForm() {
    setEditingDriver(null);
    setFormOpen(true);
  }

  function openEditForm(driver) {
    setEditingDriver(driver);
    setFormOpen(true);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      await deleteDriver(id);
      fetchDrivers();
    }
  }

  async function handleFormSubmit(formData) {
    try {
      if (editingDriver) {
        await updateDriver(editingDriver._id, formData);
      } else {
        await createDriver(formData);
      }
      setFormOpen(false);
      fetchDrivers();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Drivers</h1>
      <div className="mb-4">
        <Button onClick={openCreateForm}>Add New Driver</Button>
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
              <th className="py-3 px-4 text-left font-semibold">
                Car Registration
              </th>
              <th className="py-3 px-4 text-left font-semibold">Destination</th>
              <th className="py-3 px-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d._id} className="border-b hover:bg-blue-50">
                <td className="py-3 px-4">{d.fullname}</td>
                <td className="py-3 px-4">{d.id_number}</td>
                <td className="py-3 px-4">{d.car_registration}</td>
                <td className="py-3 px-4">{d.destination}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditForm(d)}
                      className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(d._id)}
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
        {drivers.map((d) => (
          <div key={d._id} className="bg-white border rounded-xl shadow p-4">
            <div className="font-bold text-blue-700">{d.fullname}</div>
            <div className="text-gray-700">
              <strong>ID:</strong> {d.id_number}
            </div>
            <div className="text-gray-700">
              <strong>Car Reg:</strong> {d.car_registration}
            </div>
            <div className="text-gray-700">
              <strong>Destination:</strong> {d.destination}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => openEditForm(d)}
                className="flex-1 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(d._id)}
                className="flex-1 px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-full max-w-md">
            <DriverForm
              initialData={editingDriver}
              onSubmit={handleFormSubmit}
              onCancel={() => setFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
