export type FileSizeMap = Map<string, number>;

export interface FileSizes {
    root: string;
    sizes: FileSizeMap;
}

export interface FileReporterOptions {
    errorOnWarning: boolean;
    warnAfterBundleGzipSize: number;
    warnAfterChunkGzipSize: number;
}

export interface SimplifiedStats {
    errors: string[];
    hash?: string;
    time?: number;
    warnings: string[];
}
