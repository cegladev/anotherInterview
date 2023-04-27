import { injectable, multiInject } from 'inversify';
import { Dependencies, Dependency } from './Dependency';

type Health = 'UP' | 'DOWN';

type HealthRecord = Record<string, Health>;

@injectable()
export class HealthService {
  constructor(@multiInject(Dependencies) private readonly dependencies: Dependency[]) {}

  public async getHealth(): Promise<HealthRecord> {
    const healthRecord: HealthRecord = {};

    for (const dependency of this.dependencies) {
      healthRecord[dependency.getDependencyName()] = (await dependency.isHealthy()) ? 'UP' : 'DOWN';
    }

    return healthRecord;
  }
}
