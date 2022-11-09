import {EntityName, EventArgs, EventSubscriber, Subscriber} from '@mikro-orm/core';
import { Order } from './entities/order.entity';
import { EntityManager } from '@mikro-orm/sqlite';

@Subscriber()
export class OrdersSubscriber implements EventSubscriber<Order> {
  constructor(private readonly em: EntityManager) {}

  getSubscribedEntities(): EntityName<Order>[] {
    return [Order];
  }

  async afterDelete(args: EventArgs<Order>) {
    await args.em.populate(args.entity, ['customer']);
    console.log(args.entity.customer);
  }
}
