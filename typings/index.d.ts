declare namespace WebdriverIOAsync {
  interface BrowserObject {
    matchElement(name: string, element: WebdriverIOAsync.Element): Promise<number>;
    matchViewport(name: string): Promise<number>;
  }
}

declare namespace WebdriverIO {
  interface BrowserObject {
    matchElement(name: string, element: WebdriverIO.Element): number;
    matchViewport(name: string): number;
  }
}
