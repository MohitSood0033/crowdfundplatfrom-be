import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Transaction } from "./Transaction";

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  targetAmount!: number;

  @ManyToOne(() => User, user => user.campaigns)
  user!: User;

  @OneToMany(() => Transaction, transaction => transaction.campaign)
  transactions!: Transaction[];
}
