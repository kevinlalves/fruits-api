import supertest from "supertest";
import app from "index";
import httpStatus from "http-status";
import database from "config/database";

const server = supertest(app);

beforeEach(() => database.clean());

describe("GET /fruits", () => {
  it("returns the right body and http status code", async () => {
    database.insertFruit({ name: "tomato", price: 123 });
    database.insertFruit({ name: "apple", price: 1299 });

    const response = await server.get("/fruits");

    expect(response.body).toStrictEqual([
      { id: 1, name: "tomato", price: 123 },
      { id: 2, name: "apple", price: 1299 },
    ]);
    expect(response.status).toBe(httpStatus.OK);
  });
});

describe("GET /fruits/:id", () => {
  describe("when the id is invalid", () => {
    it("returns http status for not found", async () => {
      database.insertFruit({ name: "orange", price: 34 });
      const response = await server.get(`/fruits/33`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
  });

  describe("when the id is valid", () => {
    it("return the right body and http status code", async () => {
      database.insertFruit({ name: "orange", price: 34 });
      const response = await server.get(`/fruits/1`);

      expect(response.body).toMatchObject({ name: "orange", price: 34 });
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});

describe("POST /fruits", () => {
  describe("when the body of the request is invalid", () => {
    const invalidRequestBody = () => ({
      name: 12,
      price: "free",
    });

    it("returns http status for unprocessable entity", async () => {
      const body = invalidRequestBody();
      const response = await server.post("/fruits").send(body);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
  });

  describe("when the body of the request is valid", () => {
    const validRequestBody = () => ({
      name: "ichigo",
      price: 100,
    });

    describe("and there is no other fruit with the same name", () => {
      it("returns http status for created", async () => {
        const body = validRequestBody();
        const response = await server.post("/fruits").send(body);

        expect(response.status).toBe(httpStatus.CREATED);
      });
    });

    describe("and there is already a fruit with the same name", () => {
      it("return http status for conflict", async () => {
        database.insertFruit({ name: "ichigo", price: 200 });

        const body = validRequestBody();
        const response = await server.post("/fruits").send(body);

        expect(response.status).toBe(httpStatus.CONFLICT);
      });
    });
  });
});
