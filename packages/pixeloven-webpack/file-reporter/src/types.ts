export interface FileSizeMap {
    root: string;
    sizes: number[];
}

export interface FileSizeStats {
    folder: string;
    name: string;
    size: number;
    sizeLabel: string;
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
