module.exports = {
    development: {
        storage: 'database.sqlite',
        dialect: 'sqlite'
    },
    test: {
        storage: 'database.sqlite',
        dialect: 'sqlite'
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
};
