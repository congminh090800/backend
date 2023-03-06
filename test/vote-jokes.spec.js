require("dotenv").config();
const { expect } = require("chai");
const request = require("supertest");
const database = require("../app/lib/database");
const session = require("supertest-session");

describe("Vote jokes", function () {
  let app, testSession;
  this.timeout(60000);
  before((done) => {
    database.init((err) => {
      if (err) {
        console.error("database start fail:", err);
        return;
      }
      app = require("../server");
      require("../app/model").init(done);
    });
  });
  beforeEach(() => {
    testSession = session(app);
  });

  it("Vote a joke", async () => {
    const res = await testSession
      .post("/api/jokes/1/vote")
      .send({
        vote: true,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
    expect(res.body.data).to.equal(true);
  });

  it("Vote same joke twice and return error", async () => {
    await testSession
      .post("/api/jokes/1/vote")
      .send({
        vote: true,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    const res = await testSession
      .post("/api/jokes/1/vote")
      .send({
        vote: true,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400);
    expect(res.body.code).to.equal("USER_ALREADY_VOTED");
  });

  it("Upvote a joke and likes increase", async () => {
    const before = await testSession
      .get("/api/jokes/1/rating")
      .expect("Content-Type", /json/)
      .expect(200);
    await testSession
      .post("/api/jokes/1/vote")
      .send({
        vote: true,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    const after = await testSession
      .get("/api/jokes/1/rating")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(before.body.data.likes).to.equal(after.body.data.likes - 1);
  });

  it("Downvote a joke and dislikes increase", async () => {
    const before = await testSession
      .get("/api/jokes/1/rating")
      .expect("Content-Type", /json/)
      .expect(200);
    await testSession
      .post("/api/jokes/1/vote")
      .send({
        vote: false,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    const after = await testSession
      .get("/api/jokes/1/rating")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(before.body.data.dislikes).to.equal(after.body.data.dislikes - 1);
  });
});
