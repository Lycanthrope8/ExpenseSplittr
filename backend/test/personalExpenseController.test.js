// personalExpenseController.test.js
const {
    getExpenses,
    getExpense,
    createExpense,
    deleteExpense,
    updateExpense
  } = require('../controllers/personalExpenseController');
  
  const PersonalExpense = require('../models/personalExpenseModel');
  const mongoose = require('mongoose');
  
  // Mocking the PersonalExpense model
  jest.mock('../models/personalExpenseModel');
  
  describe('Personal Expense Controller', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Clear mock usage data after each test
    });
  
    
  
    describe('getExpense', () => {
      it('should get a single expense successfully', async () => {
        const mockExpense = { title: 'Expense 1' };
        const req = { params: { id: 'expense_id' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
  
        PersonalExpense.findById.mockResolvedValue(mockExpense);
  
        await getExpense(req, res);
  
        expect(PersonalExpense.findById).toHaveBeenCalledWith('expense_id');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockExpense);
      });
    });
  
    describe('createExpense', () => {
      it('should create a new expense successfully', async () => {
        const mockExpense = { title: 'Expense 1' };
        const req = {
          user: { _id: '662b41d4f95bb76f7ca9a30c' },
          body: { title: 'Expense 1', amount: 100, tag: 'Food' }
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        PersonalExpense.create.mockResolvedValue(mockExpense);
  
        await createExpense(req, res);
  
        expect(PersonalExpense.create).toHaveBeenCalledWith({
          title: 'Expense 1',
          amount: 100,
          tag: 'Food',
          user_id: '662b41d4f95bb76f7ca9a30c'
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockExpense);
      });
    });
  
    describe('deleteExpense', () => {
      it('should delete an expense successfully', async () => {
        const mockExpense = { title: 'Expense 1' };
        const req = { params: { id: 'expense_id' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
  
        PersonalExpense.findOneAndDelete.mockResolvedValue(mockExpense);
  
        await deleteExpense(req, res);
  
        expect(PersonalExpense.findOneAndDelete).toHaveBeenCalledWith({ _id: 'expense_id' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockExpense);
      });
    });
  
    describe('updateExpense', () => {
      it('should update an expense successfully', async () => {
        const mockExpense = { title: 'Expense 1', amount: 100, tag: 'Food' };
        const req = {
          params: { id: 'expense_id' },
          body: { amount: 150 }
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
  
        PersonalExpense.findOneAndUpdate.mockResolvedValue(mockExpense);
  
        await updateExpense(req, res);
  
        expect(PersonalExpense.findOneAndUpdate).toHaveBeenCalledWith({ _id: 'expense_id' }, { amount: 150 });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockExpense);
      });
    });
  });
  