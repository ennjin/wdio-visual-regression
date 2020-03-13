interface MatchCommandResult {
  fileName: string;
  mismatch: number;
  files: {
    actual?: string;
    expected?: string;
    diff?: string;
  };
}

export type TestContextResult = Omit<ReportData, 'matchers'>;

export interface ReportData {
  testName: string;
  passed: boolean;
  matchers: MatchCommandResult[];
}
