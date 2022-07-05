import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../src/app';
import Ticket from '../src/models/Ticket';

async function createTickets() {
  const ticket1 = new Ticket({
    _id: '52a0d0136e766c0e3d0c78af',
    name: '1 alkalmas jegy',
    description: 'Felhasználható csoportos órákon',
    price: '3.000 Ft',
    validity: '1 alkalom',
  });
  const ticket2 = new Ticket({
    _id: '62a0d0136e766c0e3d0c78af',
    name: '2 alkalmas jegy',
    description: 'Felhasználható csoportos órákon',
    price: '5.000 Ft',
    validity: '2 alkalom',
  });
  const ticket3 = new Ticket({
    _id: '62aa68f2e26aeee64245e5d2',
    name: '1 havi bérlet',
    description: 'Felhasználható csoportos órákon',
    price: '23.000 Ft',
    validity: '1 hónap',
  });

  await Ticket.insertMany([ticket1, ticket2, ticket3]);
}

beforeAll(async () => {
  dotenv.config();
  await mongoose.connect(process.env.TEST_MONGO_URI);
  await createTickets();
}, 30000);

afterAll(async () => {
  await Ticket.deleteMany();
  mongoose.connection.close();
});

describe('GET /api/tickets', () => {
  test('should respond with 200 and all tickets', (done) => {
    request(app)
      .get('/api/tickets')
      .set('Content-Type', 'application/json')
      .send({})
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          tickets: [
            {
              __v: 0,
              _id: '52a0d0136e766c0e3d0c78af',
              description: 'Felhasználható csoportos órákon',
              name: '1 alkalmas jegy',
              price: '3.000 Ft',
              validity: '1 alkalom',
            },
            {
              __v: 0,
              _id: '62a0d0136e766c0e3d0c78af',
              description: 'Felhasználható csoportos órákon',
              name: '2 alkalmas jegy',
              price: '5.000 Ft',
              validity: '2 alkalom',
            },
            {
              __v: 0,
              _id: '62aa68f2e26aeee64245e5d2',
              description: 'Felhasználható csoportos órákon',
              name: '1 havi bérlet',
              price: '23.000 Ft',
              validity: '1 hónap',
            },
          ],
        });
        return done();
      });
  });
});
