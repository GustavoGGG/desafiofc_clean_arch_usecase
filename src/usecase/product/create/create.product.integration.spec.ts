import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test create product use case integration", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    const input = {
      name: "Product",
      price: 15.5
    };
    const result = await productCreateUseCase.execute(input);
    expect(result.id).toEqual(expect.any(String));
    expect(result.name).toEqual(input.name);
    expect(result.price).toEqual(input.price);
  });
});
