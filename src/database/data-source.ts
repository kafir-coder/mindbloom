import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ADHDDiagnosis, ASDDiagnosis } from '../entities/diagnosis';
import { Message } from '../entities/message';
import config from '../utils/config/config';
import { Kid } from './entities/kid';
import { Question } from './entities/questions';
import { User } from './entities/user';
const { database } = config;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: database.host,
  port: database.port,
  username: database.user,
  password: database.password,
  database: database.name,
  synchronize: true,
  logging: true,
  entities: [User, Kid, ADHDDiagnosis, ASDDiagnosis, Question, Message],
  subscribers: [],
  migrations: [''],
  ssl:
    process.env.SSL == 'true'
      ? {
          rejectUnauthorized: process.env.NODE_ENV === 'production',
        }
      : false,
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Connection initialized with database...');
  })
  .catch((error) => console.log(error));

export const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject('Failed to create connection with database');
    }, delay);
  });
};
