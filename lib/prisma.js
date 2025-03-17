import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

//every time the user hot reloads the page, the db connection will be closed and the new connection will be established.

//so adding the connection details in the global scope so that we can chceck the global variable as there is any instance of the db connection then we won't be creating the new connection.

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

//globalThis.prisma: this global varibale ensure that the prisma client6 instance is reused across hot reloads during development. Without this, each time your application realoads, a new instance of the prisma client would be created,which protentially leading to connection issue.
