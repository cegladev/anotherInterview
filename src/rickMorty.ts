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

  public async LoadCharacterFromPersonIdNumber(idNumber: number): Promise<Character> {
    const characters = await this.rickMortyFacade.getAvailableCharactersFromRickAndMortyPage();
    let character : any;

    for(let i = 0; i<characters.length; i++) {
      if(characters.at(i).id === idNumber) {
        character = characters.at(i)
      }
    }

    if(character !== null) {
      const nieIstnial = await this.FindCharacterAndSaveIfDoesntExist(character);

      if (nieIstnial) {
        console.log('Zapisano nową postać');
     }
    }
    
    return character;
  }

  public async FindCharacterAndSaveIfDoesntExist(character: Character): Promise<boolean> {

    const doeasExists = this.charactersCollection.find({ id: character.id });

    if(doeasExists !== null) {
      const result = await this.charactersCollection.updateOne(
        { id: character.id },
        { $setOnInsert: character },
        { upsert: true }
      );
    
      console.log(result);
    
    }

    return doeasExists !== null;
  }

  public async LoadAllAvailableCharactersOfRickAndMortyWebPageFromFacade(): Promise<any> {
    const characters = await this.rickMortyFacade.getAvailableCharactersFromRickAndMortyPage();

    return characters;
  }
}
