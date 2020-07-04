import { resolve } from 'path';
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'fs';

import { Config, Subfolder, resolvePath } from './internal';


const REPORT_FILENAME = 'report.json';

interface MatchCommandResult {
  fileName: string;
  mismatch: number;
  files: {
    actual: string | null;
    expected: string | null;
    diff: string | null;
  };
}

interface ReportData {
  testName: string;
  passed: boolean;
  browser: string;
  matchers: MatchCommandResult[];
}

export type TestContextResult = Omit<ReportData, 'matchers'>;

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
    const getExistPathOrNull = (subfoler: Subfolder) => {
      const path = resolvePath(name, subfoler);
      return existsSync(path) ? path : null;
    };

    this.lastTestCase.matchers?.push({
      mismatch,
      fileName: `${ name }.png`,
      files: {
        actual: getExistPathOrNull(Subfolder.ACTUAL),
        expected: getExistPathOrNull(Subfolder.EXPECTED),
        diff: getExistPathOrNull(Subfolder.DIFF)
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
