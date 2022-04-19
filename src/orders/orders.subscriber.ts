import { EntityName, EventSubscriber, Subscriber } from '@mikro-orm/core';
import { FlushEventArgs } from '@mikro-orm/core/events/EventSubscriber';
import { Order } from './entities/order.entity';
import { EntityManager } from '@mikro-orm/sqlite';

@Subscriber()
export class OrdersSubscriber implements EventSubscriber<Order> {
  constructor(private readonly em: EntityManager) {}

  getSubscribedEntities(): EntityName<Order>[] {
    return [Order];
  }

  async afterFlush(args: FlushEventArgs): Promise<void> {
    const changeSets = args.uow.getChangeSets();

    for (const changeSet of changeSets) {
      console.log(changeSet.entity);
      if (changeSet.entity instanceof Order) {
        await args.em.populate(changeSet.entity, ['customer']);

        console.log('POPULATED!!');
        // DO SOMETHING ...
      }
    }
  }
}
