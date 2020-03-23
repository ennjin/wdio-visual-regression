declare module 'webdriverio' {
  interface BrowserObject {
    matchElement(name: string, element: WebdriverIOAsync.Element): Promise<number>;
    matchViewport(name: string): Promise<number>;
  }
}

declare module '@wdio/sync' {
  interface BrowserObject {
    matchElement(name: string, element: WebdriverIO.Element): number;
    matchViewport(name: string): number;
  }
}

export {};
