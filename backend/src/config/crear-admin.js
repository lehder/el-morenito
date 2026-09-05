import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

async function crearAdmin() {
  const email = 'admin@elmorenito.com';
  const passwordPlana = 'AdminMorenito2026!';
  const nombre = 'Administrador Morenito';

  try {
    const passwordHash = await bcrypt.hash(passwordPlana, 10);
    await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE password = VALUES(password)',
      [nombre, email, passwordHash, 'admin']
    );
    console.log('✅ Usuario Administrador listo en Clever Cloud:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${passwordPlana}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear admin:', error.message);
    process.exit(1);
  }
}

crearAdmin();
