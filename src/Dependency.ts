export const Dependencies = Symbol('DependenciesWithHealth');

export abstract class Dependency {
  abstract getDependencyName(): string;
  abstract isHealthy(): Promise<boolean>;
}
