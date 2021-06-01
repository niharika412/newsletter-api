import express from 'express';
import {errorLogger} from './utilities/errorLogger.js';
import {requestLogger} from './utilities/requestLogger.js';
import cors from 'cors';
import * as bodyParser from 'body-parser';

const App = express();
App.use(cors());
App.use(bodyParser.json());

App.use(requestLogger);
App.use(errorLogger);

App.listen(3000);
console.log("Server listening on port 3000");


export const app= App;