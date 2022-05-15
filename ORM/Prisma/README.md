# [Prisma.io](https://www.prisma.io/)

## Next-generation Node.js and TypeScript ORM

```bash
npm init -y

npm install prisma typescript ts-node @types/node --save-dev

npx prisma init

```

### Creates the `.env` file in the root directory of the project

### [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)

Prisma Client is an auto-generated and type-safe query builder that's tailored to your data.

### Responsibilities of the [Query Engine](https://www.prisma.io/docs/concepts/components/prisma-engines/query-engine)

- manage physical database connections in connection pool

- receive incoming queries from the Prisma Client Node.js process

- generate SQL queries

- send SQL queries to the database

- process responses from the database and send them back to Prisma Client
