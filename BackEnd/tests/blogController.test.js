const request = require('supertest');
import app from '../index.js';
import mongoose from 'mongoose';
import Blog from '../models/blogModel.js';
import blogController from '../controllers/blogController.js';

const user = {};
const config = {
  authorization: 'Bearer',
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await request(app)
    .post('/api/users/login')
    .send({
      email: 'sophia@hotmal.com',
      password: 'user123',
    })
    .then((res) => {
      user.token = res.body.token;
      user._id = res.body._id.toString();
      user.username = res.body.username;

      config.authorization = config.authorization + ' ' + user.token;
    });
});

afterAll(async () => {
  await mongoose.connection.close();
});

//test cases for blogs
describe('Blog Controller', () => {
  const blogId = {};
  let commentId;

  //   create a blog
  test('Should create a blog - POST /api/blog', async () => {
    const res = await request(app).post('/api/blog').send({
      title: 'Test Blog',
      body: 'This is a test blog',
      tags: 'test, blog',
      author: user._id,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('title', 'Test Blog');
    expect(res.body).toHaveProperty('body', 'This is a test blog');
    expect(res.body).toHaveProperty('tags', ['test', 'blog']);
    expect(res.body).toHaveProperty('author', user._id);

    //save the created blog id
    if (res) {
      blogId._id = res.body._id;
    }

    console.log('blogID', blogId);
  });

  test('Should get all blogs - GET /api/blog', async () => {
    const res = await request(app).get('/api/blog');

    expect(res.status).toBe(200);
  });

  //update a blog
  test('Should update a blog - PUT /api/blog/:id', async () => {
    const res = await request(app)
      .put(`/api/blog/${blogId._id}`)
      .send({
        title: 'Test Blog',
        body: 'This is a test blog',
        tags: ['test, blog'],
        author: user._id,
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('title', 'Test Blog');
    expect(res.body).toHaveProperty('body', 'This is a test blog');
    // expect(res.body).toHaveProperty('tags', ['test', 'blog']);
    expect(res.body).toHaveProperty('author', user._id);
  });

  test('Should create new comment - POST /api/blog/comment/:id', async () => {
    const response = await request(app)
      .post(`/api/blog/comment/${blogId._id}`)
      .send({
        text: 'This is a comment',
        postedBy: '644eb485d2d6ebdbf6a2d417',
        userName: 'John',
      });

    expect(response.status).toBe(201);
    expect(response.body.comments).toHaveLength(1);
    expect(response.body.comments[0]).toHaveProperty(
      'text',
      'This is a comment'
    );
    expect(response.body.comments[0]).toHaveProperty(
      'postedBy',
      '644eb485d2d6ebdbf6a2d417'
    );
    expect(response.body.comments[0]).toHaveProperty('userName', 'John');
    commentId = response.body.comments[0]._id;
  });

  test('Should delete a blog comment - DELETE /api/blog/comment/:id/:commentId', async () => {
    const response = await request(app).delete(
      `/api/blog/comment/${blogId._id}/${commentId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.comments).toHaveLength(0);
    expect(response.body.comments).toEqual([]);
  });

  test('Should search a blog - GET /api/blog/search/:search', async () => {
    const res = await request(app).get(`/api/blog/search/q=test`);

    expect(res.status).toBe(200);
  });

  //   test('Should like a blog - PUT /api/blog/like/:id', async () => {
  //     const res = await request(app)
  //       .put(`/api/blog/like/${blogId._id}`)
  //       .set('Authorization', config.authorization);

  //     expect(res.status).toBe(200);
  //     expect(res.body.likes).toBe(1);
  //   });

  test('Should update blog as accepted - PUT /api/blog/:id/accept', async () => {
    const res = await request(app)
      .put(`/api/blog/${blogId._id}/accept`)
      .set('Authorization', config.authorization)
      .send({
        isAccepted: true,
      });

    expect(res.status).toBe(200);
    expect(res.body.isAccepted).toBe(true);
  });

  //   test('Should fetch blogs by author - GET /api/blog/author/:id', async () => {
  //     const res = await request(app).get(`/api/blog/author/${user._id}`);

  //     expect(res.status).toBe(200);
  //     expect(res.body.author).toBe('Sophia');
  //   });

  test('Should delete a blog - DELETE /api/blog/:id', async () => {
    const res = await request(app).delete(`/api/blog/${blogId._id}`);

    expect(res.status).toBe(200);
  });
});
