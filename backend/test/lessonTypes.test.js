import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../src/app';
import LessonType from '../src/models/LessonType';

async function createLessonType() {
  const lessonType1 = new LessonType({
    _id: '627b8aca069d93e828b84de8',
    name: 'Air Yoga',
    description: 'The movement and breath to attain balance in the mind and body. From the Sanskrit to place in a special way',
    featuredImage: 'https://mindbodyg.com/image/',
  });
  const lessonType2 = new LessonType({
    _id: '62a0d0136e766c0e3d0c78af',
    name: 'Hatha Yoga',
    description: 'Vinyasa is a type of yoga breath to attain balance in the mind and body. From the Sanskrit to place in a special way',
    featuredImage: 'https://mindbodygreen-res.cloudinary.com/image/',
  });
  const lessonType3 = new LessonType({
    _id: '62aa68f2e26aeee64245e5d2',
    name: 'Yoga',
    description: 'Yoga that links movement and breath to attain balance in the mind and body. From the Sanskrit to place in a special way',
    featuredImage: 'https://minom.com/image5/',
  });

  await LessonType.insertMany([lessonType1, lessonType2, lessonType3]);
}

beforeAll(async () => {
  dotenv.config();
  await mongoose.connect(process.env.TEST_MONGO_URI);
  await createLessonType();
}, 30000);

afterAll(async () => {
  await LessonType.deleteMany();
  mongoose.connection.close();
});

describe('GET /api/lesson-types', () => {
  test('should respond with 200 and all lesson types', (done) => {
    request(app)
      .get('/api/lesson-types')
      .set('Content-Type', 'application/json')
      .send({})
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          lessonTypes: [
            {
              __v: 0,
              _id: '627b8aca069d93e828b84de8',
              name: 'Air Yoga',
              description: 'The movement and breath to attain balance in the mind and body. From the Sanskrit to place in a special way',
              featuredImage: 'https://mindbodyg.com/image/',
            },
            {
              __v: 0,
              _id: '62a0d0136e766c0e3d0c78af',
              name: 'Hatha Yoga',
              description: 'Vinyasa is a type of yoga breath to attain balance in the mind and body. From the Sanskrit to place in a special way',
              featuredImage: 'https://mindbodygreen-res.cloudinary.com/image/',
            },
            {
              __v: 0,
              _id: '62aa68f2e26aeee64245e5d2',
              name: 'Yoga',
              description: 'Yoga that links movement and breath to attain balance in the mind and body. From the Sanskrit to place in a special way',
              featuredImage: 'https://minom.com/image5/',
            },
          ],
        });
        return done();
      });
  });
});
