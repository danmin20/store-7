import { User } from "@/user/entity/user";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Destination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  name: string;

  @Column({ length: 16 })
  postCode: string;

  @Column({ length: 36 })
  address: string;

  @Column({ length: 20 })
  addressee: string;

  @Column({ type: "char", length: 11, name: "phone_number" })
  phoneNumber: string;

  @Column({ length: 11, name: "detail_address" })
  detailAddress: string;

  @ManyToOne(() => User, (user) => user.destinations, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "tinyint", name: "is_default" })
  isDefault: number;

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
}
