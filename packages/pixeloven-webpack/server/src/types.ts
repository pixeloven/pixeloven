import { PartialFileReporterOptions } from "@pixeloven-webpack/file-reporter";

export enum Protocol {
    http = "http",
    https = "https",
}

export interface Options {
    host: string;
    port: number;
    protocol: Protocol;
    path: string;
    poll: number | boolean;
    ignored: RegExp | string | string[];
    reportingOptions?: PartialFileReporterOptions;
}
