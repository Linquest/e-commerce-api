import express, {json} from 'express';
import helmet from 'helmet';
import cors from 'cors';

export const app = express();

app.use(helmet());
app.use(json());
app.use(cors());