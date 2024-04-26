const PersonalTask = require('../models/personalTaskModel');
const mongoose = require('mongoose');
const {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
} = require('../controllers/personalTaskController');

jest.mock('../models/personalTaskModel', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findOneAndDelete: jest.fn(),
  findOneAndUpdate: jest.fn()
}));

describe('PersonalTask Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all tasks successfully', async () => {
    const mockTasks = [{ _id: 'task_id_1', title: 'Task 1' }, { _id: 'task_id_2', title: 'Task 2' }];
    PersonalTask.find.mockResolvedValue(mockTasks);

    const req = { user: { _id: 'user_id' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getTasks(req, res);

    expect(PersonalTask.find).toHaveBeenCalledWith({ user_id: req.user._id });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTasks);
  });

  it('should get a single task successfully', async () => {
    const mockTask = { _id: 'task_id', title: 'Task' };
    PersonalTask.findById.mockResolvedValue(mockTask);

    const req = { params: { id: 'task_id' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getTask(req, res);

    expect(PersonalTask.findById).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTask);
  });

  it('should create a new task successfully', async () => {
    const newTask = {
      title: 'New Task',
      description: 'Description',
      deadline: new Date(),
      completed: false,
      user_id: 'user_id'
    };
    const mockCreatedTask = { _id: 'created_task_id', ...newTask };
    PersonalTask.create.mockResolvedValue(mockCreatedTask);

    const req = { body: newTask };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createTask(req, res);

    expect(PersonalTask.create).toHaveBeenCalledWith(newTask);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCreatedTask);
  });

  it('should delete a task successfully', async () => {
    const deletedTaskId = 'deleted_task_id';
    const mockDeletedTask = { _id: deletedTaskId };
    PersonalTask.findOneAndDelete.mockResolvedValue(mockDeletedTask);

    const req = { params: { id: deletedTaskId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await deleteTask(req, res);

    expect(PersonalTask.findOneAndDelete).toHaveBeenCalledWith({ _id: deletedTaskId });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockDeletedTask);
  });

  it('should update a task successfully', async () => {
    const updatedTaskId = 'updated_task_id';
    const updatedTaskData = {
      title: 'Updated Task',
      description: 'Updated Description',
      completed: true
    };
    const mockUpdatedTask = { _id: updatedTaskId, ...updatedTaskData };
    PersonalTask.findOneAndUpdate.mockResolvedValue(mockUpdatedTask);

    const req = { params: { id: updatedTaskId }, body: updatedTaskData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await updateTask(req, res);

    expect(PersonalTask.findOneAndUpdate).toHaveBeenCalledWith({ _id: updatedTaskId }, updatedTaskData);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUpdatedTask);
  });
});
