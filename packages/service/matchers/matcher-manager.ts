export class MatcherManager {
  private static instance: MatcherManager;
  private matchers = new Map<string, any>();

  // TODO: Add singelton factory
  public static get(): MatcherManager {
    if (!MatcherManager.instance) {
      MatcherManager.instance = new MatcherManager();
    }
    return MatcherManager.instance;
  }

  private constructor() { /* pass */ };

  public addMatcher(name: string, value: any) {
    return this.matchers.set(name, value);
  }

  public getAll() {
    return this.matchers;
  }
}
