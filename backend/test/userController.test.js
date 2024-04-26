const userController = require('../controllers/userController');
const userModel = require('../models/userModel'); // Add this line to import userModel

jest.mock('../models/userModel', () => ({
  login: jest.fn(),
  signup: jest.fn(),
  get: jest.fn(),
}));

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const mockUser = { _id: '662b41d4f95bb76f7ca9a30c', email: '  [email protected]', password: 'password' };
      userModel.login.mockResolvedValue(mockUser);

      const req = { body: { email: '  [email protected]', password: 'password' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.login(req, res);

      expect(userModel.login).toHaveBeenCalledWith('  [email protected]', 'password');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ userId: mockUser._id, email: mockUser.email, token: expect.any(String) });
    });
  });

  describe('signup', () => {
    it('should signup user successfully', async () => {
      const mockUser = { _id: '662b41d4f95bb76f7ca9a30c', email: '  [email protected]', password: 'password' };
      userModel.signup.mockResolvedValue(mockUser);

      const req = { body: { email: '  [email protected]', password: 'password' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.signup(req, res);

      expect(userModel.signup).toHaveBeenCalledWith('  [email protected]', 'password');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ userId: mockUser._id, email: mockUser.email, token: expect.any(String) });
    });
  });
});
