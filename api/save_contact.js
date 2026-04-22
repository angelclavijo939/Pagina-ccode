import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { nombres, apellidos, correo, telefono, mensaje } = req.body;

    if (!nombres || !apellidos || !correo || !telefono) {
      return res.status(400).json({
        error: 'Faltan campos requeridos: nombres, apellidos, correo, telefono'
      });
    }

    if (!correo.includes('@')) {
      return res.status(400).json({ error: 'Correo electrónico inválido' });
    }

    const checkQuery = 'SELECT id FROM clientes_web WHERE telefono = $1';
    const checkResult = await pool.query(checkQuery, [telefono]);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({
        error: 'Este número de teléfono ya está registrado'
      });
    }

    const insertQuery = `
      INSERT INTO clientes_web (nombres, apellidos, correo, telefono, mensaje)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, nombres, apellidos, correo, telefono, fecha_registro
    `;

    const result = await pool.query(insertQuery, [
      nombres.toUpperCase(),
      apellidos.toUpperCase(),
      correo,
      telefono,
      mensaje || ''
    ]);

    await sendNotificationEmail(result.rows[0]);

    return res.status(201).json({
      success: true,
      message: 'Cliente registrado exitosamente',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message
    });
  }
}

async function sendNotificationEmail(cliente) {
  const emailData = {
    to: 'angel.clavijo@yahoo.es',
    subject: 'Nuevo Registro de Cliente - TechPro',
    body: `
      Nombre: ${cliente.nombres} ${cliente.apellidos}
      Email: ${cliente.correo}
      Teléfono: ${cliente.telefono}
      Fecha: ${cliente.fecha_registro}
    `
  };
  console.log('Notificación email:', emailData);
}
