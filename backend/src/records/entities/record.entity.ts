import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('records')
export class Record {
  @PrimaryColumn()
  sourceId: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  category: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column()
  status: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}