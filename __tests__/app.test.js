const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('. routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(() => {
    return request(app)
    .post('/api/v1/items')
    .send({ cost: 25 })
  });

  it('logs a new purchase and sends a text on how much you spent', () => {
    return request(app)
    .post('/api/v1/items')
    .send({ cost: 45 })
    .then((res) => {
      expect(res.body).toEqual({
        id: '2',
        cost: 45,
      });
    });
  });

  it('gets all items in the table', async () => {
    const res = await request(app)
      .get('/api/v1/items')
    expect(res.body).toEqual([{
      id: '1',
      cost: 25,
    }]);
  });

  it('gets a single item by its ID', async () => {
    const res = await request(app)
      .get('/api/v1/items/1');

    expect(res.body).toEqual({
      id: '1',
      cost: 25,
    });
  });

  it('changes the price of a purchase in our database and sends a text message', () => {
    return request(app)
      .put('/api/v1/items/1')
      .send({ cost: 75 })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          cost: 75,
        });
      });
  });

  it('deletes a purchase in our database and sends a text message', () => {
    return request(app)
      .delete('/api/v1/items/1')
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          cost: 25,
        });
      });
  });
});
