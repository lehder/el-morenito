import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcryptjs';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

async function resetearAdmin() {
  const email = 'admin@elmorenito.com';
  const clavePlana = 'AdminMorenito2026!';
  const nombre = 'Administrador Morenito';

  try {
    const passwordHash = await bcrypt.hash(clavePlana, 10);

    await pool.query('DELETE FROM usuarios WHERE email = ?', [email]);

    await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, passwordHash, 'admin']
    );

    console.log('✅ Usuario Administrador recreado con éxito en Clever Cloud:');
    console.log(`   📧 Correo:     ${email}`);
    console.log(`   🔑 Contraseña: ${clavePlana}`);
    
    const [filas] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    const coincide = await bcrypt.compare(clavePlana, filas[0].password);
    console.log(`   🔒 Prueba de verificación hash: ${coincide ? 'VÁLIDA (OK)' : 'FALLIDA'}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al resetear admin:', error.message);
    process.exit(1);
  }
}

resetearAdmin();
