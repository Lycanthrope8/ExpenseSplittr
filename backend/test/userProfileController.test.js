const { getUserProfile } = require('../controllers/userProfileController');
const UserProfile = require('../models/userProfileModel'); // Assuming the location of your UserProfile model file

// Mocking the UserProfile model
jest.mock('../models/userProfileModel', () => ({
  findOne: jest.fn(),
}));

describe('getUserProfile', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock usage data after each test
  });

  it('should get user profile successfully', async () => {
    const mockUser = { userId: '662b41d4f95bb76f7ca9a30c', name: '' };
    UserProfile.findOne.mockResolvedValue(mockUser);

    const req = { params: { userId: '662b41d4f95bb76f7ca9a30c' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUserProfile(req, res);

    expect(UserProfile.findOne).toHaveBeenCalledWith({ userId: '662b41d4f95bb76f7ca9a30c' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('should handle errors', async () => {
    const errorMessage = 'Database error';
    UserProfile.findOne.mockRejectedValue(new Error(errorMessage));

    const req = { params: { userId: '662b41d4f95bb76f7ca9a30c' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUserProfile(req, res);

    expect(UserProfile.findOne).toHaveBeenCalledWith({ userId: '662b41d4f95bb76f7ca9a30c' });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
