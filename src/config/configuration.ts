export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  environment: process.env.ENV || 'development',
  jwtSecret: process.env.SECRET || 'randomSecret123',
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    databaseName: process.env.DATABASE_DBNAME
  }
});
