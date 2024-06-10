import app from "./app";
import server from "./httpSever";
import { connectToDB, closeFromDB } from "./db";

declare module "bun" {
  interface Env {
    PORT: string;
    MONGO_URI: string;
    JWT_SECRET: string;
    DOMAIN_NAME: string;
    MY_EMAIL: string;
    MY_EMAIL_PASSWORD: string;
  }
}

const PORT = process.env.PORT || Bun.env.PORT || 5000;

// connect to the database
connectToDB()
  .then(() => {
    console.log("Connected to the database 🚀");
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to connect to the database: ${error.message}`);
    closeFromDB();
    console.error(`DistConnect from the database 🚀`);
    process.exit(1);
  });
