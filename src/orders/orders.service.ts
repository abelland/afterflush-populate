import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Customer } from '../customers/entities/customer.entity';
import { Order } from './entities/order.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/sqlite';
import { InjectRepository } from '@mikro-orm/nestjs';
import { wrap } from '@mikro-orm/core';

@Injectable()
export class OrdersService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Customer)
    private readonly customerRepository: EntityRepository<Customer>,
    @InjectRepository(Order)
    private readonly orderRepository: EntityRepository<Order>,
  ) {}

  async create({}: CreateOrderDto) {
    const customer = await this.customerRepository.findOne({
      id: 1,
    });
    const order = new Order();
    wrap(order).assign({ customer }, { em: this.em });
    await this.em.persistAndFlush(order);

    return order.id;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number) {
    const order = await this.orderRepository.findOne({
      id,
    });

    order.assign({ value: Math.floor(Math.random() * (200 - 1 + 1) + 1) });

    await this.em.persistAndFlush(order);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
