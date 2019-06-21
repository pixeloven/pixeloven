// enum StatTypes {
//     "static" = "static"
// }

// Dev = "dynamic" 
// Build = "static" + json file 

export interface Config {
    outputPath: string;
    path: string;
    withProfiling: boolean;
    withSourceMap: boolean;
    withStats: boolean;
    withStatsDir: string;
    withStatsHost: string;
    withStatsPort: number;
}
