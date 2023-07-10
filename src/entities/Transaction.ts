import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Campaign } from "./Campaign";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Campaign)
  campaign!: Campaign;

  @Column()
  amount!: number;

  @Column()
  convenienceFee!: number;

  @Column()
  totalAmount!: number;
}
