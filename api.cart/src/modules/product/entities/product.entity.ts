import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;
}
