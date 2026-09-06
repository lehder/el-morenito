import pool from '../config/db.js';

// Obtener servicios con paginación
export const obtenerServicios = async (req, res) => {
  try {
    const pagina = parseInt(req.query.pagina, 10) || 1;
    const limite = parseInt(req.query.limite, 10) || 6;
    const offset = (pagina - 1) * limite;

    const [conteo] = await pool.query('SELECT COUNT(*) as total FROM servicios');
    const totalServicios = conteo[0].total;
    const totalPaginas = Math.ceil(totalServicios / limite);

    const [filas] = await pool.query(
      'SELECT * FROM servicios ORDER BY creado_en DESC LIMIT ? OFFSET ?',
      [limite, offset]
    );

    res.json({
      exito: true,
      datos: filas,
      paginacion: {
        total: totalServicios,
        pagina,
        limite,
        totalPaginas
      }
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener los servicios',
      error: error.message
    });
  }
};

// Obtener un único servicio por ID
export const obtenerServicioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [filas] = await pool.query('SELECT * FROM servicios WHERE id = ?', [id]);

    if (filas.length === 0) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Servicio no encontrado'
      });
    }

    res.json({
      exito: true,
      datos: filas[0]
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener el servicio',
      error: error.message
    });
  }
};

// Crear un nuevo servicio
export const crearServicio = async (req, res) => {
  try {
    const { titulo, descripcion, categoria, imagen_url } = req.body;

    if (!titulo || !categoria) {
      return res.status(400).json({
        exito: false,
        mensaje: 'El título y la categoría son campos obligatorios'
      });
    }

    const [resultado] = await pool.query(
      'INSERT INTO servicios (titulo, descripcion, categoria, imagen_url) VALUES (?, ?, ?, ?)',
      [titulo, descripcion || '', categoria, imagen_url || '']
    );

    res.status(201).json({
      exito: true,
      mensaje: 'Servicio creado correctamente',
      datos: {
        id: resultado.insertId,
        titulo,
        descripcion,
        categoria,
        imagen_url
      }
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al crear el servicio',
      error: error.message
    });
  }
};

// Eliminar un servicio
export const eliminarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await pool.query('DELETE FROM servicios WHERE id = ?', [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Servicio no encontrado'
      });
    }

    res.json({
      exito: true,
      mensaje: 'Servicio eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al eliminar el servicio',
      error: error.message
    });
  }
};
