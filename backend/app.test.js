const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server'); // Assuming your server file is named server.js

// Before running tests, connect to the database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
});

// After running tests, disconnect from the database
afterAll(async () => {
  await mongoose.disconnect();
});

describe('Server Routes', () => {
  it('GET /api/user should return status code 200', async () => {
    const response = await request(app).get('/api/user');
    expect(response.statusCode).toBe(200);
  });

  // Add more route tests as needed
});

describe('Socket Connection', () => {
  let server;
  let ioClient;

  // Before each test, start the server and connect a socket client
  beforeEach(done => {
    server = app.listen(() => {
      const port = server.address().port;
      ioClient = require('socket.io-client')(`http://localhost:${port}`);
      ioClient.on('connect', done);
    });
  });

  // After each test, disconnect the socket client and close the server
  afterEach(done => {
    if (ioClient.connected) {
      ioClient.disconnect();
    }
    server.close(done);
  });

  it('should connect to socket server', done => {
    ioClient.on('connect', () => {
      expect(ioClient.connected).toBe(true);
      done();
    });
  });

  // Add more socket tests as needed
});

