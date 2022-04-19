import {
  BaseEntity,
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Order } from '../../orders/entities/order.entity';

@Entity({ tableName: 'customers' })
export class Customer extends BaseEntity<Customer, 'id'> {
  @PrimaryKey({ nullable: false })
  id: number = 1;

  @Property()
  name = 'Foo';

  @Property()
  lastName = 'Bar';

  @OneToMany(() => Order, (order) => order.customer, {
    cascade: [Cascade.ALL],
  })
  orders? = new Collection<Order>(this);
}
