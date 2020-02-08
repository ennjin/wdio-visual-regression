declare namespace WebdriverIOAsync {
  interface BrowserObject {
    matchElement(name: string, element: WebdriverIOAsync.Element): Promise<number>;
    matchViewport(name: string): Promise<number>;
  }
}
