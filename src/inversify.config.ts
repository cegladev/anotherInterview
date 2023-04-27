import { Container } from 'inversify';
import { Database } from './Database';
import { Dependencies, Dependency } from './Dependency';
import { InMemoryDatabase } from './InMemoryDatabase';
import { RickMortyFacade } from './RickMortyFacade';
import { Routes } from './Routes';
import { HealthService } from './healthService';
import { RickMorty } from './rickMorty';

export const container = new Container({
  autoBindInjectable: true
});

container.bind(RickMorty).toSelf().inSingletonScope();
container.bind(InMemoryDatabase).toSelf().inSingletonScope();
container.bind(RickMortyFacade).toSelf().inSingletonScope();
container.bind(Database).toSelf().inSingletonScope();
container.bind(HealthService).toSelf().inSingletonScope();
container.bind(Routes).toSelf().inSingletonScope();

container.bind<Dependency>(Dependencies).toDynamicValue(async (context) => context.container.getAsync(Database));
container.bind<Dependency>(Dependencies).toDynamicValue(async (context) => context.container.getAsync(RickMortyFacade));
