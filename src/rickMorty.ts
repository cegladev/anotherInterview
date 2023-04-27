import { injectable } from 'inversify';
import { Collection } from 'mongodb';
import { Database } from './Database';
import { Character, RickMortyFacade } from './RickMortyFacade';

@injectable()
export class RickMorty {
  private readonly charactersCollection: Collection<Character>;

  constructor(private readonly rickMortyFacade: RickMortyFacade, private readonly db: Database) {
    this.charactersCollection = this.db.getCollection('characters');
  }

  public async wczytajPostać(id: number): Promise<Character> {
    const character = await this.rickMortyFacade.getCharacter(id);

    const nieIstnial = await this.zapiszJezeliNieIstneje(character);

    if (nieIstnial) {
      console.log('Zapisano nową postać');
    }

    return character;
  }

  public async zapiszJezeliNieIstneje(character: Character): Promise<boolean> {
    const result = await this.charactersCollection.updateOne(
      { id: character.id },
      { $setOnInsert: character },
      { upsert: true }
    );

    console.log(result);

    return result.upsertedCount === 1;
  }

  public async wczytajWszystkie(): Promise<any> {
    const characters = await this.rickMortyFacade.getCharacters();

    return characters;
  }
}
