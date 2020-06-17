import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createCar1592403746889 implements MigrationInterface {
  carTable = new Table({
    name: 'cars',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        default: 'uuid_generate_v4()',
      },
      {
        name: 'placa',
        type: 'varchar',
        isUnique: true,
      },
      {
        name: 'chassi',
        type: 'varchar',
        isUnique: true,
      },
      {
        name: 'renavam',
        type: 'float',
        isUnique: true,
      },
      {
        name: 'modelo',
        type: 'varchar',
      },
      {
        name: 'marca',
        type: 'varchar',
      },
      {
        name: 'ano',
        type: 'integer',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'int_excluded',
        type: 'boolean',
        default: 'false',
      },
    ],
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    await queryRunner.createTable(this.carTable)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.carTable)
  }
}
