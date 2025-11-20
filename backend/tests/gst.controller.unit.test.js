  // backend/tests/gst.controller.unit.test.js
  const axios = require('axios');
  jest.mock('axios');

  const { verifyGST } = require('../controllers/gstController');

  describe('GST Controller (unit)', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('returns parsed GST data when axios responds with data', async () => {
      // Mock MasterGST response shape (adjust to match what your controller expects)
      const mockApiResponse = {
        data: {
          data: {
            lgnm: "TM Traders",
            pradr: {
              addr: {
                bnm: "Shop 1",
                st: "Bengaluru",
                stcd: "29",
                pncd: "560001"
              }
            }
          }
        }
      };

      axios.get.mockResolvedValue(mockApiResponse);

      // Build fake req/res
      const req = { body: { gstin: '29AAICT1443M1ZX' } };
      const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
      };

      await verifyGST(req, res);

      // Expect axios called with correct URL
      expect(axios.get).toHaveBeenCalled();
      // Expect controller forwarded response.data
      expect(res.json).toHaveBeenCalledWith(mockApiResponse.data);
    });

    it('sends 500 when axios throws', async () => {
      axios.get.mockRejectedValue(new Error('network failure'));

      const req = { body: { gstin: '29AAICT1443M1ZX' } };
      const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
      };

      await verifyGST(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'GST lookup failed',
        error: expect.any(String)
      }));
    });
  });
