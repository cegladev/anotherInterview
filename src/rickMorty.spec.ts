import { instance, mock, when } from 'ts-mockito';
import { Database } from './Database';
import { Character, RickMortyFacade } from './RickMortyFacade';
import { RickMorty } from './rickMorty';
import { Collection } from 'mongodb';

const collectionMock = mock(Collection);

describe('Rick Morty', () => {
  let rickMorty: RickMorty;
  let facade: RickMortyFacade;
  let db: Database;

  beforeEach(() => {
    facade = mock(RickMortyFacade);
    db = mock(Database);
    when(db.getCollection('characters')).thenReturn(collectionMock);
    rickMorty = new RickMorty(instance(facade), instance(db));
  });

  it('FindCharacterAndSaveIfDoesntExist', async () => {
    const character: Character = {
      id: 123,
      name: 'asd'
    };
    when(collectionMock.find({ id: character.id })).thenResolve(character);

    const result = await rickMorty.FindCharacterAndSaveIfDoesntExist(character);

    expect(result).toBe(true);
  });
});
