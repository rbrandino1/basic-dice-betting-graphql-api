Unfortunately I made a planning error to perform this test. The day I chose really wasn't good for me and I wasn't able to dedicate as much time as I would like to completing the whole challenge.

For this same reason, I had to make some decisions in order to be able to deliver as much code as possible in order to also show as much as possible in the evaluation: items such as code separation, decoupling, unit and e2e tests, etc..

Decisions I made to be able to produce the most content in the time I had to take the test:

-> I chose not to use Sequelize and put Prisma ORM in its place: Due to the fact that in a professional environment I have much more experience with other ORMs, such as Mongoose, TypeORM, Prisma.io. If I choose to use Sequelize, I would spend a lot of time reading the documentation and possibly running into problems that I wouldn't be used to yet. Considering that Sequelize is an ORM framework, like others, it can be learned, I chose to use the little time I had on something I already knew and deliver more code.

-> I chose to do all the project structure, all the separation and classes, unit tests.


-> At this point, I already realize that 38 minutes have passed from my deadline, and I couldn't add the main Betting logic and at least one e2e test.

----- 

- Used NestJS as nodeJS framework
- Used Postgres as database
- Used Prisma.io as ORM instead of Sequelize

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