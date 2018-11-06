import { ConnectionOptions } from "typeorm";

const ConnectionOptions : ConnectionOptions = {
    type: "postgres",
    database: "nuber",
    synchronize: true,
    logging: false,
    entities: ["entities/**/*.*"],
    host: process.env.DB_ENDPOINT,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
};

export default ConnectionOptions;