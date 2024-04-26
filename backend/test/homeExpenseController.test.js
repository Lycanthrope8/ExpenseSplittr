const request = require('supertest');
const app = require('../server'); // Import the app object from server.js
const HomeExpense = require('../models/homeExpenseModel');

describe('Home Expense Controller', () => {
  describe('getExpenses', () => {
    // Mock HomeExpense.find function
    HomeExpense.find = jest.fn();

    it('should get all expenses for a home successfully', async () => {
      const home_id = 'dummy_home_id';
      const expectedExpenses = [{ title: 'Expense 1' }, { title: 'Expense 2' }];
      HomeExpense.find.mockResolvedValue(expectedExpenses);

      const response = await request(app).get(`/api/homeExpenses/${home_id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedExpenses);
      expect(HomeExpense.find).toHaveBeenCalledWith({ home_id });
    });

    it('should handle errors when getting expenses', async () => {
      const home_id = 'dummy_home_id';
      HomeExpense.find.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get(`/api/homeExpenses/${home_id}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
      expect(HomeExpense.find).toHaveBeenCalledWith({ home_id });
    });
  });

  describe('getExpense', () => {
    it('should get a single expense successfully', async () => {
      const expenseId = 'dummy_expense_id';
      const expectedExpense = { title: 'Expense 1' };
      HomeExpense.findById = jest.fn().mockResolvedValue(expectedExpense);

      const response = await request(app).get(`/api/homeExpenses/expense/${expenseId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedExpense);
      expect(HomeExpense.findById).toHaveBeenCalledWith(expenseId);
    });

    it('should handle error when expense not found', async () => {
      const expenseId = 'dummy_expense_id';
      HomeExpense.findById = jest.fn().mockResolvedValue(null);

      const response = await request(app).get(`/api/homeExpenses/expense/${expenseId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'No such expense' });
      expect(HomeExpense.findById).toHaveBeenCalledWith(expenseId);
    });

    it('should handle error for invalid expense ID', async () => {
      const invalidExpenseId = 'invalid_id';

      const response = await request(app).get(`/api/homeExpenses/expense/${invalidExpenseId}`);

      expect(response.statusCode).toBe(404);
    });
  });

//   describe('createExpense', () => {
//     Add test cases for createExpense function
//   });

//   describe('deleteExpense', () => {
//     Add test cases for deleteExpense function
//   });

//   describe('updateExpense', () => {
//     Add test cases for updateExpense function
//   });
});

