import supertest from "supertest";
import app from "index";
import httpStatus from "http-status";
import database from "config/database";

const server = supertest(app);

beforeEach(() => database.clean());

describe("GET /fruits", () => {
  it("returns the right body and status code", async () => {
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
