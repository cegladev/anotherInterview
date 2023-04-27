import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { injectable } from 'inversify';
import { container } from './inversify.config';
import { Application as ExpressApplication } from 'express';
import { Database } from './Database';
import { Routes } from './Routes';

@injectable()
export class Application {
  public expressApp: ExpressApplication | undefined;

  constructor(private readonly db: Database, private readonly routes: Routes) {}

  public static async startup(): Promise<void> {
    const app = await container.getAsync<Application>(Application);

    try {
      console.log('Starting application...');
      await app.start();
    } catch (error) {
      console.error('Application failed to start', { error });
      await app.stop();
    }
  }

  private async start(): Promise<void> {
    console.log('START');
    this.expressApp = express();
    this.expressApp.use(cors());
    this.expressApp.use(bodyParser.json());
    this.routes.mount(this.expressApp);
    this.expressApp.listen(3000, () => console.log('Listening on  http://localhost:3000'));

    await this.db.connect();
  }

  public async stop(): Promise<void> {
    await this.db.disconnect();
  }
}
