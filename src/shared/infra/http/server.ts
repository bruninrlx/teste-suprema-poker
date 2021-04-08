import '../typeorm';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes/routes';

const app = express();
app.use(express.json());
app.use(routes);
app.use(cors);

app.listen(3333, () => {
  console.log('server started on port 3333!');
});
