import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductImage } from "./product-image";
import { ProductOption } from "./option";
import { ProductDetailImage } from "./product-detail-image";
import { ProductUploadRequest } from "@/product/dto/product-upload-request";
import { Cart } from "@/cart/entity/cart";
import { Question } from "./question";
import { Wish } from "@/user/entity/wish";
import { Order, OrderStatus } from "@/order/entity/order";
import { Review } from "./review";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column()
  price: number;

  @Column({ name: "delivery_cost" })
  deliveryCost: number;

  @Column({ name: "discount_rate", default: 0 })
  discountRate: number;

  @Column()
  stock: number;

  @Column()
  category: string;

  @Column({ name: "sub_category" })
  subCategory: string;

  @Column({ name: "wishCount", default: 0 })
  wishCount: number;

  @Column({ length: 16, nullable: true })
  option: string;

  @OneToMany(() => ProductOption, (option) => option.product)
  options: ProductOption[];

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @OneToMany(() => ProductDetailImage, (detailImage) => detailImage.product)
  detailImages: ProductDetailImage[];

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];

  @OneToMany(() => Question, (question) => question.product)
  questions: Question[];

  @OneToMany(() => Wish, (wish) => wish.product)
  wishes: Wish[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;

  static toEntity(product: ProductUploadRequest) {
    return {
      name: product.name,
      price: product.price,
      deliveryCost: product.deliveryCost,
      discountRate: product.discountRate,
      stock: product.stock,
      category: product.category,
      subCategory: product.subCategory,
      option: product.option ? JSON.parse(product.option).value : null,
    } as Product;
  }

  getDiscountedPrice() {
    return Math.floor(
      this.discountRate === 0
        ? this.price
        : this.price * ((100 - this.discountRate) / 100)
    );
  }

  getThumbnailImage() {
    if (!this.images || this.images.length == 0) return "";
    return this.images[0].id;
  }

  getImagesAsString() {
    return this.images.map((image) => image.id);
  }

  getDetailImagesAsString() {
    return this.detailImages.map((image) => image.id);
  }

  getWaitOrdersCount() {
    return this.orders.filter((order) => order.status === OrderStatus.Prepare)
      .length;
  }

  getSalse() {
    return this.orders.filter((order) => order.status !== OrderStatus.Prepare)
      .length;
  }
}
