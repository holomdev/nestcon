import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional } from 'class-validator';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: null })
  a: string;

  @Column({ default: null })
  b: string;

  @IsOptional()
  @Column({ default: null })
  c: number;

  @Column({ default: null })
  d: string;
}
