import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CartEntity1688183381585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'carts',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'is_opened',
            type: 'boolean',
            default: true,
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      'carts',
      new TableIndex({ name: 'carts_user_fk_idx', columnNames: ['user_id'] }),
    );

    await queryRunner.createForeignKey(
      'carts',
      new TableForeignKey({
        name: 'carts_user_fk',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('carts', 'carts_user_fk_idx');
    await queryRunner.dropIndex('carts', 'carts_user_fk');
    await queryRunner.dropTable('carts');
  }
}
