import { Router } from 'express';
import { injectable } from 'inversify';
import { RickMorty } from './rickMorty';
import { HealthService } from './healthService';

@injectable()
export class Routes {
  constructor(private readonly rickMorty: RickMorty, private readonly healthService: HealthService) {}

  public async mount(router: Router): Promise<void> {
    router.get('/health', async (req, res) => {
      const health = await this.healthService.getHealth();
      res.status(200).json(health);
    });

    router.get('/characters', async (req, res) => {
      const characters = await this.rickMorty.wczytajWszystkie();
      res.status(200).json({ characters: characters });
    });

    router.get('/characters/:id', async (req, res) => {
      const character = await this.rickMorty.wczytajPostać(parseInt(req.params.id));
      res.status(200).json({ character: character });
    });
  }
}
