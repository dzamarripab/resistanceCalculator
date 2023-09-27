const calculateOhmValue = require('../calculateOhmValue');
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

describe('calculateOhmValue function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly calculate ohm value based on provided bands', async () => {
    const result = await calculateOhmValue('Red', 'Red', 'Red', 'Red');
    expect(result).toEqual({ ohmValue: 2200, tolerance: 1 });
  });
});
