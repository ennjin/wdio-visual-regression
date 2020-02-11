import { TestContextResult } from './interfaces';


export function jasmineContextAdapter(context: any): TestContextResult {
  return { testName: context.title, passed: context.passed };
}
