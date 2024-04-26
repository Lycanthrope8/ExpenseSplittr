// personalTaskController.test.js
const {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
  } = require('../controllers/personalTaskController');
  
  const PersonalTask = require('../models/personalTaskModel');
  const mongoose = require('mongoose');
  
  // Mocking the PersonalTask model
  jest.mock('../models/personalTaskModel');
  
  describe('Personal Task Controller', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Clear mock usage data after each test
    });
  
  
    describe('getTask', () => {
      it('should get a single task successfully', async () => {
        const mockTask = { title: 'Task 1' };
        const req = { params: { id: 'task_id' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
        // mockReturnValue is directly assigned to the function
  
        PersonalTask.findById.mockResolvedValue(mockTask);
  
        await getTask(req, res);
  
        expect(PersonalTask.findById).toHaveBeenCalledWith('task_id');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockTask);
      });
    });
  
    describe('createTask', () => {
      it('should create a new task successfully', async () => {
        const mockTask = { title: 'Task 1' };
        const req = {
          user: { _id: '662b41d4f95bb76f7ca9a30c' },
          body: { title: 'Task 1', description: 'Description', deadline: '2024-04-27', completed: false }
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        PersonalTask.create.mockResolvedValue(mockTask);
  
        await createTask(req, res);
  
        expect(PersonalTask.create).toHaveBeenCalledWith({
          title: 'Task 1',
          description: 'Description',
          deadline: '2024-04-27',
          completed: false,
          user_id: '662b41d4f95bb76f7ca9a30c'
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockTask);
      });
    });
  
    describe('deleteTask', () => {
      it('should delete a task successfully', async () => {
        const mockTask = { title: 'Task 1' };
        const req = { params: { id: 'task_id' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
        // mockReturnValue is directly assigned to the function
  
        PersonalTask.findOneAndDelete.mockResolvedValue(mockTask);
  
        await deleteTask(req, res);
  
        expect(PersonalTask.findOneAndDelete).toHaveBeenCalledWith({ _id: 'task_id' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockTask);
      });
    });
  
    describe('updateTask', () => {
      it('should update a task successfully', async () => {
        const mockTask = { title: 'Task 1', description: 'Updated Description' };
        const req = {
          params: { id: 'task_id' },
          body: { description: 'Updated Description' }
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
        // mockReturnValue is directly assigned to the function
  
        PersonalTask.findOneAndUpdate.mockResolvedValue(mockTask);
  
        await updateTask(req, res);
  
        expect(PersonalTask.findOneAndUpdate).toHaveBeenCalledWith({ _id: 'task_id' }, { description: 'Updated Description' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockTask);
      });
    });
  });
  
  