import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import { ReportData } from './interfaces';
import { jasmineContextAdapter } from './jasmine';
import { Config, Subfolder } from '../config';
import { ImageManager } from '../image-manager';


const REPORT_FILENAME = 'report.json';


export class VisualRegressionReport {
  private config: Config = Config.get();
  private manager: ImageManager = new ImageManager();
  private report: ReportData[] = [];
  private lastTestCase: Partial<ReportData> = { matchers: [] };

  saveMatcherResult(name: string, mismatch: number): void {
    const actual = this.manager.resolvePath(name, Subfolder.ACTUAL);
    const expected = this.manager.resolvePath(name, Subfolder.EXPECTED);
    const diff = this.manager.resolvePath(name, Subfolder.DIFF);

    this.lastTestCase.matchers?.push({
      mismatch,
      fileName: `${ name }.png`,
      files: {
        actual: existsSync(actual) ? actual: undefined,
        expected: existsSync(expected) ? expected : undefined,
        diff: existsSync(diff) ? diff : undefined
      }
    });
  }

  saveTestContext(context: any): void {
    // TODO: add adapters for mocha and cucumber
    if (this.config.framework === 'jasmine') {
      const { passed, testName } = jasmineContextAdapter(context);
      this.lastTestCase = { ...this.lastTestCase, passed, testName };
    }

    this.report.push(this.lastTestCase as ReportData);
    this.lastTestCase = { matchers: [] };
  }

  generate(): void {
    let data: ReportData[] = [];
    const reportFile = resolve(this.config.folder, REPORT_FILENAME);

    if (existsSync(reportFile)) {
      const report = readFileSync(reportFile, { encoding: 'utf8' });
      data = [...JSON.parse(report), ...this.report]
    } else {
      data = [...this.report];
    }

    writeFileSync(reportFile, JSON.stringify(data, null, 2));
  }
}
