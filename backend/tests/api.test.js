import request from 'supertest';
import app from '../src/app.js';
import pool from '../src/config/db.js';

describe('Pruebas de Integración - API El Morenito', () => {

  afterAll(async () => {
    // Cerramos el pool de Clever Cloud para liberar el proceso
    await pool.end();
  });

  describe('GET /api/servicios', () => {
    it('Debe responder con 200 y devolver la estructura paginada', async () => {
      const res = await request(app).get('/api/servicios?pagina=1&limite=6');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('exito', true);
      expect(Array.isArray(res.body.datos)).toBe(true);
      expect(res.body).toHaveProperty('paginacion');
    });
  });

  describe('POST /api/auth/login', () => {
    it('Debe rechazar credenciales incorrectas con 401', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'usuario_invalido@morenito.com',
          password: 'PasswordFalso123!'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('exito', false);
    });

    it('Debe iniciar sesión correctamente con credenciales de admin y retornar un token JWT', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@elmorenito.com',
          password: 'AdminMorenito2026!'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.usuario.rol).toBe('admin');
    });
  });

  describe('Seguridad en Rutas Protegidas (RBAC)', () => {
    it('Debe bloquear la creación de servicios sin token con 401', async () => {
      const res = await request(app)
        .post('/api/servicios')
        .send({
          titulo: 'Prueba no autorizada',
          slug: 'prueba-no-autorizada',
          categoria: 'General'
        });

      expect(res.statusCode).toBe(401);
    });

    it('Debe bloquear la eliminación de servicios con token inválido con 403', async () => {
      const res = await request(app)
        .delete('/api/servicios/999')
        .set('Authorization', 'Bearer token_falso_invalido_123');

      expect(res.statusCode).toBe(403);
    });
  });

});
