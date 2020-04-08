import { PartialFileReporterOptions } from "@pixeloven-webpack/file-reporter";

export enum Protocol {
    http = "http",
    https = "https",
}

export interface Options {
    host: string;
    ignored: RegExp | string | string[];
    namespace?: string;
    port: number;
    protocol: Protocol;
    path: string;
    poll: number | boolean;
    reportingOptions?: PartialFileReporterOptions;
}
