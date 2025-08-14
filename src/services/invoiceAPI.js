import api from "./api"; // Import your shared Axios instance

// Fetch all invoices from the backend
export async function getInvoices() {
  try {
    const response = await api.get("/invoices");
    return response.data; // Adjust if your backend returns invoices in a nested key
  } catch (error) {
    // Forward backend error message if available
    throw error.response?.data || { message: "Failed to fetch invoices" };
  }
}
// Get invoice by id
export async function getInvoiceById(id) {
  try {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch invoice" };
  }
}

// Create new invoice
export async function createInvoice(data) {
  try {
    const response = await api.post("/invoices", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create invoice" };
  }
}
