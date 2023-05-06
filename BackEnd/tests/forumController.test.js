const request = require('supertest');
import app from '../index.js';
import mongoose from 'mongoose';

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

//test cases for forum routes
describe('Forum Controller', () => {
    const testForum = {};

    //create a forum
    test("Should create a forum - POST /api/forums", async () => {
        const res = await request(app)
            .post("/api/forums")
            .send({
                user: {
                    _id: user._id,
                    username: user.username,
                },
                forum: {
                    title: "Test Forum",
                    content: "This is a test forum",
                },
            })
            .set("Authorization", config.authorization);

        if (res) {
            testForum._id = res.body._id.toString();
        }

        expect(res.status).toBe(256);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("title", "Test Forum");
        expect(res.body).toHaveProperty("content", "This is a test forum");
        expect(res.body).toHaveProperty("userID", user._id);
    });

    //get the created forum
    test("Should get the created forum - GET /api/forums/:id", async () => {
        const res = await request(app)
            .get(`/api/forums/${testForum._id}`)
            .set("Authorization", config.authorization);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("title", "Test Forum");
        expect(res.body).toHaveProperty("content", "This is a test forum");
        expect(res.body).toHaveProperty("userID", user._id);
    });

    //update the created forum
    test("Should update a forum by id - PUT /api/forums/:id", async () => {
        const res = await request(app)
            .put(`/api/forums/${testForum._id}`)
            .send({
                forum: {
                    title: "Test Forum 2",
                    content: "This is a test forum 2",
                },
            })
            .set("Authorization", config.authorization);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("title", "Test Forum 2");
        expect(res.body).toHaveProperty(
            "content",
            "This is a test forum 2"
        );
        expect(res.body).toHaveProperty("userID", user._id);
    });

    //subscribe to the created forum
    test("Should subscribe to a forum by id - POST /api/forums/subscribe/:id", async () => {
        const res = await request(app)
            .post(`/api/forums/subscribe/${testForum._id}`)
            .send({
                user: {
                    _id: user._id,
                },
            })
            .set("Authorization", config.authorization);

        expect(res.status).toBe(255);
        expect(res.body).toHaveProperty("message", "Subscribed to forum");
    });

    //unsubscribe from the created forum
    test("Should unsubscribe from a forum by id - POST /api/forums/unsubscribe/:id", async () => {
        const res = await request(app)
            .post(`/api/forums/unsubscribe/${testForum._id}`)
            .send({
                user: {
                    _id: user._id,
                },
            })
            .set("Authorization", config.authorization);

        expect(res.status).toBe(255);
        expect(res.body).toHaveProperty("message", "Unsubscribed from forum");
    });

    //like the created forum
    test("Should like a forum by id - POST /api/forums/like/:id", async () => {
        const res = await request(app)
            .post(`/api/forums/like/${testForum._id}`)
            .send({
                user: {
                    _id: user._id,
                },
            })
            .set("Authorization", config.authorization);

        expect(res.status).toBe(255);
        expect(res.body).toHaveProperty("message", "Liked forum");
    });

    //dislike the created forum
    test("Should dislike a forum by id - POST /api/forums/dislike/:id", async () => {
        const res = await request(app)
            .post(`/api/forums/dislike/${testForum._id}`)
            .send({
                user: {
                    _id: user._id,
                },
            })
            .set("Authorization", config.authorization);

        expect(res.status).toBe(255);
        expect(res.body).toHaveProperty("message", "Disliked forum");
    });

    //reply to the created forum
    test("Should reply to a forum by id - POST /api/forums/reply/:id", async () => {
        const res = await request(app)
            .post(`/api/forums/reply/${testForum._id}`)
            .send({
                user: {
                    _id: user._id,
                    username: user.username,
                },
                content: "This is a test reply",
            })
            .set("Authorization", config.authorization);

        expect(res.status).toBe(255);
        expect(res.body).toHaveProperty("message", "Replied to forum");
    });

    //resolve the created forum
    test("Should resolve a forum by id - POST /api/forums/resolve/:id", async () => {
        const res = await request(app)
            .post(`/api/forums/resolve/${testForum._id}`)
            .set("Authorization", config.authorization);

        expect(res.status).toBe(255);
        expect(res.body).toHaveProperty("message", "Forum Resolved");
    });

    //get user's forums
    test("Should get user's forums - GET /api/forums/myforums/:user", async () => {
        const res = await request(app)
            .get(`/api/forums/myforums/${user._id}`)
            .set("Authorization", config.authorization);

        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    //delete the created forum
    test("Should delete a forum by id - DELETE /api/forums/:id", async () => {
        const res = await request(app)
            .delete(`/api/forums/${testForum._id}`)
            .set("Authorization", config.authorization);

        expect(res.status).toBe(255);
        expect(res.body).toHaveProperty("message", "Forum removed");
    });
});