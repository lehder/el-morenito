import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const servicios = [
  ['Pintura Decorativa e Industrial', 'pintura-decorativa', 'Alisado de paredes, eliminación de gotelé, pintura plástica de alta lavabilidad y esmaltados.', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80', 'Pintura'],
  ['Instalaciones Eléctricas e Iluminación', 'electricidad-iluminacion', 'Cuadros eléctricos certificados, boletines, iluminación LED empotrada y domótica.', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80', 'Electricidad'],
  ['Impermeabilización de Terrazas', 'impermeabilizacion-cubiertas', 'Aplicación de membrana de poliuretano, telas asfálticas y reparación de goteras.', 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80', 'Aislamiento'],
  ['Reformas de Cocinas de Diseño', 'reformas-cocinas', 'Instalación de encimeras de cuarzo, fontanería integrada, muebles y alicatados.', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', 'Cocinas'],
  ['Renovación de Baños y Duchas', 'reformas-banos', 'Cambio de bañera por plato de ducha antideslizante, mamparas y sanitarios suspendidos.', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', 'Baños']
];

async function seed() {
  try {
    for (const s of servicios) {
      await pool.query(
        'INSERT INTO servicios (titulo, slug, descripcion, imagen_url, categoria) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE titulo = VALUES(titulo), imagen_url = VALUES(imagen_url)',
        s
      );
    }
    console.log('✅ Clever Cloud sincronizado con 12 servicios.');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}
seed();
