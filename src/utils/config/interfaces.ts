export interface Config {
    port: number;
    nodeEnv: "development" | "production" | "test";
    database: Database,
    populate: boolean
}

export interface Database {
    host: string;
    user: string;
    password: string;
    name: string;
    port: number;
}
