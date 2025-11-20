const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("./app"); 

jest.setTimeout(60000); 

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe("Client routes (integration)", () => {
  it("should create a client", async () => {
    const res = await request(app)
      .post("/api/clients")
      .send({
        businessName: "Test Client",
        contactName: "Raja",
        gstin: "29AAAAA0000A1Z5",
      });

    expect(res.statusCode).toBe(201); 
    expect(res.body.businessName).toBe("Test Client");
    expect(res.body.contactName).toBe("Raja");
  });

  it("should get clients", async () => {
    // Insert a client first
    await request(app)
      .post("/api/clients")
      .send({ businessName: "Client 2", contactName: "Test", gstin: "29AAAAA0000A1Z6" });

    const res = await request(app).get("/api/clients");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].businessName).toBe("Client 2");
  });
});
