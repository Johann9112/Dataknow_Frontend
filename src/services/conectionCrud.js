const API_BASE_URL = 'http://localhost:3001'; // URL base del backend

// Función para crear un cliente
export const crearCliente = async (clienteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clienteData),
    });
    
    if (!response.ok) {
      throw new Error('Error al crear el cliente');
    }

    return await response.json(); // Retorna la respuesta del servidor
  } catch (error) {
    console.error('Error en crearCliente:', error);
    throw error;
  }
};

// Función para obtener todos los clientes (puedes agregar más funciones similares)
export const obtenerClientes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener los clientes');
    }

    return await response.json(); // Retorna la lista de clientes
  } catch (error) {
    console.error('Error en obtenerClientes:', error);
    throw error;
  }
};

export const crearFactura = async (facturadata) => {
  try {
    const response = await fetch(`${API_BASE_URL}/facturas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(facturadata),
    });
    
    if (!response.ok) {
      throw new Error('Error al crear la facura');
    }

    return await response.json(); // Retorna la respuesta del servidor
  } catch (error) {
    console.error('Error en crearFactura:', error);
    throw error;
  }
};


