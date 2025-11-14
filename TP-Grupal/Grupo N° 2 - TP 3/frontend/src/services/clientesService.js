import api from './api.js';

// GET - Obtener todos los clientes
export const getClientes = async () => {
  const response = await api.get('/clients');
  return response.data;
};

// GET - Obtener un cliente por ID
export const getClienteById = async (id) => {
  const response = await api.get(`/clients/${id}`);
  return response.data;
};

// POST - Crear un nuevo cliente
export const addCliente = async (nuevoCliente) => {
  const response = await api.post('/clients', nuevoCliente);
  return response.data;
};

// PUT - Actualizar un cliente
export const updateCliente = async (id, clienteActualizado) => {
  const response = await api.put(`/clients/${id}`, clienteActualizado);
  return response.data;
};

// DELETE - Eliminar un cliente
export const deleteCliente = async (id) => {
  const response = await api.delete(`/clients/${id}`);
  return response.data;
};
