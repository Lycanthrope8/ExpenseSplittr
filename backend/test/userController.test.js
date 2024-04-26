const userController = require('../controllers/userController');
const userModel = require('../models/userModel'); // Add this line to import userModel

jest.mock('../models/userModel', () => ({
  loginUser: jest.fn(),
  signupUser: jest.fn(),
  get: jest.fn(),
}));

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loginUser', () => {
    it('should loginUser user successfully', async () => {
      const mockUser = { _id: '662b41d4f95bb76f7ca9a30c', email: 'jahin8@gmail.com', password: 'abc123ABC!' };
      userModel.loginUser.mockResolvedValue(mockUser);

      const req = { body: { email: 'jahin8@gmail.com', password: 'abc123ABC!' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.loginUser(req, res);

      expect(userModel.loginUser).toHaveBeenCalledWith('jahin8@gmail.com', 'abc123ABC!');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ userId: mockUser._id, email: mockUser.email, token: expect.any(String) });
    });
  });

  describe('signupUser', () => {
    it('should signupUser user successfully', async () => {
      const mockUser = { _id: '662b41d4f95bb76f7ca9a30b', email:'jahin9@gmail.com', password: 'abc123ABC!' };
      userModel.signupUser.mockResolvedValue(mockUser);

      const req = { body: { email: 'jahin9@gmail.com', password: 'abc123ABC!' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.signupUser(req, res);

      expect(userModel.signupUser).toHaveBeenCalledWith('jahin9@gmail.com', 'abc123ABC!');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ userId: mockUser._id, email: mockUser.email, token: expect.any(String) });
    });
  });
});
