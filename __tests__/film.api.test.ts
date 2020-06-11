import request from "supertest";
import app from "../src/config/app";
/**
 * Connecting with database before running test cases
 */
beforeAll(async () => {

    setTimeout(() => {
        import("../src/config/mongoose");
    }, 4000);
});


/**
 * Testing health api
 */
describe("GET /api/v1/health", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api/v1/health")
            .expect(200);
    });
});