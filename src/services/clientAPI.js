import api from "./api";

export async function getClients() {
  const response = await api.get("/clients");
  return response.data;
}

export async function getClientById(id) {
  const response = await api.get(`/clients/${id}`);
  return response.data;
}

export async function createClient(clientData) {
  const response = await api.post("/clients", clientData);
  return response.data;
}

export async function updateClient(id, clientData) {
  const response = await api.put(`/clients/${id}`, clientData);
  return response.data;
}

export async function deleteClient(id) {
  const response = await api.delete(`/clients/${id}`);
  return response.data;
}
