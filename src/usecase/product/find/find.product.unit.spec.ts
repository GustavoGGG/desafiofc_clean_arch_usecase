import FindProductUseCase from "./find.product.usecase";

const FakeProduct = () => {
  return {
    id: "123",
    name: "Product Name",
    price: 14.2
  }
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(FakeProduct())),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test find product use case", () => {
  it("should find product", async () => {
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);
    const input = FakeProduct();
    const result = await findProductUseCase.execute(input);

    expect(result.name).toEqual(input.name);
    expect(result.price).toEqual(input.price);
  });

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const findProductUseCase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return findProductUseCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
})
