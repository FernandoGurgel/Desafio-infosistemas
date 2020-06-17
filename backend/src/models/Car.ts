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
  renavam: string

  @Column('varchar')
  modelo: string

  @Column('varchar')
  marca: string

  @Column('varchar')
  ano: string
}
