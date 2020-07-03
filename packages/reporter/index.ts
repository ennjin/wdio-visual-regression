import { resolve } from 'path';
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'fs';

import { ReportData, TestContextResult } from './interfaces';
import { Config, Subfolder } from '../config';
import { resolvePath } from '../utils';


const REPORT_FILENAME = 'report.json';

// TODO: Fix report generation
export class VisualRegressionReport {
  private config: Config = Config.get();
  private report: ReportData[] = [];
  private lastTestCase: Partial<ReportData> = { matchers: [] };

  private get reportPath(): string {
    return resolve(this.config.outputDir, REPORT_FILENAME);
  }

  private get isReportExist(): boolean {
    return existsSync(this.reportPath);
  }

  saveMatcherResult(name: string, mismatch: number): void {
    const getExistPathOrUndefined = (subfoler: Subfolder) => {
      const path = resolvePath(name, subfoler);
      return existsSync(path) ? path : undefined;
    };

    this.lastTestCase.matchers?.push({
      mismatch,
      fileName: `${ name }.png`,
      files: {
        actual: getExistPathOrUndefined(Subfolder.ACTUAL),
        expected: getExistPathOrUndefined(Subfolder.DIFF),
        diff: getExistPathOrUndefined(Subfolder.DIFF)
      }
    });
  }

  saveTestContext(context: Partial<TestContextResult>): void {
    this.lastTestCase = { ...this.lastTestCase, ...context };
    this.report.push(this.lastTestCase as ReportData);
    this.lastTestCase = { matchers: [] };
  }

  generate(): void {
    if (this.isReportExist) {
      const report = readFileSync(this.reportPath, { encoding: 'utf8' });
      this.report = [...JSON.parse(report), ...this.report];
    }

    writeFileSync(this.reportPath, JSON.stringify(this.report, null, 2));
  }

  clear(): void {
    if (this.isReportExist) {
      unlinkSync(this.reportPath);
    }
  }
}
