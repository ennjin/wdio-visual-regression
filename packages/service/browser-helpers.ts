export function getScrollTop(): Promise<number> {
  return browser.execute('return document.documentElement.scrollTop');
}

export async function scrollTo(position: number): Promise<void> {
  await browser.execute('window.scrollTo(0, arguments[0])', position);
}
