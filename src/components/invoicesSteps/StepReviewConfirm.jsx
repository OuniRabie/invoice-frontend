import React, { useState } from "react";

export default function StepReviewConfirm({ data, prevStep, closeWizard }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // You can actually receive the full objects from data
  const client = data.clientObj;
  const driver = data.driverObj;
  const products = data.items.map((item) => ({
    ...item,
    product: item.productObj,
  }));

  // If you only have IDs but have global lists:
  // const client = clients.find(c => c._id === data.clientId)
  // ...etc

  // Build payload as before
  const payload = {
    clientId: data.clientId,
    clientAdresse: data.clientAdresse || undefined,
    driverId: data.driverId,
    driverDestination: data.driverDestination || undefined,
    items: data.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    })),
    date: data.date,
    notes: data.notes,
  };

  async function handleSubmit() {
    console.log("VITE API  BUTTON:", import.meta.env.VITE_API_URL);
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create invoice");
      }
      setSuccess("Invoice created successfully!");
      setTimeout(() => closeWizard(), 1200);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  }

  function money(n) {
    return n
      ? Number(n).toLocaleString(undefined, { minimumFractionDigits: 3 })
      : "0.000";
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-2 text-indigo-700">
        Review Invoice Details
      </h3>

      {/* CLIENT */}
      <section className="mb-3 p-4 rounded-xl border border-indigo-200 bg-indigo-50/80">
        <h4 className="font-semibold mb-2 text-indigo-800">Client</h4>
        {client ? (
          <>
            <div className="font-bold text-blue-900 text-lg">
              {client.fullname}
            </div>
            <div className="text-gray-700 text-sm">
              <span className="font-medium pr-4">ID:</span> {client.id_number}
            </div>
            <div className="text-black text-base pt-0.5">
              <span className="font-medium">Address:</span>{" "}
              {data.clientAdresse || client.adresse}
            </div>
            <div className="text-black text-base pt-0.5">
              <span className="font-medium">Phone:</span> {client.phone_number}
            </div>
          </>
        ) : (
          <div className="text-gray-500 italic">No client!</div>
        )}
      </section>

      {/* PRODUCTS */}
      <section className="mb-3 p-4 rounded-xl border border-blue-200 bg-blue-50/70">
        <h4 className="font-semibold mb-2 text-blue-800">Products</h4>
        <ul className="divide-y divide-blue-100">
          {products.map((item, i) => (
            <li
              key={i}
              className="flex flex-col sm:flex-row sm:items-center py-2 justify-between"
            >
              <div className="font-bold text-black">
                {item.product?.product_name || "N/A"}
              </div>
              <div className="text-xs sm:ml-3 text-gray-600">
                Code: {item.product?.product_code} – Price: {money(item.price)}
              </div>
              <div className="text-black font-medium">Qty: {item.quantity}</div>
              <div className="text-indigo-900 font-semibold ml-auto">
                Total: {money(item.quantity * item.price)}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right font-bold text-lg">
          Total HT:{" "}
          <span className="text-blue-900">
            {money(
              products.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              )
            )}
          </span>
        </div>
      </section>

      {/* DRIVER */}
      <section className="mb-3 p-4 rounded-xl border border-green-200 bg-green-50/70">
        <h4 className="font-semibold mb-2 text-green-800">Driver</h4>
        {driver ? (
          <>
            <div className="font-bold text-green-900 text-lg">
              {driver.fullname}
            </div>
            <div className="text-gray-700 text-sm">
              <span className="font-medium pr-4">ID:</span> {driver.id_number}
            </div>
            <div className="text-black text-base pt-0.5">
              <span className="font-medium">Car:</span>{" "}
              {driver.car_registration}
            </div>
            <div className="text-black text-base pt-0.5">
              <span className="font-medium">Destination:</span>{" "}
              {data.driverDestination || driver.destination}
            </div>
          </>
        ) : (
          <div className="text-gray-500 italic">No driver!</div>
        )}
      </section>

      {/* DETAILS */}
      <section className="mb-3 p-4 rounded-xl border border-gray-300 bg-gray-50">
        <h4 className="font-semibold mb-2 text-gray-700">Invoice Details</h4>
        <div>
          <span className="font-medium">Date:</span>{" "}
          <span className="text-black">{data.date}</span>
        </div>
        <div>
          <span className="font-medium">Notes:</span>{" "}
          <span className="text-black">
            {data.notes || <span className="opacity-50">(None)</span>}
          </span>
        </div>
      </section>

      {error && <p className="text-red-600 font-semibold">{error}</p>}
      {success && <p className="text-green-600 font-semibold">{success}</p>}

      <div className="flex justify-between gap-3 mt-8">
        <button
          onClick={prevStep}
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 shadow"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-5 py-2 rounded-lg font-semibold text-white shadow ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating..." : "Create Invoice"}
        </button>
      </div>
    </div>
  );
}
