import { PartialFileReporterOptions } from "@pixeloven-webpack/file-reporter";

export interface Options {
    clean: boolean;
    outputPath: string;
    reportingOptions?: PartialFileReporterOptions;
}
