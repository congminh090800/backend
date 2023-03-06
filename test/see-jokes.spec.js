require("dotenv").config();
const { expect } = require("chai");
const request = require("supertest");
const database = require("../app/lib/database");
const session = require("supertest-session");

describe("See jokes", function () {
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

  it("See one jokes", async () => {
    const res = await testSession
      .get("/api/jokes/get-one")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body.data).to.have.property("readAll");
    expect(res.body.data).to.have.property("joke");
    expect(res.body.data.joke).to.have.property("content");
  });

  it("See 4 jokes", async () => {
    for (let i = 0; i < 4; i++) {
      const res = await testSession
        .get("/api/jokes/get-one")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(res.body.data).to.have.property("readAll");
      expect(res.body.data).to.have.property("joke");
      expect(res.body.data.joke).to.have.property("content");
    }
  });

  it("See all jokes and see goodbye message", async () => {
    let remain = true;
    let res;
    while (remain) {
      res = await testSession.get("/api/jokes/get-one").expect("Content-Type", /json/).expect(200);
      if (res.body.data.readAll) {
        remain = false;
      }
    }
    expect(res.body.data.readAll).to.equal(true);
    expect(res.body.data.message).to.equal(
      "That's all the jokes for today! Come back another day!"
    );
  });
});
