import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ enum: [ 'personal', 'team' ] })
  type: string;

  @Column()
  monthStart: number;

  @Column({ default: true })
  isActive: boolean;
}
