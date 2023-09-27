const request = require('supertest');
const app = require('../index');
const db = require('../db');

jest.mock('../db', () => {
  return jest.fn().mockImplementation((tableName) => {
    if (tableName === 'resistor_colors') {
      return {
        where: jest.fn().mockImplementation((column, value) => {
          if (value === 'Red') {
            return {
              first: jest.fn().mockResolvedValue({
                color: 'Red',
                value: 2,
                multiplier: 100,
                tolerance: 1,
              }),
            };
          }
          return { first: jest.fn().mockResolvedValue(null) };
        }),
      };
    }
    return {};
  });
});

describe('POST /calculate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should respond with 400 if not all color bands are provided', async () => {
    const response = await request(app).post('/calculate').send({
      bandAColor: 'Red',
      bandBColor: 'Green',
      bandCColor: 'Yellow',
      // Missing bandDColor
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: 'All color bands must be provided',
    });
  });

  it('should calculate ohm value for provided bands and return as JSON', async () => {
    const response = await request(app).post('/calculate').send({
      bandAColor: 'Red',
      bandBColor: 'Red',
      bandCColor: 'Red',
      bandDColor: 'Red',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('ohmValue');
    expect(response.body).toHaveProperty('tolerance');
  });
});
