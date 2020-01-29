// import compare from 'resemblejs/compareImages';


export class Matcher {
  private static instance: Matcher;
  private constructor() { /* pass */ }

  public create(): Matcher {
    if (!Matcher.instance) {
      Matcher.instance = new Matcher();
    }

    return Matcher.instance;
  }

  // public async matchElement(name: string, element: WebdriverIOAsync.Element): Promise<number> {
  //   return 0;
  // }
}
