import 'reflect-metadata';
import { Application } from './Application';

Application.startup()
  .then(() => {
    console.log('Application started');
  })
  .catch((error) => {
    console.error('Uncaught exception! Application will terminate', { error });
  });
