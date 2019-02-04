/* tslint:disable:no-any */
/**
 * @todo Add this to @types/webpack
 * @description based on https://webpack.js.org/api/stats/
 */
export interface AssetObject {
    chunkNames: string[];
    chunks: number[];
    emitted: boolean;
    name: string;
    size: number;
}

export interface StatsObject {
    version: string;
    hash: string;
    time: number;
    filteredModules: number;
    outputPath: string; // path to webpack output directory
    assetsByChunkName: {
        [key: string]: string;
    };
    assets: AssetObject[];
    // A list of chunk objects
    chunks: [];
    // A list of module objects
    modules: [];
    // A list of error strings
    errors: [];
    // A list of warning strings
    warnings: [];
}
// const buffer = outputFs.readFileSync(filename);

export interface MultiStatsObject {
    client?: StatsObject;
    server?: StatsObject;
}

export interface Module {
    __esModule: any;
    default: any;
}
