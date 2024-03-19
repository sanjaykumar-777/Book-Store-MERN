import express, { json, request, response } from 'express';
import mongoose from 'mongoose';
import { PORT,mongoDBURL } from './config.js';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express();

//Middleware for processing request body
app.use(express.json());

//Middleware for handling CORS policy
//option 1 : Allow all Origins with Default of cors(*)

app.use(cors())

//oprion 2 : Allow custom origin

app.use(cors({
  origin : '',
  methods : ['GET','POST','PUT','DELETE'],
  allowedHeaders : ['Content-Type']
}))


app.use('/books', booksRoute);


app.get('/',(request,response) => {
  console.log(request);
  return response.status(234).send('welcome')
})

mongoose.connect(mongoDBURL).then(() => {
  console.log('App connected to database');
  app.listen(PORT ,() =>{
    console.log(`App is listening on port:${PORT}`);
  });
}).catch((error) => {
  console.log(error);
})
