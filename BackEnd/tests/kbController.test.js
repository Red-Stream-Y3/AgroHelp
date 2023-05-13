const request = require('supertest');
import app from '../index.js';
import mongoose from 'mongoose';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
import findConfig from 'find-config';

dotenv.config({ path: findConfig('.env') });

let adminToken, contributorToken, userToken;
const adminRole = 'admin';
const contributorRole = 'contributor';
const userRole = 'regular';
let userId, adminId, contributorId, cropId, diseaseId;

const testAdmin = {
  username: 'admin',
  email: 'admin@admin.com',
  password: 'admin123',
  role: 'admin',
};

const testUser = {
  username: 'testuser',
  email: 'testuser@test.com',
  password: 'test123',
  role: 'regular',
};

const testContributor = {
  email: 'user@user.com',
  password: 'user123',
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.create(testUser);
});

// get token for admin
beforeAll(async () => {
  const response = await request(app).post('/api/users/login').send({
    email: testAdmin.email,
    password: testAdmin.password,
  });
  adminToken = response.body.token;
  adminId = response.body._id.toString();
});

// get token for regular user
beforeAll(async () => {
  const response = await request(app).post('/api/users/login').send({
    email: testUser.email,
    password: testUser.password,
  });
  userToken = response.body.token;
  userId = response.body._id.toString();
});

// get token for contributor
beforeAll(async () => {
  const response = await request(app).post('/api/users/login').send({
    email: testContributor.email,
    password: testContributor.password,
  });
  contributorToken = response.body.token;
  contributorId = response.body._id.toString();
});

const testCrop = {
  cropName: 'Beetroot',
  scientificName: 'Beta vulgarisdfdf',
  cropFamily: 'Amaranthaceae',
  cropType: 'Vegetable',
  cropIntro:
    'Beetroot is a root vegetable that grows primarily in the ground with a leafy top that grows aboveground. ',
  cropInfo: {
    climate:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C.',
    season:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C.  ',
    seedType:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C. ',
    soil: 'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C. ',
    fieldPreparation:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C. ',
    fertilizer:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C. ',
    irrigation:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C. ',
    weedControl:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C. ',
    pestControl:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C.',
    harvesting:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C.',
    yield:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C.',
    storage:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C.',
  },
  otherInfo:
    'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C.',
  cropImage:
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
  author: '644d1704ea859d52895dff1a',
};

const testUserCrop = {
  cropName: 'Beetroot',
  scientificName: 'Beta vulgarisf',
  cropFamily: 'Amaranthaceae',
  cropType: 'Vegetable',
  cropIntro:
    'Beetroot is a root vegetable that grows primarily in the ground with a leafy top that grows aboveground. ',
  cropInfo: {
    climate:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C.',
    season:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C.  ',
    seedType:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C. ',
    soil: 'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C. ',
    fieldPreparation:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C. ',
    fertilizer:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C. ',
    irrigation:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C. ',
    weedControl:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C. ',
    pestControl:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C.',
    harvesting:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C.',
    yield:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C.',
    storage:
      'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C.',
  },
  otherInfo:
    'Beetroot is a cool-season crop that grows best in temperatures between 15°C and 20°C.',
  cropImage:
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
  author: '644d1704ea859d52895dff1a',
};

const testDisease = {
  diseaseName: 'Test Disease',
  diseaseSymptoms: 'Beetroot Disease Symptoms',
  diseaseCause: 'Beetroot Disease Cause',
  diseaseTreatment: 'Beetroot Disease Treatment',
  diseasePrevention: 'Beetroot Disease Prevention',
  diseaseCrops: ['Beetroot'],
  diseaseType: 'Bacterial',
  diseaseStatus: 'Active',
  diseaseImage:
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
  author: '644e2f398220de174a016b49',
};

const testUserDisease = {
  diseaseName: 'Test Disease',
  diseaseSymptoms: 'Beetroot Disease Symptoms',
  diseaseCause: 'Beetroot Disease Cause',
  diseaseTreatment: 'Beetroot Disease Treatment',
  diseasePrevention: 'Beetroot Disease Prevention',
  diseaseCrops: ['Beetroot'],
  diseaseType: 'Bacterial',
  diseaseStatus: 'Active',
  diseaseImage:
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
  author: '6457b0bc5e0130e7ae7b0e5b',
};

