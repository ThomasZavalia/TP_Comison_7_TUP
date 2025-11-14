import pool from '../db/db.js';

// GET - Obtener todos los clientes
export const getAll = async (req, res) => {
  try {
    const [clients] = await pool.query('SELECT * FROM clients');
    res.json(clients);
  } catch (error) {
    console.error('Error al obtener clientes:', error.message);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

// GET - Obtener un cliente por ID
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const [client] = await pool.query('SELECT * FROM clients WHERE id = ?', [id]);
    
    if (client.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    
    res.json(client[0]);
  } catch (error) {
    console.error('Error al obtener cliente:', error.message);
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
};

// POST - Crear un nuevo cliente
export const create = async (req, res) => {
  try {
    const { name, phone } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO clients (name, phone) VALUES (?, ?)',
      [name, phone || null]
    );
    
    res.status(201).json({
      id: result.insertId,
      name,
      phone: phone || null
    });
  } catch (error) {
    console.error('Error al crear cliente:', error.message);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

// PUT - Actualizar un cliente
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;
    
    // Verificar que el cliente existe
    const [client] = await pool.query('SELECT * FROM clients WHERE id = ?', [id]);
    
    if (client.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    
    // Actualizar solo los campos que se proporcionan
    const updateName = name !== undefined ? name : client[0].name;
    const updatePhone = phone !== undefined ? phone : client[0].phone;
    
    await pool.query(
      'UPDATE clients SET name = ?, phone = ? WHERE id = ?',
      [updateName, updatePhone, id]
    );
    
    res.json({
      id: parseInt(id),
      name: updateName,
      phone: updatePhone
    });
  } catch (error) {
    console.error('Error al actualizar cliente:', error.message);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

// DELETE - Eliminar un cliente
export const delete_client = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar que el cliente existe
    const [client] = await pool.query('SELECT * FROM clients WHERE id = ?', [id]);
    
    if (client.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    
    await pool.query('DELETE FROM clients WHERE id = ?', [id]);
    
    res.json({ message: 'Cliente eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar cliente:', error.message);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};
