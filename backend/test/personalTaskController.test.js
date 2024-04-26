const {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
  } = require('../controllers/personalTaskController');
  const PersonalTask = require('../models/personalTaskModel');
  
  // Mocking the PersonalTask model
  jest.mock('../models/personalTaskModel', () => ({
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findOneAndDelete: jest.fn(),
    findOneAndUpdate: jest.fn()
  }));
  
  describe('PersonalTask Controller', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Clear mock usage data after each test
    });
  
    it('should get all tasks successfully', async () => {
      // Mocking the tasks data
      const mockTasks = [{ title: 'Task 1' }, { title: 'Task 2' }];
      // Mocking the behavior of PersonalTask.find to resolve with the mock tasks
      PersonalTask.find.mockResolvedValue(mockTasks);
  
      // Mocking request and response objects
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(), // Mocking the status method of response
        json: jest.fn() // Mocking the json method of response
      };
  
      // Calling the getTasks function with the mocked request and response
      await getTasks(req, res);
  
      // Assertions
      expect(PersonalTask.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTasks);
    });
  
    it('should get a single task successfully', async () => {
      const mockTask = { _id: 'task_id', title: 'Task 1' };
      PersonalTask.findById.mockResolvedValue(mockTask);
  
      const req = { params: { id: 'task_id' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await getTask(req, res);
  
      expect(PersonalTask.findById).toHaveBeenCalledWith('task_id');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTask);
    });
  
    it('should create a new task successfully', async () => {
      const newTask = { title: 'New Task', description: 'Description', deadline: new Date(), completed: false };
      const mockCreatedTask = { _id: 'new_task_id', ...newTask };
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
      const mockDeletedTask = { _id: 'deleted_task_id', title: 'Task to delete' };
      PersonalTask.findOneAndDelete.mockResolvedValue(mockDeletedTask);
  
      const req = { params: { id: 'deleted_task_id' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await deleteTask(req, res);
  
      expect(PersonalTask.findOneAndDelete).toHaveBeenCalledWith({ _id: 'deleted_task_id' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockDeletedTask);
    });
  
    it('should update a task successfully', async () => {
      const updatedTaskData = { title: 'Updated Task', description: 'Updated Description', completed: true };
      const mockUpdatedTask = { _id: 'updated_task_id', title: 'Updated Task', description: 'Updated Description', completed: true };
      PersonalTask.findOneAndUpdate.mockResolvedValue(mockUpdatedTask);
  
      const req = { params: { id: 'updated_task_id' }, body: updatedTaskData };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await updateTask(req, res);
  
      expect(PersonalTask.findOneAndUpdate).toHaveBeenCalledWith({ _id: 'updated_task_id' }, updatedTaskData);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedTask);
    });
  });
  