describe('Crop Controller', () => {
  test('should create a new crop', async () => {
    const response = await request(app)
      .post('/api/crops')
      .send(testCrop)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('cropName', testCrop.cropName);
    expect(response.body).toHaveProperty(
      'scientificName',
      testCrop.scientificName
    );
    expect(response.body).toHaveProperty('cropFamily', testCrop.cropFamily);
    expect(response.body).toHaveProperty('cropType', testCrop.cropType);
    expect(response.body).toHaveProperty('cropIntro', testCrop.cropIntro);
    expect(response.body).toHaveProperty('cropInfo');
    expect(response.body).toHaveProperty('otherInfo', testCrop.otherInfo);
    expect(response.body).toHaveProperty('cropImage', testCrop.cropImage);
    expect(response.body).toHaveProperty('author');
    cropId = response.body._id;
  });

  test('should not create a new crop if not admin or contributor', async () => {
    const response = await request(app)
      .post('/api/crops')
      .send(testUserCrop)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      'Not authorized as an admin or contributor'
    );
  });

  test('should get all crops', async () => {
    const response = await request(app).get('/api/crops');
    expect(response.status).toBe(200);
  });

  test('should get a crop by id', async () => {
    const response = await request(app).get(`/api/crops/${cropId}`);
    expect(response.status).toBe(200);
  });

  test('should search a crop', async () => {
    const res = await request(app).get(`/api/crops/search/q=test`);
    expect(res.status).toBe(200);
  });

  test('should update a crop', async () => {
    const response = await request(app)
      .put(`/api/crops/${cropId}`)
      .send(testCrop)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
  });

  test('should not update a crop if not admin or contributor', async () => {
    const response = await request(app)
      .put(`/api/crops/${cropId}`)
      .send(testCrop)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      'Not authorized as an admin or contributor'
    );
  });

  test('should not delete a crop if not admin or contributor', async () => {
    const response = await request(app)
      .delete(`/api/crops/${cropId}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      'Not authorized as an admin or contributor'
    );
  });

  test('should delete a crop', async () => {
    const response = await request(app)
      .delete(`/api/crops/${cropId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Crop removed');
  });
});

describe('Disease Controller', () => {
  test('should create a new disease', async () => {
    const response = await request(app)
      .post('/api/diseases')
      .send(testDisease)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      'diseaseName',
      testDisease.diseaseName
    );
    expect(response.body).toHaveProperty(
      'diseaseSymptoms',
      testDisease.diseaseSymptoms
    );
    expect(response.body).toHaveProperty(
      'diseaseCause',
      testDisease.diseaseCause
    );
    expect(response.body).toHaveProperty(
      'diseaseTreatment',
      testDisease.diseaseTreatment
    );
    expect(response.body).toHaveProperty(
      'diseasePrevention',
      testDisease.diseasePrevention
    );
    expect(response.body).toHaveProperty(
      'diseaseType',
      testDisease.diseaseType
    );
    expect(response.body).toHaveProperty(
      'diseaseStatus',
      testDisease.diseaseStatus
    );
    expect(response.body).toHaveProperty('author');
    diseaseId = response.body._id;
  });

  test('should not create a new disease if not admin or contributor', async () => {
    const response = await request(app)
      .post('/api/diseases')
      .send(testUserDisease)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      'Not authorized as an admin or contributor'
    );
  });

  test('should get all diseases', async () => {
    const response = await request(app).get('/api/diseases');
    expect(response.status).toBe(200);
  });

  test('should get a disease by id', async () => {
    const response = await request(app).get(`/api/diseases/${diseaseId}`);
    expect(response.status).toBe(200);
  });

  test('should search a crop disease', async () => {
    const res = await request(app).get(`/api/diseases/search/q=test`);
    expect(res.status).toBe(200);
  });

  test('should update a disease', async () => {
    const response = await request(app)
      .put(`/api/diseases/${diseaseId}`)
      .send(testDisease)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
  });

  test('should not update a disease if not admin or contributor', async () => {
    const response = await request(app)
      .put(`/api/diseases/${diseaseId}`)
      .send(testDisease)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      'Not authorized as an admin or contributor'
    );
  });

  test('should not delete a disease if not admin or contributor', async () => {
    const response = await request(app)
      .delete(`/api/diseases/${diseaseId}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      'Not authorized as an admin or contributor'
    );
  });

  test('should delete a disease', async () => {
    const response = await request(app)
      .delete(`/api/diseases/${diseaseId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Crop disease removed');
  });
});

afterAll(async () => {
  await User.findOneAndDelete({ username: 'testuser' });
  await mongoose.connection.close();
});
