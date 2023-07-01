import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CartProductEntity1688184619968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cart_product',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'product_id',
            type: 'int',
          },
          {
            name: 'cart_id',
            type: 'int',
          },
          {
            name: 'quantity',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      'cart_product',
      new TableIndex({
        name: 'cart_product_cart_fk_idx',
        columnNames: ['cart_id'],
      }),
    );

    await queryRunner.createIndex(
      'cart_product',
      new TableIndex({
        name: 'cart_product_product_fk_idx',
        columnNames: ['product_id'],
      }),
    );

    await queryRunner.createForeignKey(
      'cart_product',
      new TableForeignKey({
        name: 'cart_product_product_fk',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
      }),
    );

    await queryRunner.createForeignKey(
      'cart_product',
      new TableForeignKey({
        name: 'cart_product_cart_fk',
        columnNames: ['cart_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'carts',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cart_product', 'cart_product_product_fk');
    await queryRunner.dropForeignKey('cart_product', 'cart_product_cart_fk');
    await queryRunner.dropIndex('cart_product', 'cart_product_product_fk_idx');
    await queryRunner.dropIndex('cart_product', 'cart_product_cart_fk_idx');
    await queryRunner.dropTable('cart_product');
  }
}
