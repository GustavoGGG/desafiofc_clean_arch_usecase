import CreateProductUseCase from "./create.product.usecase";

const FakeInput = () => {
  return {
    name: "Product Name",
    price: 12.45
  }
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};
const FakeProductUseCase = () => {
  const productRepository = MockRepository();
  const productCreateUseCase = new CreateProductUseCase(productRepository);
  return productCreateUseCase;
}
describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    //Arrange
    const productCreateUseCase = FakeProductUseCase();
    const input = FakeInput();
    //Act
    const output = await productCreateUseCase.execute(input);
    //Assert
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });
  it("should thrown an error when name is missing", async () => {
    //Arrange
    const productCreateUseCase = FakeProductUseCase();
    const input = FakeInput();
    input.name = "";
    //Assert
    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });
  it("should thrown an error when price less than zero", async () => {
    //Arrange
    const productCreateUseCase = FakeProductUseCase();
    const input = FakeInput();
    input.price = -2;
    //Assert
    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
})