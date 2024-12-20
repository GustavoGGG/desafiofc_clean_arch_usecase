import { app, sequelize } from "../express";
import request from "supertest";


const FakeInput = () => {
  return {
    name: "Product Name",
    price: 12.45
  }
};
const FakeInput2 = () => {
  return {
    name: "Product Name 2",
    price: 30
  }
};

describe("E2E test for product", () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create product", async () => {
    const input = FakeInput();
    const resp = await request(app)
      .post("/product")
      .send(input);
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe(input.name);
    expect(resp.body.price).toBe(input.price);

  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "product name",
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const input = FakeInput();
    const input2 = FakeInput2();
    const response = await request(app)
      .post("/product")
      .send(input);
    expect(response.status).toBe(200);
    const response2 = await request(app)
      .post("/product")
      .send(input2);
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    expect(listResponse.body.products[0].name).toBe(input.name);
    expect(listResponse.body.products[0].price).toBe(input.price);
    expect(listResponse.body.products[1].name).toBe(input2.name);
    expect(listResponse.body.products[1].price).toBe(input2.price);
  });
});  