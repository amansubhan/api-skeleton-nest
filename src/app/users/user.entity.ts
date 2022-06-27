import { Account } from "src/app/accounts/account.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(type => Account)
  @JoinTable()
  accounts: Account[]
}
