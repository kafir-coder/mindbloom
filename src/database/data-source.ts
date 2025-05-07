import { ADHDDiagnosis, ASDDiagnosis } from "../entities/diagnosis";
import config from "../utils/config/config";
import { DataSource } from 'typeorm'
const { database } = config
import 'reflect-metadata'
import { Kid } from "./entities/kid";
import { User } from "./entities/user";
import { Question } from "./entities/questions";
import { Message } from "../entities/message";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: database.host,
    port: database.port,
    username: database.user,
    password: database.password,
    database: database.name,
    synchronize: true,
    logging: true,
    entities: [User, Kid, ADHDDiagnosis, ASDDiagnosis, Question, Message],
    subscribers: [],
    migrations: [""],
})

AppDataSource.initialize()
  .then(async () => {
    console.log("Connection initialized with database...");
  })
  .catch((error) => console.log(error));

export const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};