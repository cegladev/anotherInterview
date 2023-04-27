import { injectable, postConstruct } from 'inversify';
import { MongoMemoryServer } from 'mongodb-memory-server-core';

@injectable()
export class InMemoryDatabase {
  private mongoMemoryServer: MongoMemoryServer | undefined;

  @postConstruct()
  public async init(): Promise<string> {
    this.mongoMemoryServer = await MongoMemoryServer.create();
    const dbUri = this.mongoMemoryServer.getUri();

    console.log('InMemoryDatabase initialized: ' + dbUri);

    return dbUri;
  }

  public getUri(): string {
    if (!this.mongoMemoryServer) {
      throw new Error('MongoMemoryServer not initialized');
    }

    return this.mongoMemoryServer.getUri();
  }

  public async stop(): Promise<void> {
    await this.mongoMemoryServer?.stop();
  }
}
