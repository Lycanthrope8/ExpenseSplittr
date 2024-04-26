const { getUserProfile, createUserProfile, updateUserProfile } = require('../controllers/userProfileController');

const UserProfile = require('../models/userProfileModel');


// Mocking the UserProfile model
jest.mock('../models/userProfileModel', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
}));



describe('User Profile Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock usage data after each test
  });

  describe('getUserProfile', () => {
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

  });

  describe('createUserProfile', () => {
    it('should create a new user profile successfully', async () => {
      const mockUser = {
        name: 'John Doe',
        age: 30,
        gender: 'male',
        phone: '1234567890',
        address: '123 Main St',
        avatar: '/path/to/avatar.jpg',
        userId: '662b41d4f95bb76f7ca9a30c',
      };

      const req = {
        params: { userId: '662b41d4f95bb76f7ca9a30c' },
        body: mockUser,
        file: { path: '/path/to/avatar.jpg' }, // Mock file object
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      UserProfile.create.mockResolvedValue(mockUser); // Mock the create method

      await createUserProfile(req, res);

      expect(UserProfile.create).toHaveBeenCalledWith({
        name: 'John Doe',
        age: 30,
        gender: 'male',
        phone: '1234567890',
        address: '123 Main St',
        avatar: '/path/to/avatar.jpg',
        userId: '662b41d4f95bb76f7ca9a30c',
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

  });

  describe('updateUserProfile', () => {
    it('should update user profile successfully', async () => {
      const mockUpdatedUser = {
        userId: '662b41d4f95bb76f7ca9a30c',
        name: 'Updated Name',
        age: 35,
        gender: 'female',
        phone: '9876543210',
        address: '456 Park Ave',
        avatar: '/path/to/updated_avatar.jpg',
      };

      UserProfile.findOneAndUpdate.mockResolvedValue(mockUpdatedUser);

      const req = {
        params: { userId: '662b41d4f95bb76f7ca9a30c' },
        body: {
          name: 'Updated Name',
          age: 35,
          gender: 'female',
          phone: '9876543210',
          address: '456 Park Ave',
        },
        file: { path: '/path/to/updated_avatar.jpg' }, // Mock file object
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateUserProfile(req, res);

      expect(UserProfile.findOneAndUpdate).toHaveBeenCalledWith(
        { userId: '662b41d4f95bb76f7ca9a30c' },
        {
          $set: {
            name: 'Updated Name',
            age: 35,
            gender: 'female',
            phone: '9876543210',
            address: '456 Park Ave',
            avatar: '/path/to/updated_avatar.jpg',
          },
        },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedUser);
    });

  });
   
});
