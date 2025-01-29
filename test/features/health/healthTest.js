const chai = require("chai");
const sinon = require("sinon");
const HealthController = require("../src/features/health/health.controller");
const ResponseUtil = require("../src/shared/utils/response-util").ResponseUtil;

describe("HealthController", () => {
  afterEach(() => {
    sinon.restore();
  });

  // hello test
  describe("#helloWorld()", () => {
    it("respond with Hello World", (done) => {
      sinon.stub(ResponseUtil, "respondOk").callsFake((res, data, message) => {
        chai.assert.equal(message, "Hello World");
        done();
      });

      void HealthController.helloWorld();
    });
  });

  // status test
  describe("#status()", () => {
    it("respond with "`Environment '${envName}' running on port: ${port}`, (done) => {
      sinon.stub(ResponseUtil, "respondOk").callsFake((res, data, message) => {
        chai.assert.equal(
          message,
          `Environment '${envName}' running on port: ${port}`
        );
        done();
      });

      void HealthController.status();
    });
  });

  // error test
  describe("#error()", () => {
    it("respond with error", (done) => {
      sinon.stub(ResponseUtil, "respondOk").callsFake((res, data, message) => {
        chai.assert.equal(message, "error");
        done();
      });

      void HealthController.error();
    });
  });
});
