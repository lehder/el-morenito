import pool from '../config/db.js';

export const obtenerServicios = async (req, res) => {
  try {
    const pagina = Math.max(1, parseInt(req.query.pagina) || 1);
    const limite = Math.max(1, parseInt(req.query.limite) || 6);
    const offset = (pagina - 1) * limite;

    const [conteo] = await pool.query('SELECT COUNT(*) as total FROM servicios WHERE activo = TRUE');
    const totalRegistros = conteo[0].total;
    const totalPaginas = Math.ceil(totalRegistros / limite);

    const [servicios] = await pool.query(
      'SELECT id, titulo, slug, descripcion, imagen_url, categoria FROM servicios WHERE activo = TRUE ORDER BY id ASC LIMIT ? OFFSET ?',
      [limite, offset]
    );

    return res.status(200).json({
      exito: true,
      datos: servicios,
      paginacion: {
        paginaActual: pagina,
        registrosPorPagina: limite,
        totalRegistros,
        totalPaginas,
        tieneSiguiente: pagina < totalPaginas,
        tieneAnterior: pagina > 1
      }
    });
  } catch (error) {
    return res.status(500).json({ exito: false, mensaje: 'Error al obtener servicios', error: error.message });
  }
};

export const crearServicio = async (req, res) => {
  const { titulo, slug, descripcion, imagen_url, categoria } = req.body;
  if (!titulo || !slug || !descripcion || !categoria) {
    return res.status(400).json({ exito: false, mensaje: 'Faltan campos requeridos del servicio' });
  }

  try {
    const [resultado] = await pool.query(
      'INSERT INTO servicios (titulo, slug, descripcion, imagen_url, categoria) VALUES (?, ?, ?, ?, ?)',
      [titulo, slug, descripcion, imagen_url || '/assets/images/default.webp', categoria]
    );
    return res.status(201).json({ exito: true, mensaje: 'Servicio creado exitosamente', id: resultado.insertId });
  } catch (error) {
    return res.status(500).json({ exito: false, mensaje: 'Error al crear servicio', error: error.message });
  }
};
