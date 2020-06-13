import fs from "fs";
import { normalize, resolve } from "path";

interface Manifest {
    css: string[];
    js: string[];
}

interface ManifestFile {
    [key: string]: string;
}

interface ManifestConfig {
    domain?: string;
    fileName: string;
    publicPath: string;
}

export class AssetManifest {
    /**
     * Manifest read buffer
     */
    protected buffer = "";

    /**
     * Default configuration
     */
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
        this.readManifestFile();
    }

    /**
     * Return manifest
     */
    public get manifest(): Manifest {
        const basePath = `/${this.config.publicPath}/`;
        const manifestJson = this.parseManifestFile();
        return {
            css: this.filter(manifestJson, "css").map((file) =>
                normalize(`${basePath}/${file}`),
            ),
            js: this.filter(manifestJson, "js").map((file) =>
                normalize(`${basePath}/${file}`),
            ),
        };
    }

    /**
     * Parse manifest file to json
     */
    protected parseManifestFile(): ManifestFile {
        if (this.buffer) {
            return JSON.parse(this.buffer);
        }
        return {};
    }

    /**
     * Reads asset manifest file into buffer if it does not exist already
     */
    protected readManifestFile() {
        if (!this.buffer) {
            const manifestPath = resolve(this.config.fileName);
            if (fs.existsSync(manifestPath)) {
                this.buffer = fs.readFileSync(manifestPath, {
                    encoding: "utf8",
                });
            }
        }
    }

    /**
     * Filter Manifest for file type
     * @param manifest
     * @param type
     */
    protected filter(manifest: ManifestFile, type: string) {
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
