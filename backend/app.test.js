const request = require('supertest');
const express = require('express');
const router = require('./routes/user');

// Mock the controller functions
jest.mock('./controllers/userController', () => ({
  loginUser: jest.fn(),
  signupUser: jest.fn(),
  getAllUsers: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/', router);

describe('User Routes', () => {
  // Test loginUser route
  // Test signupUser route

  // Test getAllUsers route
  describe('GET /getalluser', () => {
    it('should call getAllUsers controller', async () => {
      // Mocking a valid JWT token
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJiNDFkNGY5NWJiNzZmN2NhOWEzMGEiLCJpYXQiOjE3MTQxMTA5MzIsImV4cCI6MTcxNDE5NzMzMn0.hjf4uboz0CWrgNBiyUOB21hm64h0OXkvHSW4_GTqVUM';

      await request(app)
        .get('/getalluser')
        .set('Authorization', `Bearer ${token}`);

      expect(require('./controllers/userController').getAllUsers).toHaveBeenCalled();
    });

    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .get('/getalluser');

      expect(response.status).toBe(401);
    });
  });
});
