import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'financial_data' })
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  category: string;

  @Column()
  description: string;
}