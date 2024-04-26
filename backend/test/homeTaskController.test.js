// homeTaskController.test.js
const {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
} = require('../controllers/homeTaskController');

const HomeTask = require('../models/homeTaskModel');
const mongoose = require('mongoose');

// Mocking the HomeTask model
jest.mock('../models/homeTaskModel');

describe('Home Task Controller', () => {
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

            HomeTask.findById.mockResolvedValue(mockTask);

            await getTask(req, res);

            expect(HomeTask.findById).toHaveBeenCalledWith('task_id');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockTask);
        });
    });

    describe('createTask', () => {
        it('should create a new task successfully', async () => {
            const mockTask = { title: 'Task 1' };
            const req = {
                user: { _id: 'user_id' },
                body: { title: 'Task 1', description: 'Description', deadline: '2024-04-27', completed: false, home_id: 'home_id' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            HomeTask.create.mockResolvedValue(mockTask);

            await createTask(req, res);

            expect(HomeTask.create).toHaveBeenCalledWith({
                title: 'Task 1',
                description: 'Description',
                deadline: '2024-04-27',
                completed: false,
                user_id: 'user_id',
                home_id: 'home_id'
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

            HomeTask.findOneAndDelete.mockResolvedValue(mockTask);

            await deleteTask(req, res);

            expect(HomeTask.findOneAndDelete).toHaveBeenCalledWith({ _id: 'task_id' });
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

            HomeTask.findOneAndUpdate.mockResolvedValue(mockTask);

            await updateTask(req, res);

            expect(HomeTask.findOneAndUpdate).toHaveBeenCalledWith({ _id: 'task_id' }, { description: 'Updated Description' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockTask);
        });
    });
});
