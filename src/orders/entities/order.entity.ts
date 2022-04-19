import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Customer } from '../../customers/entities/customer.entity';

@Entity({ tableName: 'orders' })
export class Order extends BaseEntity<Order, 'id'> {
  @PrimaryKey({ nullable: false })
  id = 1;

  @Property()
  value = 200;

  @ManyToOne()
  customer: Customer;
}
