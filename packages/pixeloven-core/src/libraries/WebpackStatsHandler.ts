import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import { Options, Stats } from "webpack";

export interface FormattedStats {
    errors: string[];
    warnings: string[];
}

/**
 * Handler for webpack stats
 * @todo Replace react utils format function with our own custom formatter
 * @todo Add the ability to suppress warnings
 */
class WebpackStatsHandler {
    /**
     * Stats "level" of detail
     */
    protected level: Options.Stats;

    /**
     * Webpack stats object
     */
    protected stats: Stats;

    /**
     * Constructor
     * @param stats
     */
    constructor(stats: Stats, level: Options.Stats = "verbose") {
        this.stats = stats;
        this.level = level;
    }

    /**
     * Return formatted stats
     * @returns FormattedStats | false
     */
    public format(): FormattedStats {
        return formatWebpackMessages(this.stats.toJson(this.level));
    }
}

export default WebpackStatsHandler;
