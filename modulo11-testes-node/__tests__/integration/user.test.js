import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

// Arquivo com função que limpa o banco antes da execução, para os testes que sejam necessário possuir um banco limpo
import truncate from '../util/truncate';
import factory from '../factories';

import User from '../../src/app/models/User';

// # User
describe('User', () => {
  // Limpa a base antes de cada teste
  beforeEach(async () => {
    await truncate();
  });

  // # Password encript
  it('should encrypt user pass when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456', // Se quiser sobreescrever algo, é só passar ele como objeto
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  // # Register
  it('should be able to register', async () => {
    const user = await factory.attrs('User');
    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.body).toHaveProperty('id'); // verifica se esse retorno possui uma propriedade chamada 'id'
  });

  // # Duplicated email
  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.status).toBe(400);
  });
});
