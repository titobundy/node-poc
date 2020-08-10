const mongoose = require('mongoose');


module.exports = () => {

    // Mongo Local Docker
    // mongoose.connect('mongodb://localhost:28017/rest-api', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // })
    // .then(() => {
    //     console.log('Mongodb connected')
    // });

    // Mongo Atlas
    // api-user
    // 0GZCvkRqaQ8xDs0w
    mongoose.connect(process.env.MONGODB_URI, {
        dbName : process.env.DB_NAME,
        user : process.env.DB_USER,
        pass: process.env.DB_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('Mongodb connected')
    })
    .catch(err => console.error(err.message));

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to db...');
    });

    mongoose.connection.on('error', err => {
        console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected...');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose connection is disconnected due to app termination...');
            process.exit(0);
        });
    });
}