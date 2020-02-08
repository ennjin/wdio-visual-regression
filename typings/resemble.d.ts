declare module 'resemblejs/compareImages' {
  type ImageData = string | Buffer;
  
  function compare(target: ImageData, compareWith: ImageData): Promise<CompareResult>;

  interface CompareResult {
    isSameDimensions: boolean;
    dimensionDifference: {
      width: number;
      height: number;
    };
    rawMisMatchPercentage: number;
    misMatchPercentage: string;
    diffBounds: {
      top: number;
      left: number;
      bottom: number;
      right: number;
    };
    analysisTime: number;
    getImageDataUrl(): string;
    getBuffer(): Buffer;
  }
  
  export = compare;
}
