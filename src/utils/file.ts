import {FileContent} from "../types/files";

const metricUnits: Readonly<string>[] = ['B', 'KB', 'MB', 'GB', 'TB'];

export const formatFileSizePro =
  (sizeInBytes: number, isMetric: boolean = true, fixedVal: number = 0): string => {
  const divisor = isMetric ? 1000 : 1024;
  let size = sizeInBytes;
  let unitIndex = 0;

  while (size >= divisor && unitIndex < metricUnits.length - 1) {
    size /= divisor;
    unitIndex++;
  }
  // correction for correct size toFixed(size < 10 ? 3 : 2)
  return `${size.toFixed(fixedVal)} ${metricUnits[unitIndex]}`;
};

export const convertToDate = (modifiedInSeconds: number): Date => {
  // Час modified приходить у секундах, тому його потрібно конвертувати в мілісекунди
  return new Date(modifiedInSeconds * 1000);
};

export const getLineNumbers = (content: FileContent) => {
  const lines = content.split('\n').length ?? 0;
  return Array.from({ length: lines }, (_, i) => i + 1);
};