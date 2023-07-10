import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Campaign } from "./Campaign";
import { Transaction } from "./Transaction";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  mobile!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @OneToMany(() => Campaign, campaign => campaign.user)
  campaigns!: Campaign[];

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions!: Transaction[];
}
