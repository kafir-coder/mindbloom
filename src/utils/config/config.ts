import dotenv from "dotenv";
import { Config, Database } from './interfaces';

dotenv.config();



const database: Database = {
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    name: process.env.DATABASE_NAME || 'postgres',
    port: process.env.DATABASE_PORT as unknown as number || 5432
}
const config: Config = {
  port: parseInt(process.env.PORT || "3000", 10),
  nodeEnv: (process.env.NODE_ENV as Config["nodeEnv"]) || "development",
  database,
  populate: process.env.POPULATE == "yes"
};

export default config;
