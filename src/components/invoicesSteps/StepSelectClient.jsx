import { useState, useEffect } from "react";
import { getClients } from "../../services/clientAPI";
import ClientForm from "../ClientForm";

export default function StepSelectClient({
  data,
  updateData,
  nextStep,
  closeWizard,
}) {
  const [clients, setClients] = useState([]);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    const result = await getClients();
    setClients(result);
  }

  function selectClient(client) {
    updateData({ clientId: client._id, clientObj: client });
  }

  function handleNext() {
    if (!data.clientId) {
      alert("Please select a client first.");
      return;
    }
    nextStep();
  }

  // Style helpers:
  const inputBase =
    "w-full px-4 py-2 border-2 rounded-lg shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition text-black bg-white";
  const cardBase =
    "p-3 flex flex-col gap-1 border rounded-xl cursor-pointer transition shadow-sm";
  const cardSelected = "bg-blue-50 border-blue-600 ring-2 ring-blue-300";
  const cardHover = "hover:bg-blue-100 hover:border-blue-400";

  return (
    <div>
      {!showForm && (
        <>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="🔎 Search client by name or ID…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`${inputBase} mb-3 font-semibold text-lg placeholder-gray-400`}
          />

          {/* Client List */}
          <div className="space-y-2 max-h-[38vh] overflow-y-auto">
            {clients
              .filter(
                (c) =>
                  c.fullname.toLowerCase().includes(query.toLowerCase()) ||
                  c.id_number.includes(query)
              )
              .map((c) => (
                <div
                  key={c._id}
                  className={`${cardBase} ${
                    data.clientId === c._id
                      ? cardSelected
                      : cardHover + " border-gray-200"
                  }`}
                  onClick={() => selectClient(c)}
                >
                  <div className="font-bold text-blue-700 text-base">
                    {c.fullname}
                  </div>
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">ID:</span> {c.id_number}
                  </div>
                  <div className="text-sm text-gray-700">{c.adresse}</div>
                </div>
              ))}

            {clients.length > 0 &&
              clients.filter(
                (c) =>
                  c.fullname.toLowerCase().includes(query.toLowerCase()) ||
                  c.id_number.includes(query)
              ).length === 0 && (
                <div className="text-gray-500 italic text-center py-4 opacity-60">
                  No clients found.
                </div>
              )}
            {clients.length === 0 && (
              <div className="text-gray-400 text-center py-4">
                No clients yet.
              </div>
            )}
          </div>

          {/* Add Client Button */}
          <button
            onClick={() => setShowForm(true)}
            className="mt-6 w-full py-2 font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition"
          >
            + Add New Client
          </button>

          {/* Custom Invoice Address */}
          <div className="mt-6">
            <label className="block font-semibold text-black mb-1">
              Custom Invoice Address (optional)
            </label>
            <input
              type="text"
              value={data.clientAdresse}
              onChange={(e) => updateData({ clientAdresse: e.target.value })}
              placeholder="Address to appear on this invoice only"
              className={`${inputBase}`}
            />
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between gap-3 mt-8">
            <button
              onClick={closeWizard}
              className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 shadow"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Add Client Modal */}
      {showForm && (
        <div className="fixed inset-0 z-10 bg-black/40 flex items-center justify-center">
          <div className="w-full max-w-md">
            <ClientForm
              initialData={null}
              onSubmit={async (newClient) => {
                await fetchClients();
                setShowForm(false);
                updateData({ clientId: newClient._id });
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
