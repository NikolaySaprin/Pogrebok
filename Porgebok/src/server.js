import express from 'express';
import session from 'express-session';
import store from 'session-file-store';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import customRender from './utils/customRender';
import indexRouter from './routes/index';
import apiRouter from './routes/api';
import authRouter from './routes/auth';
import productsRouter from './routes/products';
import { localsMiddle } from './middlewares';
// import { deleteProtect } from './middlewares'; // защитка

dotenv.config();

const app = express();
const FileStore = store(session);
const PORT = process.env.PORT || 3000;

app.engine('jsx', customRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components'));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const sessionConfig = {
  name: 'sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'oh klahoma', // Секретное слово для шифрования, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};
app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.path = req.originalUrl;
  next();
});

app.use(localsMiddle);

app.use('/', indexRouter);
app.use('/auth/', authRouter);
// app.use(deleteProtect); // включим защитку?
app.use('/products/', productsRouter);
app.use('/api/v1/', apiRouter);

app.listen(PORT, () => {
  console.log('Server start on', PORT);
});
