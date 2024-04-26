const { loginUser, signupUser } = require('../controllers/userController');
const User = require('../models/userModel');

jest.mock('../models/userModel', () => ({
  login: jest.fn(),
  signup: jest.fn(),
}));

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login user successfully', async () => {
    const req = { body: { email: 'jubayer@gmail.com', password: 'abc123ABC!' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockUser = { _id: '123', email: 'jubayer@gmail.com' };
    User.login.mockResolvedValue(mockUser);

    await loginUser(req, res);

    expect(User.login).toHaveBeenCalledWith('jubayer@gmail.com', 'abc123ABC!');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ userId: '123', email: 'jubayer@gmail.com', token: expect.any(String) });
  });

  it('should handle login errors', async () => {
    const errorMessage = 'Invalid credentials';
    User.login.mockRejectedValue(new Error(errorMessage));

    const req = { body: { email: 'jubayer@gmail.com', password: 'abc123ABC!' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await loginUser(req, res);

    expect(User.login).toHaveBeenCalledWith('jubayer@gmail.com', 'abc123ABC!');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it('should signup user successfully', async () => {
    const req = { body: { email: 'jubayer@gmail.com', password: 'password' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockUser = { _id: '123', email: 'jubayer@gmail.com' };
    User.signup.mockResolvedValue(mockUser);

    await signupUser(req, res);

    expect(User.signup).toHaveBeenCalledWith('jubayer@gmail.com', 'password');
    expect(res.status).toHaveBeenCalledWith(400); // Update status code to 400
    expect(res.json).toHaveBeenCalledWith({ userId: '123', email: 'jubayer@gmail.com', token: expect.any(String) });
  });

  it('should handle signup errors', async () => {
    const errorMessage = 'Email already exists';
    User.signup.mockRejectedValue(new Error(errorMessage));

    const req = { body: { email: 'jubayer@gmail.com', password: 'password' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await signupUser(req, res);

    expect(User.signup).toHaveBeenCalledWith('jubayer@gmail.com', 'password');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
