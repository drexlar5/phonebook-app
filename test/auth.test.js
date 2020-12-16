const AuthService = require("../src/services/auth");

const mongoConn = require("../src/config/connection");

const User = require("../src/models/auth");

describe("Phonebook App Unit Test", () => {
  beforeAll(async () => {
    mongoConn
      .testConnection()
      .then(async () => {})
      .catch((err) => console.error("connection error", err));
  });

  afterAll(async () => {
    await User.deleteOne({ email: "demo@gmail.com" });
    await mongoConn.disconnectTest();
  });

  describe("Auth service unit Test", () => {
    describe("Create user Test", () => {
      beforeEach(async () => {
        await User.deleteOne({ email: "demo@gmail.com" });
      });

      it("should create a user", async (done) => {
        const data = await AuthService.createUser({
          email: "demo@gmail.com",
          password: "1234",
        });
        expect(data).toBeString();
        expect(data).toMatch("User created.");
        done();
      });
    });

    describe("Authenticate user Test", () => {
      it("should authenticate a user", async (done) => {
        const data = await AuthService.authenticateUser({
          email: "demo@gmail.com",
          password: "1234",
        });
        expect(data).toBeString();
        expect(data).toStartWith("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
        done();
      });
    });
  });
});