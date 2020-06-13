import fs from "fs";
import { normalize, resolve } from "path";

interface Manifest {
    [key: string]: string;
}

interface ManifestConfig {
    fileName: string;
    publicPath: string;
}

export class AssetManifest {
    protected config: ManifestConfig = {
        fileName: "public/asset-manifest.json",
        publicPath: "/",
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
        const manifestPath = resolve(this.config.fileName);
        if (fs.existsSync(manifestPath)) {
            const manifestFile = JSON.parse(
                fs.readFileSync(manifestPath, "utf8"),
            ) as Manifest;
            return {
                css: this.filter(manifestFile, "css").map((file) =>
                    normalize(`/${this.config.publicPath}/${file}`),
                ),
                js: this.filter(manifestFile, "js").map((file) =>
                    normalize(`/${this.config.publicPath}/${file}`),
                ),
            };
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
