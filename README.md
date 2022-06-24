- Used NestJS as nodeJS framework
- Used Postgres as database
- Used Prisma.io as ORM

Execution:

1) Create a `.env` file based on the `.env.sample` file in the project root.

2) Update environment variable: `DATABASE_URL` with postgres database connection url in file `.env`

2) `yarn install` to install dependencies

3) `yarn run migrate:deploy` to create the database based on migrations

4) `yarn run start:dev`

-----

Inside the `./script/user-seed.sql` file:
You can find a seed for the users table

-----
GraphQL queries\mutations: `http://localhost:3000/graphql`

```
{
  getUser(id:1) {
    id
    name
    balance
  }
}
---
{
  getUserList {
    id
    name
    balance
  }
}
---
mutation createBet {
  createBet(betInsert: { userId: 1, betAmount: 10, chance: 3 }) {
    id
    userId
    betAmount
    chance
    payout
    win
  }
}
---
{
  getBet(id:1) {
    id
    userId
    betAmount
    chance
    payout
    win
  }
}
---
{
  getBetList {
    id
    userId
    betAmount
    chance
    payout
    win
  }
}
```
