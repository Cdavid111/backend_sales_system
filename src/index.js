//import external services 
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

//import own services
import router from './routes/index';

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//Global Variables
const dbUrl = 'mongodb://0.0.0.0:27017/dbsistema';
const portDb = '27017';

//Connection to DataBase
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useNewUrlParser: true })
    .then(mongoose => console.log(`db is connected on port ${portDb}`))
    .catch(e => console.log(e));

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', router);

//Run server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});



