import api from "./api";

export async function getDrivers() {
  const response = await api.get("/drivers");
  return response.data;
}

export async function getDriverById(id) {
  const response = await api.get(`/drivers/${id}`);
  return response.data;
}

export async function createDriver(driverData) {
  const response = await api.post("/drivers", driverData);
  return response.data;
}

export async function updateDriver(id, driverData) {
  const response = await api.put(`/drivers/${id}`, driverData);
  return response.data;
}

export async function deleteDriver(id) {
  const response = await api.delete(`/drivers/${id}`);
  return response.data;
}
