const express = require("express");
const bodyParser = require("body-parser");
const request = require("supertest");

const app = express();

const authRoute = require("../src/routes/auth");

const mongoConn = require("../src/config/connection");

const User = require("../src/models/auth");

app.use(bodyParser.json());
app.use("/api/v1", authRoute);

describe("Phonebook App Integration Test", () => {
  beforeAll(async () => {
    mongoConn
      .testConnection()
      .then(async () => {})
      .catch((err) => console.error("connection error", err));
  });

  afterAll(async () => {
    await User.deleteOne({ email: "demo1@gmail.com" });
    await mongoConn.disconnectTest();
  });

  describe("Auth Integration Test", () => {

    const requestBody = {
      email: "demo1@gmail.com",
      password: "1234",
    };

    describe("Create user Test", () => {
      beforeEach(async () => {
        await User.deleteOne({ email: "demo1@gmail.com" });
      });

      it("should create a user", async (done) => {

        const { body } = await request(app)
          .post("/api/v1/register")
          .send(requestBody);

        expect(body).toBeObject();
        expect(body.error).toBeFalse();
        expect(body.message).toEqual("User created.");

        done();
      });
    });

    describe("Authenticate user Test", () => {
      it("should authenticate a user", async (done) => {

        const { body } = await request(app)
          .post("/api/v1/login")
          .send(requestBody);

        expect(body).toBeObject();
        expect(body.error).toBeFalse();
        expect(body.message).toEqual("User authenticated");
        expect(body.data).toBeString();
        expect(body.data).toStartWith("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");

        done();
      });
    });
  });
});
