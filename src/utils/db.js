import mysql from 'mysql2/promise'

let connection;

export const createConnection = async () => {
    if (!connection) {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
    }

    return connection
}

// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
//   dialect: 'mysql', // Use 'mysql' as the dialect
//   logging: console.log, // TODO remove 
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false, // Adjust based on your environment
//     },
//   },
// });

// // const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
// //   host: config.host,
// //   dialect:'mysql',
// //   dialectModule: require('mysql2'),
// // });

// export default sequelize;

// // Test the connection
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log(
//       "Connection to the database has been established successfully."
//     );
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();