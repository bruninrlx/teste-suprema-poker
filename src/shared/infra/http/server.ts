import '../typeorm';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes/routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(5000, () => {
  console.log('server started on port 5000!');
});
