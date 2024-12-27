
export default interface ProductInterface {
  get getId(): string;
  get name(): string;
  get price(): number;
  changeName(name: string): void;
  changePrice(price: number): void;
}
