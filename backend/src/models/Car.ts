import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('cars')
export default class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  placa: string

  @Column('varchar')
  chassi: string

  @Column('float')
  renavam: number

  @Column('varchar')
  modelo: string

  @Column('varchar')
  marca: string

  @Column('integer')
  ano: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column('boolean')
  int_excluded = false
}
