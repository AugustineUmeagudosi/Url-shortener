import 'dotenv/config';
import mongoose from 'mongoose';

let dbUrl;

switch (process.env.NODE_ENV) {
    case 'production':
        dbUrl = process.env.PROD_DATABASE_URL;
    break;

    case 'test':
        dbUrl = process.env.TEST_DATABASE_URL;
    break;

    default :
        dbUrl = process.env.DEV_DATABASE_URL;
    break;
}

mongoose.connect( dbUrl, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useFindAndModify: false 
})
.then( async () => {
    logger.info(`Connected to mongo ${process.env.NODE_ENV} server`);
})
.catch(err => logger.error(`Could not connect to MongoDB. ${err}`));