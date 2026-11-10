export class OrderItemDto {
  productId: string;
  quantity: number;
  price: number;

  constructor(productId: string, quantity: number, price: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}

export class CreateOrderDto {
  customerId: string;
  items: OrderItemDto[];

  constructor(customerId: string, items: OrderItemDto[]) {
    this.customerId = customerId;
    this.items = items;
  }
}

export class UpdateOrderDto {
  customerId: string;
  items: OrderItemDto[];
  status: string;

  constructor(customerId: string, items: OrderItemDto[], status: string) {
    this.customerId = customerId;
    this.items = items;
    this.status = status;
  }
}