import { injectable } from 'inversify';
import { Dependency } from './Dependency';
import axios, { type Axios } from 'axios';

export type Character = any;

@injectable()
export class RickMortyFacade implements Dependency {
  private readonly httpClient: Axios;
  private isLastRequestSuccessful: boolean = true;

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://rickandmortyapi.com/api'
    });
  }

  public getDependencyName(): string {
    return 'rickMorty';
  }

  public async isHealthy(): Promise<boolean> {
    return this.isLastRequestSuccessful;
  }

  public async getCharacters(): Promise<Character[]> {
    const response = await this.httpClient.get('/character');

    if (response.status !== 200) {
      this.isLastRequestSuccessful = false;
    }

    return response.data;
  }

  public async getCharacter(id: number): Promise<Character> {
    const response = await this.httpClient.get(`/character/${id}`);

    if (response.status !== 200) {
      this.isLastRequestSuccessful = false;
    }

    return response.data;
  }
}
