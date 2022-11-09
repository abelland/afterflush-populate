# After flush populate issue

## Installation
- `yarn install`
- `yarn start:dev`

## DB Composition (SQLITE)

Database is already populated with two tables and one record each

# How to reproduce the error

Just call `DELETE http://localhost:3000:/orders/1`

`src/orders/order.subscriber.ts` contains populate logic


