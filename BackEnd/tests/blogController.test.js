const request = require('supertest');
import app from '../index.js';
import mongoose from 'mongoose';
import Blog from '../models/blogModel.js';
import blogController from '../controllers/blogController.js';

const user = {}
const config = {
    authorization: "Bearer",
};

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    await request(app).post("/api/users/login").send({
        email: "admin@admin.com",
        password: "admin123",
    }).then((res) => {
        user.token = res.body.token;
        user._id = res.body._id.toString();
        user.username = res.body.username;

        config.authorization = config.authorization + " " + user.token;

    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

//test cases for blogs
describe('Blog Controller', () => {

    const blogId = {};
    
    //create a blog
    test("Should create a blog - POST /api/blog", async () => {
        const res = await request(app)
            .post("/api/blog")
            .send({
                title: "Test Blog",
                body: "This is a test blog",
                tags: "test, blog",
                author: user._id,
            })

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("title", "Test Blog");
        expect(res.body).toHaveProperty("body", "This is a test blog");
        expect(res.body).toHaveProperty("tags", ["test", "blog"]);
        expect(res.body).toHaveProperty("author", user._id);

        //save the created blog id
        if(res) {
            blogId._id = res.body._id;
        }

        console.log('blogID', blogId);

    });

    // //get the created blog
    // test("Should get the created blog - GET /api/blog/:id", async () => {
    //     const res = await request(app)
    //         .get(`/api/blog/${blogId}`);

    //     expect(res.status).toBe(200);
    //     // expect(res.body).toHaveProperty("_id");
    //     // expect(res.body).toHaveProperty("title", "Test Blog");
    //     // expect(res.body).toHaveProperty("body", "This is a test blog");
    //     // expect(res.body).toHaveProperty("tags", ["test", "blog"]);
    //     // expect(res.body).toHaveProperty("author", user._id);
    // });

});