import pool from './db.js';

const nuevosServicios = [
  {
    titulo: 'Pintura Decorativa e Industrial',
    slug: 'pintura-decorativa',
    descripcion: 'Alisado de paredes, eliminación de gotelé, pintura plástica de alta lavabilidad y esmaltados.',
    imagen_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    categoria: 'Pintura'
  },
  {
    titulo: 'Instalaciones Eléctricas e Iluminación',
    slug: 'electricidad-iluminacion',
    descripcion: 'Cuadros eléctricos certificados, boletines, iluminación LED empotrada y domótica.',
    imagen_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    categoria: 'Electricidad'
  },
  {
    titulo: 'Impermeabilización de Terrazas y Tejados',
    slug: 'impermeabilizacion-cubiertas',
    descripcion: 'Aplicación de membrana de poliuretano, telas asfálticas y reparación de humedades y goteras.',
    imagen_url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    categoria: 'Aislamiento'
  },
  {
    titulo: 'Reformas de Cocinas de Diseño',
    slug: 'reformas-cocinas',
    descripcion: 'Instalación de encimeras de cuarzo, distribución ergonómica, fontanería integrada y muebles.',
    imagen_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    categoria: 'Cocinas'
  },
  {
    titulo: 'Renovación de Baños y Platos de Ducha',
    slug: 'reformas-banos',
    descripcion: 'Cambio de bañera por plato de ducha de resina antideslizante, mamparas y sanitarios suspendidos.',
    imagen_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    categoria: 'Baños'
  }
];

async function insertar() {
  try {
    for (const s of nuevosServicios) {
      await pool.query(
        'INSERT INTO servicios (titulo, slug, descripcion, imagen_url, categoria) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE titulo = VALUES(titulo)',
        [s.titulo, s.slug, s.descripcion, s.imagen_url, s.categoria]
      );
    }
    console.log('✅ ¡5 nuevos servicios agregados a Clever Cloud! Total: 12 servicios.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al insertar:', error.message);
    process.exit(1);
  }
}

insertar();
