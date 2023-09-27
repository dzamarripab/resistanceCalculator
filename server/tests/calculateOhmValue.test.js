const calculateOhmValue = require('../calculateOhmValue');

// Mock the database calls for testing
jest.mock('../db', () => ({
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockImplementation(color => {
        // Return mock data for specific colors
        if (color === 'red') return { value: 2, multiplier: 100, tolerance: 2 };
        return null;
    })
}));

describe('Ohm Value Calculator', () => {
    it('calculates correct ohm values', async () => {
        const result = await calculateOhmValue('red', 'red', 'red', 'red');
        expect(result.ohmValue).toBe(2200); // This is a mock test, adjust values accordingly
        expect(result.tolerance).toBe(2);
    });
});