const { expect } = require("@jest/globals");
const request = require("supertest");
const { app } = require("../app");
const db = require("mongoose");
const input = require("./inputs.json");
const output = require("./outputs.json");

describe("Testing /findColleges", () => {
  afterAll(async () => {
    await db.disconnect();
  });
  test("Testing /findColleges", async (done) => {
    for (i = 0; i < input.length; i++) {
      await request(app)
        .get("/findColleges")
        .send(input[i])
        .then(async (response) => {
          expect(response.statusCode).toBe(200);
          expect(JSON.stringify(output[i])).toBe(JSON.stringify(response.body));
          done();
        });
    }
  });
  test("Testing /findColleges with invalid input", async (done) => {
    await request(app)
      .get("/findColleges")
      .send({ maxFees: -1 })
      .then(async (response) => {
        expect(response.statusCode).not.toBe(200);
        done();
      });
    await request(app)
      .get("/findColleges")
      .send({ minPackage: -100 })
      .then(async (response) => {
        expect(response.statusCode).not.toBe(200);
        done();
      });
    await request(app)
      .get("/findColleges")
      .send({ minPackage: "random string not a number" })
      .then(async (response) => {
        expect(response.statusCode).not.toBe(200);
        done();
      });
  });
});
