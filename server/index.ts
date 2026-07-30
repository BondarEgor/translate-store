import "dotenv/config";
import cors from 'cors';
import express, { type Express } from 'express';

import localesRouter from './routes/locales.routes.ts';
import namespacesRouter from './routes/namespaces.routes.ts';
import translationsRouter from './routes/translations.routes.ts';

const app: Express = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/locales', localesRouter);
app.use('/api/namespaces', namespacesRouter);
app.use('/api/translations', translationsRouter);


app.listen(port, (error) => {
  if (error) {
    console.error(`listening port error: ${error}`);
  }
});
