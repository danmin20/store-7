import { ProductOption } from "../entity/option";
import { Product } from "../entity/product";

export class ProductResponse {
  id: number;
  name: string;
  price: number;
  originPrice: number;
  discountRate: number;
  deliveryCost: number;
  stock: number;
  category: string;
  subCategory: string;
  option: string;
  options: ProductOption[];
  images: string[];
  details: string[];
  isWish: boolean;

  static of(product: Product, userId: number): ProductResponse {
    const id = product.id,
      name = product.name,
      originPrice = product.price,
      price = product.getDiscountedPrice(),
      deliveryCost = product.deliveryCost,
      discountRate = product.discountRate,
      category = product.category,
      subCategory = product.subCategory,
      option = product.option,
      options = product.options.map((option) => {
        return {
          id: option.id,
          value: option.value,
          stock: option.stock,
        };
      }),
      stock = product.stock,
      images = product.getImagesAsString(),
      details = product.getDetailImagesAsString(),
      isWish = userId
        ? product.wishes?.filter((wish) => wish.user_id === userId).length === 1
        : false;

    return {
      id,
      name,
      originPrice,
      price,
      deliveryCost,
      discountRate,
      category,
      subCategory,
      option,
      options,
      stock,
      images,
      details,
      isWish,
    } as ProductResponse;
  }
}
