import React from "react";

export default function StepInvoiceDetails({
  data,
  updateData,
  nextStep,
  prevStep,
}) {
  const inputBase =
    "w-full px-4 py-2 border-2 rounded-lg shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition bg-white text-black";

  function handleNext() {
    // Date is already pre-filled, so no strong validation required
    nextStep();
  }

  return (
    <div>
      {/* Date */}
      <div className="mb-4">
        <label className="block font-semibold mb-1 text-black">
          Invoice Date
        </label>
        <input
          type="date"
          value={data.date}
          onChange={(e) => updateData({ date: e.target.value })}
          className={inputBase}
        />
      </div>

      {/* Notes */}
      <div className="mb-4">
        <label className="block font-semibold mb-1 text-black">
          Notes (Optional)
        </label>
        <textarea
          rows="4"
          value={data.notes}
          onChange={(e) => updateData({ notes: e.target.value })}
          placeholder="Any additional notes for this invoice..."
          className={`${inputBase} resize-none`}
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
    </div>
  );
}
