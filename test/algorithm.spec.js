const { expect } = require("chai");
const { findMinAndMaxSum } = require("../algorithm");

describe("Mini-Max Sum", function () {
  this.timeout(60000);

  it("Try [1, 3, 5, 7, 9] and should return '16 24'", async () => {
    const result = findMinAndMaxSum([1, 3, 5, 7, 9]);
    expect(result).to.equal("16 24");
  });

  it("Try [1, 2, 3, 4, 5] and should return '10 14'", async () => {
    const result = findMinAndMaxSum([1, 2, 3, 4, 5]);
    expect(result).to.equal("10 14");
  });
});
