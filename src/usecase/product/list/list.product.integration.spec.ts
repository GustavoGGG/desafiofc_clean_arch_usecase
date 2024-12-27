import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";


describe("Test integration list product use case", () => {
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

  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    const listProductUseCase = new ListProductUseCase(productRepository);

    const productFactory1 = ProductFactory.create("a", "Product Name", 15.5);
    const productFactory2 = ProductFactory.create("a", "Product Name 2", 18.5);
    const product1 = new Product(productFactory1.getId, productFactory1.name, productFactory1.price);
    const product2 = new Product(productFactory2.getId, productFactory2.name, productFactory2.price);

    await productRepository.create(product1);
    await productRepository.create(product2);
    const input = {};
    const result = await listProductUseCase.execute(input);
    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toEqual(product1.id);
    expect(result.products[0].name).toEqual(product1.name);
    expect(result.products[0].price).toEqual(product1.price);
    expect(result.products[1].id).toEqual(product2.id);
    expect(result.products[1].name).toEqual(product2.name);
    expect(result.products[1].price).toEqual(product2.price);
  });
});
