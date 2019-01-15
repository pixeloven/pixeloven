import fs from "fs";
import path from "path";
import { flushChunkNames } from "react-universal-component/server";
import { Stats } from "webpack";
import flushChunks from "webpack-flush-chunks";

interface Manifest {
    [key: string]: string;
}

interface ManifestConfig {
    fileName?: string;
    stats?: Stats;
}

export class AssetManifest {
    protected config: ManifestConfig = {
        fileName: "public/asset-manifest.json",
    };

    /**
     * Create class from config
     * @param config
     */
    constructor(config?: ManifestConfig) {
        if (config) {
            this.config = {
                ...this.config,
                ...config,
            };
        }
    }

    /**
     * Return manifest
     */
    public get manifest() {
        if (this.config.stats) {
            const { scripts, stylesheets } = flushChunks(this.config.stats, {
                chunkNames: flushChunkNames(),
            });
            return {
                css: stylesheets,
                js: scripts,
            };
        } else if (this.config.fileName) {
            const manifestPath = path.resolve(this.config.fileName);
            if (fs.existsSync(manifestPath)) {
                const manifestFile = JSON.parse(
                    fs.readFileSync(manifestPath, "utf8"),
                ) as Manifest;
                return {
                    css: this.filter(manifestFile, "css"),
                    js: this.filter(manifestFile, "js"),
                };
            }
        }
        return undefined;
    }

    /**
     * Filter Manifest for file type
     * @param manifest
     * @param type
     */
    protected filter(manifest: Manifest, type: string) {
        const results: string[] = [];
        for (const key in manifest) {
            if (manifest.hasOwnProperty(key)) {
                if (key.endsWith(`.${type}`)) {
                    results.push(manifest[key]);
                }
            }
        }
        return results;
    }
}
