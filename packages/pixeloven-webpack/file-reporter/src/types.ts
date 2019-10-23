export type FileSizeMap = Map<string, number>;

export interface FileSizes {
    root: string;
    sizes: FileSizeMap;
}

export interface FileReporterOptions {
    outputPath: string;
    errorOnWarning: boolean;
    warnAfterBundleGzipSize: number;
    warnAfterChunkGzipSize: number;
}

export interface Messages {
    errors: string[];
    warnings: string[];
}
