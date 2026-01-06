import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'records' })
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sourceId: string;

  @Column({ type: 'date' })
  date: string;

  @Column()
  category: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'activo' })
  status: string;

  @Column({ nullable: true })
  description: string;
}
