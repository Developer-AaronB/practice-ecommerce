import { config, createSchema } from "@keystone-next/keystone/schema";
import "dotenv/config";

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits-tutorial";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

export default config({
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
  }),
  ui: {
    // todo: change this for roles
    isAccessAllowed: () => true,
  },
  // Todo: add session values here
});