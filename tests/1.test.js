const { expect } = require("@jest/globals");
const request = require("supertest");
const { app } = require("../app");
const mongoose = require("mongoose");

describe("Testing that app is working by  /", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });
  test("Testing that app is working by  /", async (done) => {
    await request(app)
      .get("/")
      .then(async (response) => {
        expect(response.statusCode == 200).toBeTruthy();
        done();
      });
  });
});
