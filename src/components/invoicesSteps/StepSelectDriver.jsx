import { useState, useEffect } from "react";
import { getDrivers } from "../../services/driverAPI";
import DriverForm from "../DriverForm";

export default function StepSelectDriver({
  data,
  updateData,
  nextStep,
  prevStep,
}) {
  const [drivers, setDrivers] = useState([]);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchDrivers();
  }, []);

  async function fetchDrivers() {
    const result = await getDrivers();
    setDrivers(result);
  }

  function selectDriver(driver) {
    updateData({ driverId: driver._id, driverObj: driver });
  }

  function handleNext() {
    if (!data.driverId) {
      alert("Please select a driver first.");
      return;
    }
    nextStep();
  }

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
          {/* Search */}
          <input
            type="text"
            placeholder="🔎 Search driver by name, ID, or car reg…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`${inputBase} mb-3 font-semibold text-lg placeholder-gray-400`}
          />

          {/* Drivers list */}
          <div className="space-y-2 max-h-[38vh] overflow-y-auto">
            {drivers
              .filter(
                (d) =>
                  d.fullname.toLowerCase().includes(query.toLowerCase()) ||
                  d.id_number.includes(query) ||
                  d.car_registration.toLowerCase().includes(query.toLowerCase())
              )
              .map((d) => (
                <div
                  key={d._id}
                  className={`${cardBase} ${
                    data.driverId === d._id
                      ? cardSelected
                      : cardHover + " border-gray-200"
                  }`}
                  onClick={() => selectDriver(d)}
                >
                  <div className="font-bold text-blue-700">{d.fullname}</div>
                  <div className="text-xs text-gray-500">
                    CIN: {d.id_number} — Voiture: {d.car_registration}
                  </div>
                  <div className="text-sm text-gray-700">
                    Destination: {d.destination}
                  </div>
                </div>
              ))}

            {drivers.length > 0 &&
              drivers.filter(
                (d) =>
                  d.fullname.toLowerCase().includes(query.toLowerCase()) ||
                  d.id_number.includes(query) ||
                  d.car_registration.toLowerCase().includes(query.toLowerCase())
              ).length === 0 && (
                <div className="text-gray-500 italic text-center py-4 opacity-60">
                  No drivers found.
                </div>
              )}
            {drivers.length === 0 && (
              <div className="text-gray-400 text-center py-4">
                No drivers yet.
              </div>
            )}
          </div>

          {/* Add Driver */}
          <button
            onClick={() => setShowForm(true)}
            className="mt-6 w-full py-2 font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition"
          >
            + Ajouter Nouveau Chauffeur
          </button>

          {/* Custom Destination */}
          <div className="mt-6">
            <label className="block font-semibold text-black mb-1">
              Nouvelle Destination (optional)
            </label>
            <input
              type="text"
              value={data.driverDestination}
              onChange={(e) =>
                updateData({ driverDestination: e.target.value })
              }
              placeholder="Destination Pour cette Facture SEULEMENT "
              className={`${inputBase}`}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between gap-3 mt-8">
            <button
              onClick={prevStep}
              className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 shadow"
            >
              Back
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

      {/* Add Driver Modal */}
      {showForm && (
        <div className="fixed inset-0 z-10 bg-black/40 flex items-center justify-center">
          <div className="w-full max-w-md">
            <DriverForm
              initialData={null}
              onSubmit={async (newDriver) => {
                await fetchDrivers();
                setShowForm(false);
                updateData({ driverId: newDriver._id });
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
