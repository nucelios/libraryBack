import cors from 'cors';
import App from './app';
import logger from './middlewares/logger';
import { UserRouter } from './routes/user.router';
import { LibraryRouter } from './routes/library.route';



const app = new App({
  port: 8000,
  middlewares: [logger(), cors()],
  controllers: [new UserRouter, new LibraryRouter],
});

app.listen();


