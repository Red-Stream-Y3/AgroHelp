const request = require('supertest');
import app from '../index.js';
import mongoose from 'mongoose';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
import findConfig from 'find-config';
import { ObjectId } from 'mongoose';

dotenv.config({ path: findConfig('.env.dev') });

let authToken, adminToken;
let userId, adminId;

const testAdmin = {
  username: 'Benjamin',
  email: 'benjamin@gmail.com',
  password: 'user123',
  role: 'admin',
  firstName: 'Benjamin',
  lastName: 'Lee',
  profilePic:
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
};

const testUser = {
  username: 'testuser',
  email: 'testuser@test.com',
  password: 'test123',
  role: 'regular',
  firstName: 'test',
  lastName: 'user',
  profilePic:
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Controller', () => {
  test('Should register a user - POST /api/users', async () => {
    const res = await request(app).post('/api/users').send(testUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('username', 'testuser');
    expect(res.body).toHaveProperty('firstName', 'test');
    expect(res.body).toHaveProperty('lastName', 'user');
    expect(res.body).toHaveProperty('email', 'testuser@test.com');
    expect(res.body).toHaveProperty('token');
  });

  test('Should login a user with valid credentials - POST /api/users/login', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'testuser@test.com',
      password: 'test123',
    });
    authToken = res.body.token;
    userId = res.body._id.toString();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('username', 'testuser');
    expect(res.body).toHaveProperty('email', 'testuser@test.com');
    expect(res.body).toHaveProperty('token');
  });

  test('Should login a admin with valid credentials - POST /api/users/login', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'benjamin@gmail.com',
      password: 'user123',
    });
    adminToken = res.body.token;
    adminId = res.body._id.toString();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('username', 'Benjamin');
    expect(res.body).toHaveProperty('email', 'benjamin@gmail.com');
    expect(res.body).toHaveProperty('token');
  });

  test('Should return an error with incorrect email and password - POST /api/users/login', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'invalid@test.com',
      password: 'invalid123',
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error', 'Invalid email and password');
  });

  test('Return the user profile when passed a valid auth token - GET api/users/profile', async () => {
    const response = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    expect(response.body.username).toBe(testUser.username);
    expect(response.body.email).toBe(testUser.email);
    expect(response.body.firstName).toBe(testUser.firstName);
    expect(response.body.lastName).toBe(testUser.lastName);
    expect(response.body.profilePic).toBe(testUser.profilePic);
    expect(response.body.role).toBe(testUser.role);
  });

  test('Return 401 unauthorized error when passed an invalid auth token - GET api/users/profile', async () => {
    const response = await request(app)
      .get('/api/users/profile')
      .set('Authorization', 'Bearer invalidtoken')
      .expect(401);
    expect(response.body.message).toBe('Not authorized, token failed');
  });

  test('Update the user profile when passed a valid auth token and valid update data - PUT api/users/profile', async () => {
    const updateData = {
      username: 'newusername',
      firstName: 'New',
      lastName: 'Name',
      email: 'newemail@test.com',
      profilePic: 'newprofilepic.png',
      password: 'newpassword',
    };
    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateData)
      .expect(200);
    expect(response.body.username).toBe(updateData.username);
    expect(response.body.email).toBe(updateData.email);
    expect(response.body.firstName).toBe(updateData.firstName);
    expect(response.body.lastName).toBe(updateData.lastName);
    expect(response.body.profilePic).toBe(updateData.profilePic);
    expect(response.body.role).toBe(testUser.role);
    expect(response.body).toHaveProperty('token');
    authToken = response.body.token;
  });

  test('Return 401 unauthorized error when passed an invalid auth token - PUT api/users/profile', async () => {
    const updateData = { username: 'newusername' };
    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', 'Bearer invalidtoken')
      .send(updateData)
      .expect(401);
    expect(response.body.message).toBe('Not authorized, token failed');
  });

  test('Update user role if user is found - PUT api/users/:id', async () => {
    const user = await User.findOne({ username: testAdmin.username });
    const newRole = 'admin';
    const response = await request(app)
      .put(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ role: newRole });
    expect(response.status).toBe(200);
    expect(response.body.role).toBe(newRole);
  });

  // test('Returns 404 if user is not found', async () => {
  //   const response = await request(app)
  //     .put(`/api/users/${new ObjectId('123')}`)
  //     .set('Authorization', `Bearer ${authToken}`);
  //   expect(response.status).toBe(404);
  //   expect(response.body.message).toBe('User not found');
  // });

  test('Should return not authorized error if the user is not an admin or moderator - GET api/users', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      'Not authorized as an admin or moderator'
    );
  });

  test('Should return the user with the specified id - GET api/users/:id', async () => {
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(userId);
    expect(response.body.email).toBe('newemail@test.com');
    expect(response.body.password).toBeUndefined();
  });

  test('Delete user if user is found - DELETE api/users/:id', async () => {
    const user = await User.findOne({ username: 'newusername' });
    const response = await request(app)
      .delete(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
    const deletedUser = await User.findById(user._id);
    expect(deletedUser).toBe(null);
  });

  // test('Returns 404 if user is not found', async () => {
  //   const response = await request(app)
  //     .delete(`/api/users/${new ObjectId('123')}`)
  //     .set('Authorization', `Bearer ${authToken}`);
  //   expect(response.status).toBe(404);
  //   expect(response.body.message).toBe('User not found');
  // });

  test('Should return all users - GET api/users', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
  });

  test('Should return an error if the user is not authenticated - GET api/users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Not authorized, no token');
  });

  test('Should return an error if the user is not an admin - GET /api/users/:id}', async () => {
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      'Not authorized as an admin or moderator'
    );
  });

  test('Should return an error if the user is not authenticated - GET /api/users/:id', async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Not authorized, no token');
  });
});
