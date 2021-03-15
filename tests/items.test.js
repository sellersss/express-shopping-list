process.env.NODE_ENV = 'test'

const request = require('supertest')
const app = require('../app')
const items = require('../utils/db')

beforeEach(async () => {
  items.reset();
  items.add('Milk', 6);
});

afterEach(async () => {
  items.reset();
});

describe('GET: /items', () => {
  test('Lists all items', async () => {
    const res = await request(app).get('/items');
    const { items } = res.body;

    expect(res.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
  test('Bad response', async () => {
    const res = await request(app).get('/NotItem');

    expect(res.statusCode).toBe(500);
  });
});

describe('POST: /items', () => {
  test('Test new item creation', async () => {
    const res = await request(app)
      .post('/items')
      .send({
        'name': 'Ground Beef',
        'price': 15,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      'status': 201,
      'item': {
        'name': 'Ground Beef',
        'price': 15,
      }
    });
  });
});

describe('PATCH: /items/:item', () => {
  test('Test update of name and price on a specific item', async () => {
    const res = await request(app)
      .patch('/items/Milk')
      .send({
        'name': 'Gallon of Milk',
        'price': 8.57,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      'status': 200,
      'updated': {
        'name': 'Gallon of Milk',
        'price': 8.57,
      },
    });
  });
});

describe('DELETE: /items/:item', () => {
  test('Test deleting an item from list', async () => {
    const res = await request(app).delete('/items/Milk');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      'status': 200,
      'message': 'Milk has been removed.'
    });
  });
});
