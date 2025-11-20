// backend/tests/gst.route.integration.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('express').json;
const gstRoutes = require('../routes/gstRoutes');
const axios = require('axios');

jest.mock('axios');

let app;

beforeAll(() => {
  app = express();
  app.use(bodyParser());
  app.use('/api/gst', gstRoutes);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('GST route (integration)', () => {
  it('POST /api/gst/verify returns mocked MasterGST data', async () => {
    const mockApiResponse = {
      data: {
        data: {
          lgnm: "Mocked Business",
          pradr: {
            addr: {
              bnm: "Mock Bldg",
              st: "Mumbai",
              stcd: "27",
              pncd: "400001"
            }
          }
        }
      }
    };

    axios.get.mockResolvedValue(mockApiResponse);

    const res = await request(app)
      .post('/api/gst/verify')
      .send({ gstin: '27AAICT1443M1ZX' })
      .expect(200);

    expect(res.body).toEqual(mockApiResponse.data);
    expect(axios.get).toHaveBeenCalled();
  });

  it('returns 500 on axios failure', async () => {
    axios.get.mockRejectedValue(new Error('network error'));

    const res = await request(app)
      .post('/api/gst/verify')
      .send({ gstin: '29AAICT1443M1ZX' })
      .expect(500);

    expect(res.body).toEqual(expect.objectContaining({
      message: 'GST lookup failed',
      error: expect.any(String)
    }));
  });
});
