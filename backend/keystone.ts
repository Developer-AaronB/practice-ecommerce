import { createAuth } from "@keystone-next/auth";
import { config, createSchema } from "@keystone-next/keystone/schema";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";
import { User } from "./schemas/User";
import { Product } from "./schemas/Products";
import "dotenv/config";

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits-tutorial";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    // Todo: add inital roles here
  },
});

export default withAuth(
  config({
    // @ts-ignore
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: "mongoose",
      url: databaseURL,
      // Todo: add data seeding here
    },
    lists: createSchema({
      // Schema items go in here
      User,
      Product,
    }),
    ui: {
      // Show the UI only for people who pass this test
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data,
    },
    // Todo: add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: "id",
    }),
  })
);
