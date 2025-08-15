import { useEffect, useState } from "react";
import Button from "../components/Button"; // reuseable button or basic <button>
import { getInvoices } from "../services/invoiceAPI";
import InvoiceWizard from "./InvoiceWizard";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wizardOpen, setWizardOpen] = useState(false);

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  console.log("VITE API baseURL:", import.meta.env.VITE_API_URL),
    console.log("BAKEND URL :", import.meta.env.VITE_BACKEND_URL),
    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        try {
          const data = await getInvoices();
          setInvoices(data);
        } catch (err) {
          setError(err.message || "Failed to load invoices");
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Button onClick={() => setWizardOpen(true)}>+ New Invoice</Button>
      </div>

      {/* Wizard Modal */}
      {wizardOpen && (
        <InvoiceWizard
          onClose={() => {
            setWizardOpen(false);
            getInvoices().then(setInvoices);
          }}
        />
      )}

      {loading && <p className="text-gray-500">Loading invoices...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* TABLE for desktop */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-xl shadow overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">Invoice #</th>
                <th className="py-3 px-4 text-left font-semibold">Client</th>
                <th className="py-3 px-4 text-left font-semibold">Total HT</th>
                <th className="py-3 px-4 text-left font-semibold">Date</th>
                <th className="py-3 px-4 text-left font-semibold">PDF</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr
                  key={inv._id}
                  className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                >
                  <td className="py-3 px-4">{inv.invoice_number}</td>
                  <td className="py-3 px-4">{inv.client?.fullname || "N/A"}</td>
                  <td className="py-3 px-4">{inv.total_ht?.toFixed(3)}</td>
                  <td className="py-3 px-4">
                    {new Date(inv.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() =>
                        window.open(
                          `${BACKEND_URL}${inv.pdf_filepath}`,
                          "_blank"
                        )
                      }
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 shadow"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CARD view for mobile */}
      <div className="md:hidden space-y-4">
        {invoices.map((inv) => (
          <div
            key={inv._id}
            className="bg-white border border-gray-200 rounded-xl shadow p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold text-blue-700">
                #{inv.invoice_number}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(inv.date).toLocaleDateString()}
              </span>
            </div>
            <div className="text-gray-700 mb-1">
              <span className="font-medium">Client: </span>
              {inv.client?.fullname || "N/A"}
            </div>
            <div className="text-gray-700 mb-3">
              <span className="font-medium">Total HT: </span>
              {inv.total_ht?.toFixed(3)}
            </div>
            <button
              onClick={() =>
                window.open(`${BACKEND_URL}${inv.pdf_filepath}`, "_blank")
              }
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 shadow"
            >
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
