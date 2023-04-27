import path from 'path';

import { injectable } from 'inversify';
import { type Collection, type Db, type Document, MongoClient } from 'mongodb';
import { InMemoryDatabase } from './InMemoryDatabase';
import { Dependency } from './Dependency';

@injectable()
export class Database implements Dependency {
  private mongoClient: MongoClient;

  constructor(db: InMemoryDatabase) {
    console.log('Creating new Database instance');
    this.mongoClient = new MongoClient(db.getUri());
  }

  public getDependencyName(): string {
    return 'mongo';
  }

  public async isHealthy(): Promise<boolean> {
    return this.isConnected();
  }

  public async isConnected(): Promise<boolean> {
    try {
      await this.mongoClient.db().admin().ping();
    } catch (e) {
      console.log('Could not connect to database!');
      return false;
    }

    return true;
  }

  public async getDb(name?: string): Promise<Db> {
    if (!(await this.isConnected())) {
      console.log('Database is not connected!');
    }

    return this.mongoClient.db(name);
  }

  public getCollection<Entity extends Document>(collectionName: string, dbName?: string): Collection<Entity> {
    return this.mongoClient.db(dbName).collection<Entity>(collectionName);
  }

  public async connect(): Promise<void> {
    try {
      this.mongoClient = await this.mongoClient.connect();
      console.log('Connected to MongoDB successfully!');
    } catch (e) {
      const error = e instanceof Error ? e : undefined;
      console.log('Could not connect to MongoDB', {}, error);
      return;
    }
  }

  public async disconnect(): Promise<void> {
    if (!(await this.isConnected())) {
      console.log('Trying to disconnect from the DB, but apparently there is no connection');
      return;
    }
    console.log('Disconnecting DB...');
    await this.mongoClient.close();
    console.log('Disconnected DB successfully!');
  }
}
