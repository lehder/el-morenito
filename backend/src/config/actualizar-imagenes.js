import pool from './db.js';

const imagenes = [
  { slug: 'reformas-integrales', url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80' },
  { slug: 'cerrajeria-soldadura', url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80' },
  { slug: 'albanileria-general', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=800&q=80' },
  { slug: 'fontaneria-climatizacion', url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80' },
  { slug: 'carpinteria-madera', url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80' },
  { slug: 'placas-solares', url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80' },
  { slug: 'losa-hormigon-pulido', url: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=800&q=80' }
];

async function actualizar() {
  try {
    for (const item of imagenes) {
      await pool.query('UPDATE servicios SET imagen_url = ? WHERE slug = ?', [item.url, item.slug]);
    }
    console.log('✅ ¡Todas las imágenes fueron actualizadas con éxito en Clever Cloud!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al actualizar:', error.message);
    process.exit(1);
  }
}

actualizar();
