import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'records' })
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  sourceId: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'varchar' })
  category: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', default: 'activo' })
  status: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}